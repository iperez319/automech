<template>
  <b-card style="width: fit-content">
    <div>
      <div class="header">
        <h4>
          <a :href="'#/shop/' + shop.googlePlaceId" style="color: black">{{
            shop.name
          }}</a>
        </h4>
        <br />
        <b-form-rating
          inline
          no-border
          :value="shop.averageRating ?? 3"
          readonly
        />
      </div>
      <div>
        <div class="service" v-for="service in shop.averagePrices">
          <b-badge style="font-size: 14px">{{ service.name }}</b-badge>
          <p>Avg. Cost: ${{ service.averagePrice }}</p>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "ShopListItem",
  props: ["shop"],
};
</script>

<style>
.header {
  display: flex;
  align-items: baseline;
}
.service {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
</style>
