<template>
  <b-card style="width: fit-content">
    <div>
      <div class="header">
        <h4>{{ shop.name }}</h4>
        <b-form-rating
          inline
          no-border
          :value="shop.averageRating ?? 3"
          readonly
        />
      </div>
      <div>
        <div class="service">
          <b-badge style="font-size: 14px">Blinker Fluid Refill</b-badge>
          <p>Avg. Cost: $109</p>
        </div>
        <div class="service">
          <b-badge style="font-size: 14px">Brake Work</b-badge>
          <p>Avg. Cost: $200</p>
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
