<template>
  <b-card>
    <div style="display: flex; gap: 10px; align-items: baseline">
      <b-avatar>{{ initials }}</b-avatar>
      <h4>{{ name }} ({{ car }})</h4>
    </div>
    <b-form-rating
      inline
      readonly
      no-border
      style="padding-left: 0"
      :value="rating"
    ></b-form-rating>
    <b-card-text>
      {{ content }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "TransactionCard",
  props: ["transaction"],
  computed: {
    name() {
      return this.review.author;
    },
    initials() {
      let name_split = this.review.author.split(" ");
      return name_split[0][0] + name_split[1][0];
    },
    content() {
      return this.review.content;
    },
    car() {
      return this.review.model;
    },
    rating() {
      return this.review.rating;
    },
  },
};
</script>

<style></style>
