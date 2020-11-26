import React from "react";
import { View } from "react-native";
import { Image, StyleSheet, Text } from "react-native";

const Logo = () => {
  return (
    <View style={styles.viewLogo}>
      <Text style={styles.text}>AIRBNB</Text>
      <Image
        source={require("../assets/airbnblogo.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 30,
  },

  viewLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FF5F62",
  },
});
