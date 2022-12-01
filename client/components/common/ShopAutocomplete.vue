<template>
  <vue-typeahead-bootstrap
    :data="results"
    v-model="query"
    :serializer="(item) => item.structured_formatting.main_text"
    placeholder="Enter Shop Name"
    @input="searchPlace"
    @hit="shopSelected"
  />
</template>

<script>
import VueTypeaheadBootstrap from "vue-typeahead-bootstrap";
import { debounce } from "lodash";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "ShopAutocomplete",
  components: { VueTypeaheadBootstrap },
  data() {
    return {
      query: "",
      currentLocation: null,
      loaded: false,
      results: [],
      selectedShop: null,
    };
  },
  methods: {
    shopSelected(evt) {
      this.$emit("input", evt);
    },
    searchPlace: debounce(function () {
      if (!this.loaded) return;

      const service = new google.maps.places.AutocompleteService();

      const userCoords = this.currentLocation
        ? {
            lat: this.currentLocation.coords.latitude,
            lng: this.currentLocation.coords.longitude,
          }
        : { lat: 42.3570416, lng: -71.1017284 }; // Hardcode to MIT if no permission given for test purposes
      console.log(userCoords);
      service.getPlacePredictions(
        {
          input: this.query,
          types: ["car_repair"],
          //   location: new google.maps.LatLng(userCoords.lat, userCoords.lng), TODO: Not working when adding this parameter
          origin: new google.maps.LatLng(userCoords.lat, userCoords.lng),
          region: "us",
        },
        (preds, status) => {
          console.log(status);
          this.results = preds;
        }
      );
    }, 500),
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLocation = position;
      console.log(position);
    });

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
