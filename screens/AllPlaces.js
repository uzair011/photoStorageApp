import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

import PlacesList from "../components/places/PlacesList";
import { fetchPlaces } from "../utils/Database";

function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  async function loadPlaces() {
    const places = await fetchPlaces();
    setLoadedPlaces(places);
  }

  useEffect(() => {
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((currentPlace) => [...currentPlace, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
