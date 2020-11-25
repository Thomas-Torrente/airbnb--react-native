import React from "react";

import { Text, View, Image } from "react-native";

const CardRooms = ({ data }) => {
  return (
    <>
      <View>
        <Image source={{ uri: data.photos[0].url }}></Image>
      </View>
    </>
  );
};

export default CardRooms;
