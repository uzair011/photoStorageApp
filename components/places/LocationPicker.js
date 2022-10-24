import { View, StyleSheet, Alert, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/Colors";
import { getAddress, getMapPreview } from "../../utils/Location";

function LocationPicker({ onPickLocation }) {
  const [PickedLocation, setPickedLocation] = useState();
  const isFocoused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocoused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        long: route.params.pickedLong,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocoused]);

  useEffect(() => {
    async function addressHandler() {
      if (PickedLocation) {
        const address = await getAddress(
          PickedLocation.lat,
          PickedLocation.long
        );
        onPickLocation({ ...PickedLocation, address: address });
      }
    }
    addressHandler();
  }, [onPickLocation, PickedLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant Location permissions to use this app."
      );
      //   const permissionResponse = await requestPermission();
      //   return permissionResponse.granted;
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("map");
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  if (PickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(PickedLocation.lat, PickedLocation.long),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate user
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          PIck on location
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    height: 200,
    width: "100%",
    marginVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 6,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
});

// api key - AIzaSyBQE7iEYjUy-StjZ5mQIn21oL-0cQIsQxU
