<!-- TODO: Fix pointer if time left -->
<template>
  <div class="bar-container" style="margin: auto">
    <div class="small-section green"></div>
    <div class="large-section yellow">
      <p class="divider-amount">${{ firstQuartile }}</p>
    </div>
    <div class="small-section red">
      <p class="divider-amount">${{ thirdQuartile }}</p>
    </div>
    <div
      class="pointer"
      :style="{ left: 'calc(' + costPercentile + '%' + ' - 10px)' }"
    ></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ColorBar",
  props: {
    costPercentile: Number, // percentage
    firstQuartile: Number,
    thirdQuartile: Number,
  },
};
</script>

<style>
.bar-container {
  display: flex;
  position: relative;
  gap: 5px;
  width: fit-content;
}
.pointer {
  border-radius: 50%;
  height: 20px;
  width: 20px;
  background: black;
  position: absolute;
}
.small-section {
  width: 250px;
  height: 20px;
  border-radius: 5px;
  position: relative;
}
.large-section {
  width: 500px;
  height: 20px;
  border-radius: 5px;
  position: relative;
}
.red {
  background: #f28b82;
}
.green {
  background: #81c995;
}
.yellow {
  background: #f8d664;
}

.divider-amount {
  position: absolute;
  left: -20px;
  top: 25px;
}
</style>
