<template>
  <main class="container">
    <b-form @submit.prevent="submit">
      <label>Shop:</label>
      <ShopAutocomplete v-model="shopSelected" />

      <label>Car:</label>
      <b-input @input="modelValue = $event" placeholder="Year Make Model" />

      <label>Services:</label>
      <div>
        <div class="service-input-group" v-for="(service, index) in services">
          <b-form-input
            placeholder="Service Name"
            class="service-input"
            v-model="services[index].name"
          />
          <b-input-group prepend="$" class="service-input">
            <b-form-input
              placeholder="Amount"
              v-model.number="services[index].amount"
            />
          </b-input-group>
        </div>
        <b-button @click="services.push({ name: '', amount: 0 })"
          ><b-icon-plus /> Add Service</b-button
        >
      </div>

      <b-button variant="primary" type="submit"> Submit </b-button>
    </b-form>
  </main>
</template>

<script>
import ShopAutocomplete from "@/components/common/ShopAutocomplete.vue";

export default {
  name: "ComparePage",
  components: { ShopAutocomplete },
  data() {
    return {
      services: [{ name: "", amount: 0 }],
      shopSelected: null,
    };
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
}
</style>
