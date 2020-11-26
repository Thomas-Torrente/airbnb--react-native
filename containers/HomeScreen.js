import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://express-airbnb-api.herokuapp.com/rooms"
    );

    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="red" />
  ) : (
    <FlatList
      // est une boucle
      data={data}
      // On envoie les données à la boucle
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              navigation.navigate("Room", {
                id: item._id,
                // on dit que quand on appuie ca nous transfere vers chaque location individuelle grace a l'id
              });
            }}
          >
            <ImageBackground
              style={styles.imgLoc}
              source={{ uri: item.photos[0].url }}
            >
              {/* On dit que la première image est celle de chaque location est celle qui doit s'afficher dans le home et on boucle sur chaque premiere photo */}
              <View>
                <Text style={styles.priceLoc}>{item.price} € </Text>
                {/*  On boucle sur chaque prix de chaque location */}
              </View>
            </ImageBackground>
            <View>
              <View>
                <View style={styles.infos}>
                  <View style={styles.infoText}>
                    <Text numberOfLines={1}>{item.title}</Text>
                  </View>
                </View>
                {/* On boucle sur chaque title */}
              </View>
              <Image
                style={styles.avatarUser}
                source={{ uri: item.user.account.photo.url }}
              />
              {/* On boucle sur chaque photos d'utilisateur */}
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item._id}
      //  c'est comme Key en react pour éviter les warning
    />
  );
}

const styles = StyleSheet.create({
  imgLoc: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  priceLoc: {
    backgroundColor: "black",
    color: "white",
    height: 30,
    width: 50,
    textAlign: "center",
    alignItems: "center",

    marginBottom: 10,
    marginLeft: 10,
  },
  touchableOpacity: {
    paddingHorizontal: 10,
  },

  infos: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarUser: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },

  infoText: {
    width: "70%",
  },
});
