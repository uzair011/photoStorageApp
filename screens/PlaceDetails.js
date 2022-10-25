import { useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/Colors";

function PlaceDetails({ route }) {
  function showOnMapHandler() {}

  const selectedPlaceId = route.params.PlaceId;

  useEffect(() => {
    //
  }, [selectedPlaceId]);

  return (
    <ScrollView>
      <Image style={styles.Image} />
      <View style={styles.locationContainer}>
        <View style={styles.adderssContainer}>
          <Text style={styles.address}>Address</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  Image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  adderssContainer: {
    padding: 24,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
