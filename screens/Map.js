import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IconButton from "../components/ui/iconButton";

function Map({ navigation, route }) {
  const initiaLocation = route.params && {
    lat: route.params.initialLat,
    long: route.params.initialLong,
  };
  const [selectedLocation, setSelectedLocation] = useState(initiaLocation);

  const region = {
    latitude: initiaLocation ? initiaLocation.lat : 37.78,
    longitude: initiaLocation ? initiaLocation.long : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    if (initiaLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, long: long });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked yet",
        "You have to select a location by tapping on the map."
      );
      return;
    }
    navigation.navigate("addPlace", {
      pickedLat: selectedLocation.lat,
      pickedLong: selectedLocation.long,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initiaLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initiaLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.long,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
