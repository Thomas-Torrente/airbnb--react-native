import React, { useState } from "react";
import axios from "axios";
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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  // de base error message est nul prck ya pas derreur mais :

  const whenSubmit = async () => {
    if (email && username && description && password && confirmPassword) {
      // console.log("première étape vérifier");
      if (password === confirmPassword) {
        // console.log(
        //   "Les mot de passes sont bien identiques on passe a la suite"
        // );

        try {
          const sendSignup = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(sendSignup);
        } catch (error) {
          alert("error");
        }
      } else {
        setErrorMessage("Les mots de passe ne pas identiques");
      }
    } else {
      setErrorMessage(
        "Merci de vérifier que tous les champs soit correctement remplies"
      );
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
          <Text style={styles.h1}>Sign Up</Text>
          <TextInput
            style={styles.lignBottomInput}
            placeholder="Email"
            autoCompleteType={"email"}
            onChange={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.lignBottomInput}
            placeholder="Username"
            autoCompleteType={"username"}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />

          <TextInput
            style={styles.allBorderInput}
            placeholder="Describe yourself in a few words ...."
            multiline={true}
            numberOfLines={4}
            onChange={(text) => {
              setDescription(text);
            }}
          />
          <TextInput
            style={styles.lignBottomInput}
            placeholder="Password"
            secureTextEntry={true}
            onChange={(text) => {
              setPassword(text);
            }}
          />
          <TextInput
            style={styles.lignBottomInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChange={(text) => {
              setConfirmPassword(text);
            }}
          />
          <Text>{errorMessage}</Text>

          <TouchableOpacity
            style={styles.buttonSignUp}
            title="Sign up"
            onPress={whenSubmit}
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
  },

  allBorderInput: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    paddingLeft: 10,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
    marginTop: 20,
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
