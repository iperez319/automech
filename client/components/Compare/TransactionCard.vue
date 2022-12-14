<template>
  <b-card>
    <div style="display: flex; gap: 10px; align-items: baseline">
      <b-avatar>{{ initials }}</b-avatar>
      <h4>{{ name }}</h4>
    </div>
    <b-card-text>
      Paid ${{ price }} for {{ transaction.name }} in
      <a :href="'/#/shop/' + shop.googlePlaceId">{{ shop.name }}</a>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "TransactionCard",
  props: ["transaction"],
  computed: {
    name() {
      return this.transaction.user;
    },
    initials() {
      let name_split = this.transaction.user.split(" ");
      return name_split[0][0] + name_split[1][0];
    },
    price() {
      return this.transaction.price;
    },
    shop() {
      return this.transaction.shop;
    },
  },
};
</script>

<style></style>
