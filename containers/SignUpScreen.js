import React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// console.log(Constants.statusBarHeight);
export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView style={styles.bar}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Image
            style={styles.logo}
            source={require("../assets/airbnblogo.jpg")}
          ></Image>
          <Text style={styles.h1}>Sign Up</Text>
          <TextInput
            style={styles.lignBottomInput}
            placeholder="Email"
            autoCompleteType={"email"}
          />

          <TextInput
            style={styles.lignBottomInput}
            placeholder="Username"
            autoCompleteType={"username"}
          />

          <TextInput
            style={styles.allBorderInput}
            placeholder="Describe yourself in a few words ...."
            multiline={true}
            numberOfLines={4}
          ></TextInput>
          <TextInput
            style={styles.lignBottomInput}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.lignBottomInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.buttonSignUp}
            title="Sign up"
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          >
            <Text style={[styles.center, styles.h3]}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.signin}>
              {" "}
              Already have an account ? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
  },

  bar: {
    marginTop: Constants.statusBarHeight,
  },

  // TITRE

  h1: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },
  h3: {
    fontSize: 20,
  },

  // ALIGNEMENT DES TEXTES

  center: {
    textAlign: "center",
  },

  // FORM
  form: {},
  logo: {
    width: 100,
    height: 100,
  },
  lignBottomInput: {
    borderBottomWidth: 2,
    borderBottomColor: "red",
    marginBottom: 20,
    marginLeft: 25,
    marginRight: 25,
  },

  allBorderInput: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    paddingLeft: 10,
    marginLeft: 25,
    marginRight: 25,
  },

  signin: {
    marginTop: 20,
    textAlign: "center",
  },
  buttonSignUp: {
    borderRadius: 100,
    borderColor: "red",
    borderWidth: 2,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 30,
  },
});
