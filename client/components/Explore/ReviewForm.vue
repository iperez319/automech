<template>
  <b-card>
    <!-- <label>Shop:</label>
    <ShopAutocomplete v-model="shop" /> -->
    <label>Car:</label>
    <b-input placeholder="Year Make Model" v-model="car" />
    <label>Rating:</label>
    <b-form-rating v-model.number="rating" />
    <label>Content:</label>
    <b-form-textarea v-model="content" />
    <b-button class="mt-2" variant="primary" @click="postReview()"
      >Post</b-button
    >
  </b-card>
</template>

<script>
import ShopAutocomplete from "@/components/common/ShopAutocomplete.vue";

export default {
  name: "ReviewForm",
  components: { ShopAutocomplete },
  props: ["shop"],
  data() {
    return {
      shop: {},
      car: "",
      rating: 0,
      content: "",
    };
  },
  methods: {
    async postReview() {
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
          rating: this.rating,
          content: this.content,
        }),
      };
      const req = await fetch("/api/reviews", opt);
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
