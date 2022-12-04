<!-- TODO: add star rating ui -->

<template>
  <b-form @submit.prevent="submit">
    <label>Shop:</label>
    <ShopAutocomplete v-model="shopValue" />

    <label>Car:</label>
    <div class="card">
      <div class="card-body">
        <div>Make: <b-input @input="makeValue = $event" /></div>
        <div>Model: <b-input @input="modelValue = $event" /></div>
        <div>Year: <b-input @input="yearValue = $event" /></div>
      </div>
    </div>

    <label>Services:</label>
    <!-- <multiselect 
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
      :preselect-first="false">
      <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
    </multiselect>

    <label v-if="servicesValue.length">Prices</label>
    <div class="card" v-if="servicesValue.length">
      <div class="card-body">
        <div v-for="s in servicesValue">Price for <b>{{s.name}}</b>
          <b-input v-model.number="s.price"/>
        </div>
      </div>
    </div> -->

    <div>
      <div
        class="service-input-group mb-2"
        v-for="(service, index) in services"
      >
        <b-form-input
          placeholder="Service Name"
          class="service-input"
          v-model="services[index].name"
        />
        <b-input-group prepend="$" class="service-input">
          <b-form-input
            placeholder="Price"
            v-model.number="services[index].price"
          />
        </b-input-group>
      </div>
      <b-button @click="services.push({ name: '', price: 0 })" class="mb-2"
        ><b-icon-plus /> Add Service</b-button
      >
    </div>

    <label>Rating:</label>
    <b-form-rating
      v-model.number="ratingValue"
      class="mb-2"
      show-value
      show-value-max
    ></b-form-rating>

    <b-button variant="primary" type="submit"> Submit </b-button>
  </b-form>
</template>

<script>
//Credit: https://vue-multiselect.js.org/#sub-multiple-select
import Multiselect from "vue-multiselect";
import ShopAutocomplete from "../common/ShopAutocomplete.vue";

export default {
  components: {
    Multiselect,
    ShopAutocomplete,
  },
  data() {
    return {
      value: [],
      shopValue: {},
      makeValue: "",
      modelValue: "",
      yearValue: "",
      services: [{ name: "", price: 0 }],
      ratingValue: 1,
      serviceOptions: [
        { name: "Oil Change" },
        { name: "Tire Adjustment" },
        { name: "Spark Plug Replacement" },
        { name: "Replace Oxygen Sensor" },
        { name: "Tighten Fuel Cap" },
        { name: "Replace AC" },
      ],
    };
  },
  methods: {
    updateInput(value) {
      console.log(value);
      // this.servicesValue = value.map(entry => entry.name);
      this.servicesValue = value;
      console.log(this.servicesValue);
    },
    async submit() {
      console.log("submit");
      console.log(
        this.shopValue,
        this.makeValue,
        this.services,
        this.ratingValue,
        this.makeValue,
        this.modelValue,
        this.yearValue
      );
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          services: this.services,
          model: {
            make: this.makeValue,
            model: this.modelValue,
            year: this.yearValue,
          },
          shop: this.shopValue,
          rating: this.ratingValue,
        }),
      };
      console.log(options.body);
      var res = await fetch("/api/reviews/", options);
    },
  },
  async created() {
    console.log("CREATED!");
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
