<template>
  <main class="container">
    <b-form @submit.prevent="submit">
      <label>Shop:</label>
      <ShopAutocomplete v-model="shopSelected" />

      <label>Car:</label>
      <b-input @input="car = $event" placeholder="Year Make Model" />

      <label>Services:</label>
      <div>
        <div class="service-input-group" v-for="(service, index) in services">
          <!-- <b-form-input
            placeholder="Service Name"
            class="service-input"
            v-model="services[index].name"
          /> -->
          <b-form-select
            v-model="services[index].name"
            :options="[
              'Oil Change',
              'Tire Adjustment',
              'Spark Plug Replacement',
              'Replace Oxygen Sensor',
              'Tighten Fuel Cap',
              'Replace AC',
            ]"
          ></b-form-select>
          <b-input-group prepend="$" class="service-input">
            <b-form-input
              placeholder="Price"
              v-model.number="services[index].price"
            />
          </b-input-group>
        </div>
        <b-button @click="services.push({ name: '', price: 0 })"
          ><b-icon-plus /> Add Service</b-button
        >
      </div>

      <b-button
        variant="primary"
        type="submit"
        @click="handleSubmit"
        class="mt-2"
      >
        Submit
      </b-button>
    </b-form>
  </main>
</template>

<script>
import ShopAutocomplete from "@/components/common/ShopAutocomplete.vue";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "ComparePage",
  components: { ShopAutocomplete },
  data() {
    return {
      services: [{ name: "", price: 0 }],
      shopSelected: null,
      car: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$router.push({
        name: "Compare Results Page",
        params: {
          services: this.services,
          shop: this.shopSelected,
          car: this.car,
        },
      });
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

<style>
.service-input {
  width: 200px !important;
}

.service-input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}
</style>
