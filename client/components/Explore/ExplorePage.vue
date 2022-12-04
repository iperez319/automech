<template>
  <main class="container">
    <section>
      <b-form>
        <label for="address">Address:</label>
        <!-- <b-input
          name="shop"
          :value="shopvalue"
          @input="shopvalue = $event.target"
        /> -->
        <AddressAutocomplete v-model="addressSelected" />
        <label for="services">Services:</label>
        <multiselect
          v-model="value"
          :options="serviceOptions"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Pick some"
          label="name"
          track-by="name"
          @input="updateInput"
          :preselect-first="false"
        >
        </multiselect>
        <label for="car">Car:</label>
        <b-input placeholder="Year Make Model" id="car" />
        <b-button variant="primary" type="submit" @click="submitForm">
          Submit
        </b-button>
      </b-form>
    </section>
    <section>
      <h3>Shops near 229 Vassar St.</h3>
      <b-form-select
        v-model="sortBy"
        :options="['Distance', 'Rating']"
        style="width: fit-content"
      />
      <div class="display">
        <div style="flex-shrink: 0" class="listContainer">
          <ShopListItem v-for="shop in results" :shop="shop" />
        </div>
        <div id="map"></div>
      </div>
    </section>
  </main>
</template>

<script>
import Multiselect from "vue-multiselect";
import AddressAutocomplete from "@/components/common/AddressAutocomplete.vue";
import ShopListItem from "./ShopListItem.vue";
import { services } from "@/utils/constants";
import { getShopsNearAddress } from "@/utils/stubs";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "ExplorePage",
  components: { Multiselect, AddressAutocomplete, ShopListItem },
  data() {
    return {
      addressSelected: null,
      value: [],
      serviceOptions: services,
      results: null,
      sortBy: "Distance",
    };
  },
  methods: {
    updateInput(value) {
      console.log(value);
    },
    submitForm(evt) {
      evt.preventDefault();
      console.log("CLICKED");

      const service = new google.maps.places.AutocompleteService();

      const userCoords = { lat: 42.3570416, lng: -71.1017284 }; // Hardcode to MIT if no permission given for test purposes

      service.getPlacePredictions(
        {
          input: "q",
          types: ["car_repair"],
          //   location: new google.maps.LatLng(userCoords.lat, userCoords.lng), TODO: Not working when adding this parameter
          origin: new google.maps.LatLng(userCoords.lat, userCoords.lng),
          region: "us",
        },
        (preds, status) => {
          console.log(status);
          console.log(preds);
        }
      );

      // this.results = [
      //   ...getShopsNearAddress(10, {
      //     lat: 42.3570416,
      //     lng: -71.1017284,
      //   }),
      // ];

      // let map = new google.maps.Map(document.getElementById("map"), {
      //   center: { lat: 42.3570416, lng: -71.1017284 },
      //   zoom: 15,
      // });

      // // TODO: Add InfoWindow to show shop details in map

      // const bounds = new google.maps.LatLngBounds();

      // for (let shop of this.results) {
      //   bounds.extend(shop.coordinates);
      //   new google.maps.Marker({
      //     position: shop.coordinates,
      //     map: map,
      //     title: shop.name,
      //   });
      // }

      // map.fitBounds(bounds);
    },
  },
  mounted() {
    const loader = new Loader({
      apiKey: "AIzaSyBDEqPqGsjpE-nVKMnMvvblsXpZbS7ZK_w",
      libraries: ["places"],
    });

    loader.loadCallback((e) => {
      if (e) console.log(e);
      else {
        console.log("LOADED");
        this.loaded = true;
      }
    });
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.display {
  display: flex;
  gap: 10px;
}

#map {
  width: 100%;
  height: 500px;
}

.listContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
  height: 500px;
}

.multiselect__option--highlight {
  background: #007bff;
}

.multiselect__option--highlight::after {
  background: #007bff;
}
</style>
