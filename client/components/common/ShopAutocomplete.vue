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

export default {
  name: "ShopAutocomplete",
  components: { VueTypeaheadBootstrap },
  data() {
    return {
      query: "",
      currentLocation: null,
      results: [],
      selectedShop: null,
    };
  },
  methods: {
    shopSelected(evt) {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId: evt.place_id }).then((res) => {
        const result = res.results[0];
        this.$emit("input", {
          coordinates: result.geometry.location.toJSON(),
          name: evt.structured_formatting.main_text,
          googlePlaceId: evt.place_id,
          address: result.formatted_address,
        });
      });
    },
    searchPlace: debounce(function () {
      if (!google) return;

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
  },
};
</script>
