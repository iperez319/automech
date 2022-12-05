<template>
  <main>
    <section>
      <header>
        <h2>Add Review</h2>
        <ReviewForm2 />
      </header>
      <!--       <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header> -->
      <!--       <ChangeUsernameForm />
      <ChangePasswordForm /> -->
    </section>
    <section>
      <h2>Reviews</h2>
      <div v-for="datum in reviewList" :key="datum.id">
        <p></p>
        <ReviewSummary :datum="datum" />
      </div>
    </section>
    </section>
      <div class="middle">
        <GetReviewsForm
          ref="getReviewsForm"
          button="🔄 Get all reviews"
        />
      </div>

      <section
        v-if="$store.state.reviews.length"
      >
        <ReviewSummary
          v-for="review in $store.state.reviews"
          :key="review.id"
          :shop="review"
        />
      </section>
      <!--
      <div class="display">
        <div style="flex-shrink: 0" class="listContainer">
          <ShopListItem v-for="shop in results" :shop="shop" />
        </div>
        <div id="map"></div>
      </div>
      /> -->
    </section>
  </main>
</template>

<script>
import ReviewForm from "@/components/Review/ReviewForm.vue";
import ReviewForm2 from "@/components/Review/ReviewForm2.vue";
import ReviewSummary from "@/components/Review/ReviewSummary.vue";
import GetReviewsForm from "@/components/Review/GetReviewsForm.vue";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "ReviewPage",
  components: {
    ReviewForm,
    ReviewForm2,
    ReviewSummary,
    GetReviewsForm
  },
  // data() {
  //   return {
  //     reviewList: [
  //       {
  //         shop: "Vipre Auto",
  //         model: "Toyota Sienna 2007",
  //         services: ["Oil Change", "Tire Adjustment"],
  //         rating: "4",
  //         description:
  //           "I thought they did a good job, though it could have gone faster. It took around 2 days",
  //         id: "ljookj",
  //       },
  //       {
  //         shop: "Cambridge Car",
  //         model: "Oxford Wrangler 2009",
  //         services: ["Spark Plug Replacement", "Replace Oxygen Sensor"],
  //         rating: "5",
  //         description: "Terrific work! Jolly good show.",
  //         id: "asdkfjf",
  //       },
  //     ],
  //   };
  // },
  mounted() {
    const loader = new Loader({
      apiKey: "AIzaSyBDEqPqGsjpE-nVKMnMvvblsXpZbS7ZK_w",
      libraries: ["places"],
    });

    loader.loadCallback((e) => {
      if (e) console.log(e);
      else {
        console.log("LOADED");
        this.loaded = true;
      }
    });
  },
};
</script>
