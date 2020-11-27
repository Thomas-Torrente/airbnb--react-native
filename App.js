import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Containers
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import MyProfileScreen from "./containers/MyProfileScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";

// Components
import Logo from "./components/Logo.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {(props) => <SignUpScreen {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in

        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "#FF5F62",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen
            //  Si dessous accueil
            name="Home"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-home"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  options={{
                    headerTitle: () => <Logo />,
                    // permet d'ajouter dans le header le logo du components Logo pour l'afficher
                  }}
                >
                  {(props) => <HomeScreen {...props} setToken={setToken} />}
                </Stack.Screen>

                <Stack.Screen
                  name="Room"
                  options={{
                    headerTitle: () => <Logo />,
                    // permet d'ajouter dans le header le logo du components Logo pour l'afficher
                  }}
                >
                  {(props) => <RoomScreen {...props} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>

          {/* ci dessous la map */}
          <Tab.Screen
            name="Around Me"
            options={{
              headerTitle: () => <Logo />,
              // permet d'ajouter dans le header le logo du components Logo pour l'afficher
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-pin"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Around Me"
                  options={{ headerTitle: () => <Logo /> }}
                >
                  {() => <AroundMeScreen setToken={setToken} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>

          {/* ci dessous My profile */}
          <Tab.Screen
            name="My Profile"
            options={{
              tabBarLabel: "My Profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-person"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="My Profile"
                  options={{ headerTitle: () => <Logo /> }}
                >
                  {() => <MyProfileScreen setToken={setToken} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
