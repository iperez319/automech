<template>
  <main class="container">
    <section>
      <b-form>
        <label for="shop">Shop:</label>
        <!-- <b-input
          name="shop"
          :value="shopvalue"
          @input="shopvalue = $event.target"
        /> -->
        <ShopAutocomplete v-model="shopSelected" />
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
        <label for="car">Services:</label>
        <b-input placeholder="Year Make Model" id="car" />
        <b-button variant="primary" type="submit"> Submit </b-button>
      </b-form>
    </section>
  </main>
</template>

<script>
import Multiselect from "vue-multiselect";
import ShopAutocomplete from "@/components/common/ShopAutocomplete.vue";

export default {
  name: "ComparePage",
  components: { Multiselect, ShopAutocomplete },
  data() {
    return {
      shopSelected: null,
      value: [],
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
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
