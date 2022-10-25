import PlaceForm from "../components/places/PlaceForm";

import { insertPlace } from "../utils/Database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);

    navigation.navigate("allPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
