<template>
  <main>
    <h4>Discover Mechanic Shops In Your Area</h4>
    <section>
      <b-form>
        <label for="address">Address:</label>
        <!-- <b-input
          name="shop"
          :value="shopvalue"
          @input="shopvalue = $event.target"
        /> -->
        <b-row>
          <b-col cols="10"
            ><AddressAutocomplete v-model="addressSelected"
          /></b-col>
          <b-col
            ><b-form-select v-model="radius" :options="options"></b-form-select
          ></b-col>
        </b-row>

        <label for="services">Services:</label>
        <multiselect
          v-model="selectedServices"
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
        <b-button
          variant="primary"
          type="submit"
          @click="submitForm"
          class="mt-2 mb-2"
        >
          Submit
        </b-button>
      </b-form>
    </section>
    <section v-if="results">
      <h3>Shops near {{ addressSelected.name }}</h3>
      <b-form-select
        v-model="sortBy"
        :options="['Distance', 'Rating']"
        style="width: fit-content"
      />
      <!-- </section>
    </section> -->
      <!-- <div class="middle">
        <GetShopsForm
          ref="getShopsForm"
          button="🔄 Get all shops"
        />
        <GetLocalShopsForm
          ref="getLocalShopsForm"
          button="🔄 Get local shops within your specified radius"
        />
      </div> -->

      <!-- <section
        v-if="$store.state.shops.length"
      >
        <ShopListItem
          v-for="shop in $store.state.shops"
          :key="shop.id"
          :shop="shop"
        />
      </section> -->

      <div class="display">
        <div style="flex-shrink: 0" class="listContainer">
          <ShopListItem v-for="shop in results" :shop="shop" />
        </div>
        <div id="map" v-b-visible="mapIsVisibleHandler"></div>
      </div>
    </section>
  </main>
</template>

<script>
import Multiselect from "vue-multiselect";
import AddressAutocomplete from "@/components/common/AddressAutocomplete.vue";
import ShopListItem from "./ShopListItem.vue";
import GetShopsForm from "./GetShopsForm.vue";
import GetLocalShopsForm from "./GetLocalShopsForm.vue";
import { services } from "@/utils/constants";
import { getShopsNearAddress } from "@/utils/stubs";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "ExplorePage",
  components: {
    Multiselect,
    AddressAutocomplete,
    ShopListItem,
    GetShopsForm,
    GetLocalShopsForm,
  },
  data() {
    return {
      addressSelected: null,
      selectedServices: [],
      serviceOptions: services,
      results: null,
      radius: 5,
      sortBy: "Distance",
      options: [
        { value: 5, text: "5 mi" },
        { value: 10, text: "10 mi" },
        { value: 15, text: "15 mi" },
        { value: 20, text: "20 mi" },
      ],
    };
  },
  methods: {
    updateInput(value) {
      console.log(value);
    },
    mapIsVisibleHandler(isVisible) {
      if (isVisible && this.results) {
        let map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 42.3570416, lng: -71.1017284 },
          zoom: 15,
        });

        // TODO: Add InfoWindow to show shop details in map

        const bounds = new google.maps.LatLngBounds();

        for (let shop of this.results) {
          bounds.extend(shop.coordinates);
          const marker = new google.maps.Marker({
            position: shop.coordinates,
            map: map,
            title: shop.name,
          });

          const infowindow = new google.maps.InfoWindow({
            content: `<h4>${shop.name}</h4>`,
            ariaLabel: shop.name,
          });

          marker.addListener("click", () => {
            infowindow.open({
              anchor: marker,
              map,
            });
          });
        }

        map.fitBounds(bounds);
      }
    },
    async submitForm(evt) {
      evt.preventDefault();
      console.log("CLICKED");

      const options = {
        method: "POST",
        body: JSON.stringify({
          location: this.addressSelected?.coordinates,
          radius: this.radius,
          services: this.selectedServices,
        }),
        headers: { "Content-Type": "application/json" },
      };
      const req = await fetch("/api/shops/local", options);
      const req_obj = await req.json();

      this.results = req_obj;
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
