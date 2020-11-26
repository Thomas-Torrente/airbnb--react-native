import React, { useEffect, useState } from "react";

import { ActivityIndicator, Text, View, Image } from "react-native";
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
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator size="large" color="red" />
  ) : (
    <ScrollView>
      <View>
        <Image source={{ uri: response.data.photos[0].url }}></Image>
      </View>
    </ScrollView>
  );
}

// <View>
//   <Text>ROOM id : {route.params.id}</Text>
// </View>
