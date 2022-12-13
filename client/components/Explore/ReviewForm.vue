<template>
  <b-card>
    <label>Shop:</label>
    <ShopAutocomplete v-model="shop" />
    <label>Car:</label>
    <b-input placeholder="Year Make Model" v-model="car" />
    <label>Rating:</label>
    <b-form-rating v-model.number="rating" />
    <label>Content:</label>
    <b-form-textarea v-model="content" />
    <b-button class="mt-2" variant="primary" @click="postReview()">Post</b-button>
  </b-card>
</template>

<script>
import ShopAutocomplete from "@/components/common/ShopAutocomplete.vue";

export default {
  name: "ReviewForm",
  components: { ShopAutocomplete },
  data() {
    return {
      shop: {},
      car: "",
      rating: 0,
      content: "",
    };
  },
  method: {
    async postReview() {
      if (!this.inputsAreValid()) return;
      const opt = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shop,
          car,
          rating,
          content,
        }),
      };
      const req = await fetch("/api/reviews", opt);
    },
    inputsAreValid() {
      if (car.split(" ").length != 3) {
        alert("Please enter car in specified format");
        return false;
      }
    },
  },
};
</script>

<style></style>
