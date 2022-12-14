<template>
  <b-container v-if="firstQuartile && thirdQuartile && percentile">
    <section class="text-center mb-4">
      <h4>
        <span class="cost">${{ totalCost }}</span> for {{ serviceNames }} is
        {{ priceRange }} for your area
      </h4>
      <ColorBar
        :firstQuartile="firstQuartile"
        :thirdQuartile="thirdQuartile"
        :costPercentile="percentile"
      />
    </section>
    <section>
      <h3>Feed</h3>
      <TransactionCard
        v-for="transaction in transactions"
        :transaction="transaction"
        class="mb-2"
      />
    </section>
  </b-container>
</template>

<script>
import ColorBar from "./ColorBar.vue";
import TransactionCard from "./TransactionCard.vue";

export default {
  name: "CompareResultsPage",
  components: { ColorBar, TransactionCard },
  data() {
    return {
      firstQuartile: null,
      thirdQuartile: null,
      percentile: null,
      transactions: null,
    };
  },
  props: ["shop", "services", "car"],
  computed: {
    totalCost() {
      return (this.services ?? []).reduce((a, b) => a + b.price, 0);
    },
    serviceNames() {
      let names = (this.services ?? []).map((s) => s.name);
      if (names.length <= 1) return names[0];
      return names.slice(0, -1).join(", ") + ", and" + names.slice(-1)[0];
    },
    priceRange() {
      const totalCost = (this.services ?? []).reduce((a, b) => a + b.price, 0);
      if (totalCost <= this.firstQuartile) {
        return "cheap";
      } else if (
        totalCost > this.firstQuartile &&
        totalCost <= this.thirdQuartile
      ) {
        return "typical";
      } else {
        return "too expensive";
      }
    },
  },
  async mounted() {
    if (!this.shop || !this.services || !this.car) {
      this.$router.push("/compare");
      return;
    }

    const shop = JSON.parse(JSON.stringify(this.shop)); // Solves weird issue no time to look into
    const services = JSON.parse(JSON.stringify(this.services));
    const car = this.car;

    const url = "/api/services/compare";
    const req = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ shop, services, car }),
      headers: { "Content-Type": "application/json" },
    });
    const req_obj = await req.json();

    if (req.status == 400) {
      alert("Sorry no data available for these services in this area");
    } else {
      console.log(req_obj);
      const { firstQuartile, thirdQuartile, percentile } = req_obj;
      this.firstQuartile = firstQuartile;
      this.thirdQuartile = thirdQuartile;
      this.percentile = percentile;
    }

    const queryParams = this.services
      .map((service) => `services[]=${service.name}`)
      .join("");

    const trans_req = await fetch("/api/services?" + queryParams);
    const trans_res = await trans_req.json();
    this.transactions = trans_res;
  },
};
</script>

<style>
.cost {
  font-weight: 800;
}
</style>
