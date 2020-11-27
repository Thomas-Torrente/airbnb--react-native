import React, { useState } from "react";
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function MyProfileScreen({ setToken }) {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <Text style={[styles.h1, styles.center]}>My profil </Text>

        <TouchableOpacity
          title="Log Out"
          onPress={() => {
            setToken(null);
          }}
        >
          <Text style={styles.btnDisconnectText}> Disconnect </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },

  // traitement de texte
  h1: {
    fontSize: 25,
  },

  center: {
    textAlign: "center",
  },

  // disconnect

  btnDisconnectText: {
    color: "#FF5F62",
    backgroundColor: "white",
    borderColor: "#FF5F62",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: "25%",
    fontSize: 17,
  },
});
