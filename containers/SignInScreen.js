// les imports
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const whenSubmit = async () => {
    if (email && password) {
      // console.log("Les champs sont bien remplies");
      try {
        const sendSignup = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.data.token) {
          // Stocker Token
          const userToken = response.data.token;
          setToken(userToken);
        } else {
          alert("Error");
        }
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("Merci de remplir tous les champs correctement");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.bar}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.centerImg}>
            <Image
              style={styles.logo}
              source={require("../assets/airbnblogo.jpg")}
            ></Image>
          </View>
          <Text style={styles.h1}>Sign In</Text>

          <TextInput
            style={styles.lignBottomInput}
            placeholder="Email"
            autoCompleteType={"email"}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.lignBottomInput}
            placeholder="Password"
            secureTextEntry={true}
            autoCompleteType={"password"}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <Text>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.buttonSignUp}
            title="Sign in"
            onPress={whenSubmit}
            // onPress={() => {
            //   const userToken = "secret-token";
            //   setToken(userToken);
            // }}
          >
            <Text style={[styles.center, styles.h3]}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.signUp}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

//  LE STYLE CSS
const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 100,
  },

  bar: {
    marginTop: Constants.statusBarHeight,
  },

  centerImg: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
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

  lignBottomInput: {
    borderBottomWidth: 2,
    borderBottomColor: "red",
    marginBottom: 20,
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 10,
  },

  signUp: {
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
