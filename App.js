import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";
import IconButton from "./components/ui/iconButton";
import { Colors } from "./constants/Colors";
import { init } from "./utils/Database";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="allPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your favourite places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("addPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="addPlace"
            component={AddPlace}
            options={{ title: "Add a new place" }}
          />
          <Stack.Screen
            name="map"
            component={Map}
            options={{ title: "Map View" }}
          />
          <Stack.Screen
            name="placeDetails"
            component={PlaceDetails}
            options={{
              title: "Loading place...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
