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
  const [coord, setCoord] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  // requete Axios
  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestPermissionsAsync();
        // console.log(status); // renvoie  soit granted soit denied selon si l'user a accepter ou refuser la geoloc
        let response;

        if (status === "granted") {
          // Si l'user a donner les perms on récupere les donné gps
          const location = await Location.getCurrentPositionAsync();
          // console.log(location); // renvoie un object les coordoné gps compléte de l'utilisateur

          const lat = location.coords.latitude;
          // on dit que lat est = latitude qui est dans l'object qui c'est afficher au dessus
          const long = location.coords.longitude;
          // on dit que long est = longitude qui est dans l'object qui c'est afficher au dessus
          setLatitude(lat);

          setLongitude(long);

          // requete axios

          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${lat}&longitude=${long}`
            // si on récupere correctement (donc si il accepter la géolocalisation) les données de l'utilisateur on envoie la requete avec les coordoné de l'utilisateur (le point bleu)
          );
        } else {
          alert(
            "Veuillez autoriser la géolocalisation sur cette application pour utiliser cette fonctionnalité"
            // si il refuse alors ce message d'alerte le prévien q'uil ne pourra pas utiliser la map
          );
        }

        const tabCoord = [];
        // on créer un tableau qui s'apelle tabCoord
        for (let i = 0; i < response.data.length; i++) {
          //  et on boucle sur le nombre d'annonce qui se trouve (en distance) dans la limite donné par le backend
          console.log(response.Data[i].location);
          tabCoord.push({
            latitude: response.data[i].location[1],
            longitude: response.data[i].location[0],
          });
        }
        setCoord(tabCoord);
        setIsLoading(false);
      } catch (error) {
        alert("error");
        console.log(error);
      }
    };
    getLocation();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="red" />
  ) : (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.2,
        // ca c'est le niveau de zoom sur la carte par défault
        longitudeDelta: 0.2,
        // ca c'est le niveau de zoom sur la carte par défault
      }}
      showsUserLocation={true}
      // ca c pour afficher le point blue sur la carte pour montrer ou est l'utilisateur
    >
      {coord.map((item, index) => {
        // console.log(item);
        // map sur la localisation de toutes les annonces
        return (
          <MapView.Marker
            //  affiche un marqueur sur la carte de toutes les annonces
            key={index}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
              // indique aux marqueurs on se positionner en donnant les coordonées précise
            }}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    // marginHorizontal: 10,
    flex: 1,
  },
});
