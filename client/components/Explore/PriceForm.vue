<template>
  <b-card>
    <!-- <label>Shop:</label>
    <ShopAutocomplete v-model="shop" /> -->
    <label>Car:</label>
    <b-input placeholder="Year Make Model" v-model="car" />
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
    <b-button class="mt-2" variant="primary" @click="postPrice()"
      >Post</b-button
    >
  </b-card>
</template>

<script>
import ShopAutocomplete from "@/components/common/ShopAutocomplete.vue";

export default {
  name: "PriceForm",
  components: { ShopAutocomplete },
  props: ["shop"],
  data() {
    return {
      shop: {},
      car: "",
      services: [{ name: "", price: 0 }],
    };
  },
  methods: {
    async postPrice() {
      if (!this.inputsAreValid()) return;
      let model = this.car.split(" ");
      const opt = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shop: this.shop,
          model: {
            year: parseInt(model[0]),
            make: model[1],
            model: model[2],
          },
          services: this.services,
        }),
      };
      const req = await fetch("/api/services", opt);
    },
    inputsAreValid() {
      if (this.car.split(" ").length != 3) {
        alert("Please enter car in specified format");
        return false;
      }
      return true;
    },
  },
};
</script>

<style></style>
