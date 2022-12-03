<template>
  <b-container>
    <h4>
      <span class="cost">$500</span> for oil change, and wiper blade replacement
      is too expensive for your area
    </h4>
    <ColorBar firstQuartile="50.00" thirdQuartile="100.00" progress="75" />
  </b-container>
</template>

<script>
import ColorBar from "./ColorBar.vue";
export default {
  name: "CompareResultsPage",
  components: { ColorBar },
};
</script>

<style>
.cost {
  font-weight: 800;
}
</style>
