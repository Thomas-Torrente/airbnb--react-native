import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const height = Dimensions.get("window").height;

const width = Dimensions.get("window").width;
// permet de regler  la taille de l'élément a la taille de l'écran de maniere dynamique

export default function AroundMeScreen() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // requete Axios
  const fetchData = async () => {
    const response = await axios.get(
      "https://express-airbnb-api.herokuapp.com/rooms/around"
    );
    setData(response.data.location);
    console.log(response.data.location[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="red" /> //   affiche la roue qui tourne en cours de chargement
  ) : (
    <MapView></MapView>
  );
}
