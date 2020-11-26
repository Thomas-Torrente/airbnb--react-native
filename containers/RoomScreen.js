import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";

export default function RoomScreen({ route }) {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
    );

    setData(response.data);
    console.log(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator size="large" color="red" />
  ) : (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <Image
          style={styles.mainImg}
          source={{ uri: data.photos[0].url }}
        ></Image>
        <View>
          <Text style={styles.priceLoc}>{data.price} €</Text>
          <Image source={{ uri: data.user.account.photo.url }}></Image>
        </View>
        <View>
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// <View>
//   <Text>ROOM id : {route.params.id}</Text>
// </View>
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#ff5f62",
  },
  mainImg: {
    width: "100%",
    height: 500,
  },
  priceLoc: {
    marginTop: 10,
    backgroundColor: "white",
    color: "#ff5f62",
    height: 40,
    width: "50%",
    textAlign: "center",
    alignItems: "center",
    fontSize: 30,
    borderRadius: 25,
    borderColor: "#ff5f62",
    borderWidth: 1,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },

  description: {
    marginTop: 20,
    fontSize: 15,
    flex: 1,

    textAlign: "center",
  },
});
