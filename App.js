import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import IconButton from "./components/ui/iconButton";
import { Colors } from "./constants/Colors";

const Stack = createNativeStackNavigator();

export default function App() {
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
