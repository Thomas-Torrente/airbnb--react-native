import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import CardRooms from "../components/CardRooms";
import { FlatList } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState({});

  const fetchData = async () => {
    const response = await axios.get(
      "https://express-airbnb-api.herokuapp.com/rooms"
    );
    console.log(response.data);
  };
  return (
    <KeyboardAwareScrollView style={styles.bar}>
      <View>
        <View style={styles.center}>
          <Image
            style={styles.logo}
            source={require("../assets/airbnblogo.jpg")}
          ></Image>
        </View>
        <View style={styles.card}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return <CardRooms data={data} setData={setData} />;
            }}
          />
          <CardRooms />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginTop: Constants.statusBarHeight,
  },
  logo: {
    width: 50,
    height: 50,
  },
  center: {
    alignItems: "center",
  },
});
