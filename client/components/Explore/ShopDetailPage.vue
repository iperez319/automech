<!-- TODO: Finish laying out information -->
<template>
  <b-container>
    <div id="test"></div>
    <main v-if="results.name">
      <section>
        <h1>{{ results.name }}</h1>
        <div style="display: flex; gap: 10px; align-items: baseline">
          <b-rating
            :value="results.rating"
            inline
            no-border
            readonly
            style="padding-left: 0"
          ></b-rating>
          <h5>{{ results.user_ratings_total }} reviews</h5>
        </div>
        <div style="display: flex; gap: 10px; align-items: baseline">
          <h5 v-if="!currentOpeningHours.status">CLOSED</h5>
          <h5 v-if="currentOpeningHours.status">OPEN</h5>
          <h5 v-if="currentOpeningHours.status">
            {{ currentOpeningHours.hours }}
          </h5>
        </div>
      </section>

      <div class="dropdown-divider"></div>

      <section>
        <h3>Photos</h3>
        <div
          style="display: flex; gap: 20px; align-items: center; overflow: auto"
        >
          <b-img
            v-for="image in images"
            :src="image"
            style="max-height: 250px; width: auto"
          />
        </div>
      </section>

      <div class="dropdown-divider"></div>

      <section>
        <h3>Location and Hours</h3>
        <div style="display: flex; gap: 10px">
          <div>
            <div id="map" v-b-visible="mapIsVisibleHandler"></div>
            <p v-html="address"></p>
          </div>
          <div>
            <p
              v-for="day in results?.opening_hours?.weekday_text"
              style="font-weight: bold; margin-bottom: 0.1rem"
            >
              {{ day }}
            </p>
          </div>
        </div>
      </section>

      <div class="dropdown-divider"></div>

      <section>
        <h3>Prices</h3>
        <PriceForm :shop="shopObject" />
        <b-list-group>
          <b-list-group-item
            button
            class="mt-2"
            style="
              font-size: 17px;
              font-weight: 600;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
            @click="$router.push('/compare')"
            >Compare your quote from this shop
            <b-icon-arrow-right-square-fill variant="primary" />
          </b-list-group-item>
        </b-list-group>
      </section>

      <div class="dropdown-divider"></div>
      <section>
        <h3>Reviews</h3>
        <ReviewForm class="mb-2" :shop="shopObject" />
        <div>
          <ReviewCard v-for="review in reviews" :review="review" class="mb-2" />
        </div>
      </section>

      <!-- <h3>{{ results.formatted_address }}</h3>
      <h3>{{ results.formatted_phone_number }}</h3>
      <a :href="results.website">{{ results.website }}</a> -->

      <!-- TODO: Finish review section -->
    </main>
  </b-container>
</template>

<script>
import ReviewCard from "./ReviewCard.vue";
import ReviewForm from "./ReviewForm.vue";
import PriceForm from "./PriceForm.vue";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "ShopDetailPage",
  components: { ReviewCard, ReviewForm, PriceForm },
  data() {
    return {
      slide: 0,
      reviews: [],
      results: {},
      //   results: {
      //     formatted_address: "75 Hamilton St, Cambridge, MA 02139, USA",
      //     formatted_phone_number: "(617) 354-5383",
      //     geometry: {
      //       location: {
      //         lat: 42.3583212,
      //         lng: -71.1058055,
      //       },
      //       viewport: {
      //         northeast: {
      //           lat: 42.3595862802915,
      //           lng: -71.10450866970851,
      //         },
      //         southwest: {
      //           lat: 42.3568883197085,
      //           lng: -71.10720663029151,
      //         },
      //       },
      //     },
      //     name: "Good News Garage",
      //     opening_hours: {
      //       open_now: false,
      //       periods: [
      //         {
      //           close: {
      //             day: 1,
      //             time: "1630",
      //           },
      //           open: {
      //             day: 1,
      //             time: "0730",
      //           },
      //         },
      //         {
      //           close: {
      //             day: 2,
      //             time: "1630",
      //           },
      //           open: {
      //             day: 2,
      //             time: "0730",
      //           },
      //         },
      //         {
      //           close: {
      //             day: 3,
      //             time: "1630",
      //           },
      //           open: {
      //             day: 3,
      //             time: "0730",
      //           },
      //         },
      //         {
      //           close: {
      //             day: 4,
      //             time: "1630",
      //           },
      //           open: {
      //             day: 4,
      //             time: "0730",
      //           },
      //         },
      //         {
      //           close: {
      //             day: 5,
      //             time: "1630",
      //           },
      //           open: {
      //             day: 5,
      //             time: "0730",
      //           },
      //         },
      //       ],
      //       weekday_text: [
      //         "Monday: 7:30 AM – 4:30 PM",
      //         "Tuesday: 7:30 AM – 4:30 PM",
      //         "Wednesday: 7:30 AM – 4:30 PM",
      //         "Thursday: 7:30 AM – 4:30 PM",
      //         "Friday: 7:30 AM – 4:30 PM",
      //         "Saturday: Closed",
      //         "Sunday: Closed",
      //       ],
      //     },
      //     photos: [
      //       {
      //         height: 500,
      //         html_attributions: [
      //           '<a href="https://maps.google.com/maps/contrib/102221149156038294790">Good News Garage</a>',
      //         ],
      //         photo_reference:
      //           "AW30NDwznAHgK9s3vPw0QAbBYFNP8ALW-jkVq_UPUd1TSmnwE7ds3FdO92poGMMR0mW1nLNVEJiQ9ZX6BniTM7L1WPTTQybpQZ_KsyTDTvCVPnZXUShky9yBWyGexLZMc7ezxurdjAoqpM6sojjj7C4tsVxx216XJK2P1e_F_fx7qfpg6R3Z",
      //         width: 1500,
      //       },
      //       {
      //         height: 375,
      //         html_attributions: [
      //           '<a href="https://maps.google.com/maps/contrib/102221149156038294790">Good News Garage</a>',
      //         ],
      //         photo_reference:
      //           "AW30NDypKJDbIJwk2U5kp5lsoj30-1xjAR17eEkztK551cPX7umAtJnc6ThnhqT6RcoEL4cH84YeZnk_4gtUQqfeVG3OFhgfatNuaOmTpGj0IwVP3pFyK3ckffHRmc6seAmx6jLzXf9GokcJSVc5Ce7k3EpzBG4p9fXTEEITuTN1ZtV3SaXI",
      //         width: 500,
      //       },
      //       {
      //         height: 333,
      //         html_attributions: [
      //           '<a href="https://maps.google.com/maps/contrib/102221149156038294790">Good News Garage</a>',
      //         ],
      //         photo_reference:
      //           "AW30NDwz1d2Xn_vDsBNZsvuVjRFopl9UX5H7hRWX9l7NoiIGgCFwD4GwBgrjEm_t2HgtZQqzEbF2nx-_0eSzjhTrcb1FIRPOhjmtxlvxsTc9_3Wj2PcasLUTgC564nIACnxmHc4dA_lckzewxTb10XpEFgVup-tdxoAb_ScJqz593sdrhNur",
      //         width: 500,
      //       },
      //       {
      //         height: 375,
      //         html_attributions: [
      //           '<a href="https://maps.google.com/maps/contrib/102221149156038294790">Good News Garage</a>',
      //         ],
      //         photo_reference:
      //           "AW30NDwNqdVGtY9LGiaqh5SGOyDmCbJ5ITYf_r5cUc7LLMM0MkBkS7hqdfZoOMqeVdWiITfDTFSEGlplZmv9LMJSGD97cO-AkPRZJvlDueyNB6SyJ03ggKD9s9oNqTeO35FeHXWl6mHytxo2IZ3vSPCkY2jJBkB6EvVqWo5TOHyU4CLTUIo_",
      //         width: 500,
      //       },
      //       {
      //         height: 2988,
      //         html_attributions: [
      //           '<a href="https://maps.google.com/maps/contrib/102985115984655375594">Brendan Shea</a>',
      //         ],
      //         photo_reference:
      //           "AW30NDyT9g3jyZ3Tmp-Lm5025cKHn0QJ99s3LOTqMEBSF1nfaYKGFTmWejooilP-SprUcQn8hwKHvwJMYNHsOFwd0irFj-pJ8USuxWZjQvA2B1rFd_Gv33qx5a19Z9XeKmiIoMd_H6MJ6ygSUONR7TadQiYZlydCx7gTwXjm6DhxI3yd4-rE",
      //         width: 5312,
      //       },
      //       {
      //         height: 2001,
      //         html_attributions: [
      //           '<a href="https://maps.google.com/maps/contrib/110249935960132139642">Joe Nebus</a>',
      //         ],
      //         photo_reference:
      //           "AW30NDyxRo4kHXhdijBG4QA6vJwFnlcgyRo9HQhstqVKV6c7GSydFCJVCNL7Efws63bq1PyCP2u2ODghEloTr-ctY9_N-nDqbuSqKKavVMU-jv9e_eok4BwcKBr9T5jh13wAavF2b5P5oOIsP3m_37ob9rS9_Zy1WhntljqEeSgxkavcJhVU",
      //         width: 1125,
      //       },
      //       {
      //         height: 480,
      //         html_attributions: [
      //           '<a href="https://maps.google.com/maps/contrib/102221149156038294790">Good News Garage</a>',
      //         ],
      //         photo_reference:
      //           "AW30NDyK0UaTfidNM-ZOvhG4c6CZ_dwi-oPicV_T00CdxRECtkits9XR6LQu7Ge7qMNHiA6YO1xUUdHuYKGvRDQwn2P8EezyYHJ-iup-00EH0KtYIezR3Apnn0M6so1XJXDXzDkTPzkLwfl7iN8Ub0PxehwTDY1sODmOgcQhrm-u3q9MdpOU",
      //         width: 640,
      //       },
      //       {
      //         height: 271,
      //         html_attributions: [
      //           '<a href="https://maps.google.com/maps/contrib/102221149156038294790">Good News Garage</a>',
      //         ],
      //         photo_reference:
      //           "AW30NDyqzTDCZe5DYnj-WhEWLn-P4aiSXSkdOdI_S4zJwkazqMz24ja9ewExwJyGPk7tdtRttEn9meeDJgdUq45MScwsh_M6QHE74Mr3ZVNdMSra63OGx7y6zw1vuoXn9PGkE0h8HmNQknelHbLHIZLCQBfc5xi4khQ95JgmpAi6_Om3Idf-",
      //         width: 500,
      //       },
      //       {
      //         height: 2001,
      //         html_attributions: [
      //           '<a href="https://maps.google.com/maps/contrib/110249935960132139642">Joe Nebus</a>',
      //         ],
      //         photo_reference:
      //           "AW30NDwQDMHw1asObSZCfz0bm6u03VWHzejtKuJW8Oa2XRrve20N5h7oNc2L3zlLOtEWnuZUagTRAUX_z_nbfPA3ETNiGy_uOb8PPqZ8uGeIe9lFHH0BcShxIvEw5XCN8tRPsuxdq6StBfo1_V-Im7dci15JUYNJZKZ-uHirkiRDo58hwWEB",
      //         width: 1125,
      //       },
      //       {
      //         height: 2988,
      //         html_attributions: [
      //           '<a href="https://maps.google.com/maps/contrib/118004355438816970851">Steve Bitto</a>',
      //         ],
      //         photo_reference:
      //           "AW30NDxmvOH2akchanVRD8D6Wqh7RDz9841OO_RxfbyYjegGBujwWxHB2HNGEj7Mhq18dHFd35bl0n_20idkFTyHcapGjoDr6gJw_am0ABMCbUjh1SDrQpOCR-lEZfO5W4OLmdqMVtXaHnPaw44099xL5BtVtS2RxBMzU1ZredURG7euosWT",
      //         width: 5312,
      //       },
      //     ],
      //     rating: 4.8,
      //     reviews: [
      //       {
      //         author_name: "Kelly P",
      //         author_url:
      //           "https://www.google.com/maps/contrib/102216442737495755967/reviews",
      //         language: "en",
      //         original_language: "en",
      //         profile_photo_url:
      //           "https://lh3.googleusercontent.com/a/AEdFTp7N61SaNxwJpd8QCN1az3abA5asT_AWDV0h0mlhj5Q=s128-c0x00000000-cc-rp-mo",
      //         rating: 5,
      //         relative_time_description: "5 months ago",
      //         text: "While this is only my second maintenance experience with Good News Garage, each visit reinforces how honest, hardworking and educational these guys are. They hold my hand through each step as I have not owned a car in decades! They strive for the highest quality and err on the side of conservative so you don't blow out your budget. I had an emergency a few weeks before my scheduled maintenance and had to have a gas station garage do some work and I called Casey panicked.\nHe explained why it waa imperative to take care of the issue immediately and even spoke with the mechanic doing the work. That's above and beyond! Ryan is equally helpful as he walked me through some brake issues and other work that can be scheduled over time. Good New Garage is tops in my opinion! I moved 40 minutes away and will continue to go to them given all of the above. Thank you to everyone at Good News!",
      //         time: 1657386143,
      //         translated: false,
      //       },
      //       {
      //         author_name: "Joshua Cote",
      //         author_url:
      //           "https://www.google.com/maps/contrib/114502353499264714772/reviews",
      //         language: "en",
      //         original_language: "en",
      //         profile_photo_url:
      //           "https://lh3.googleusercontent.com/a-/AD5-WCnC5ns2_BmLVfPwTYsArsQf-9YcrBqAdLVxEjgXsw=s128-c0x00000000-cc-rp-mo",
      //         rating: 5,
      //         relative_time_description: "2 months ago",
      //         text: "Brought a very noisy Subaru in and left with it quieter then It ever has been. They did a thorough inspection and gave me recommendations for service - were honest with what I needed and what could wait, as well as what everything meant. The invoice was completely fair.. I was extremely impressed and will be coming back.",
      //         time: 1664230985,
      //         translated: false,
      //       },
      //       {
      //         author_name: "Ken Ho",
      //         author_url:
      //           "https://www.google.com/maps/contrib/115792461585455377931/reviews",
      //         language: "en",
      //         original_language: "en",
      //         profile_photo_url:
      //           "https://lh3.googleusercontent.com/a/AEdFTp46T9na6RtqskXvzfdM3bve8aV2DI1JOx1CyUVc=s128-c0x00000000-cc-rp-mo",
      //         rating: 5,
      //         relative_time_description: "3 months ago",
      //         text: "I've taken several of my cars here over a decade or two.  They have always been fabulous, never suggesting/pushing unnecessary fixes.  I had a bad odor coming out of the air conditioning system that the dealership could not adequately diagnose, I was concerned that I would have to get rid of the car (an older car which I love).  Ryan and the team found that I had some sort of refrigerant(?) that was the source of the odor, fixed it, and I was able to keep the car, which I am still happily driving.\n\nMore recently, Casey evaluated my exhaust system which the same dealership made sound like it as about to explode (or that it might do so at state inspection testing time).  Casey said it's actually a small leak, and suggested that it's probably not worth fixing until absolutely necessary given the normal deterioration of such systems in this New England environment.  Casey estimated the cost of two different types of repairs for it, one of which will eventually have to be done, but they were basically $1000 or $2000 less than what the dealership estimated.\n\nThis garage is fabulous!",
      //         time: 1660935573,
      //         translated: false,
      //       },
      //       {
      //         author_name: "gary white",
      //         author_url:
      //           "https://www.google.com/maps/contrib/117778014405184422339/reviews",
      //         language: "en",
      //         original_language: "en",
      //         profile_photo_url:
      //           "https://lh3.googleusercontent.com/a/AEdFTp7az6wz-cOl_oteURhzrQARjT0ptxt7KY2UTexL=s128-c0x00000000-cc-rp-mo",
      //         rating: 5,
      //         relative_time_description: "10 months ago",
      //         text: "I went for an oil change, tire rotation and a general check up.\n\nCasey noticed three of my tires were pretty worn. I suggested getting all four replaced. I didn't know one was still in okay shape. And that's what Casey told me and that he didn't see a need to replace it ( I know many other garages that would take advantage of the situation and sell me a tire I didn't really need.) That really impressed me.\n\nI was also there when he patiently, clearly and carefully explained the options involved with servicing my friend's mini Cooper. I have full confidence that he will always tell the complete truth about all car situations. For example, I didn't know what to do about another one of the issues my car was having. So I really appreciate, and have full confidence in, the way he explained the answer to my question, \"What would you do in this situation?\"\nIt was my first time having work done here. And I am extremely happy and relieved to find someone who takes the time to thoroughly explain the entire state of my car. And on top of that, when asked to, he offered game plans on the most economical and prudent ways to move forward.\n\nThanks Casey!\nThanks Good News Garage!\n\nView all Reviews",
      //         time: 1643066048,
      //         translated: false,
      //       },
      //       {
      //         author_name: "Georgia Christakis",
      //         author_url:
      //           "https://www.google.com/maps/contrib/111889763533737448669/reviews",
      //         language: "en",
      //         original_language: "en",
      //         profile_photo_url:
      //           "https://lh3.googleusercontent.com/a-/AD5-WCnOUtJyR1emDfzBvFXqSXL7kD5arGdJy0vcPeeSh9E=s128-c0x00000000-cc-rp-mo-ba4",
      //         rating: 5,
      //         relative_time_description: "6 months ago",
      //         text: "So glad I found a trustworthy place to do work on my car. They're very honest and up front and also advised me on what could be done now and what can wait. Also located close to a Flour bakery so you can grab coffee and something to eat while you wait.",
      //         time: 1653769205,
      //         translated: false,
      //       },
      //     ],
      //     user_ratings_total: 95,
      //     website: "http://goodnewsgaragecambridge.com/",
      //   },
    };
  },
  computed: {
    images() {
      return this.results?.photos?.map((photo) => {
        return photo.getUrl();
      });
    },
    currentOpeningHours() {
      console.log(this.results.opening_hours);
      if (!this.results?.opening_hours)
        return { hours: "NOT AVAILABLE", status: false };
      const d = new Date();
      let day = d.getDay();

      let currentOpeningHours =
        this.results.opening_hours.weekday_text[(6 + day) % 7].split(": ")[1];
      let isOpen = this.results.opening_hours.open_now;

      return { hours: currentOpeningHours, status: isOpen };
    },
    address() {
      if (!this.results.formatted_address) return;
      const address_split = this.results.formatted_address.split(", ");

      const street_name = address_split[0];
      const remaining = address_split.splice(1).join(", ");

      return `<b>${street_name}</b><br>${remaining}`;
    },
    shopObject() {
      return {
        name: this.results.name,
        googlePlaceId: this.$route.params.shopId,
        address: this.results.formatted_address,
        coordinates: this.results.geometry.location.toJSON(),
      };
    },
  },
  methods: {
    mapIsVisibleHandler(isVisible) {
      if (isVisible && this.results) {
        let coordinates = this.results.geometry.location;

        let map = new google.maps.Map(document.getElementById("map"), {
          center: coordinates,
          zoom: 15,
        });

        // TODO: Add InfoWindow to show shop details in map

        const marker = new google.maps.Marker({
          position: coordinates,
          map: map,
        });
      }
    },
  },
  async mounted() {
    const key = "AIzaSyBDEqPqGsjpE-nVKMnMvvblsXpZbS7ZK_w";
    const place_id = this.$route.params.shopId;
    const fields =
      "formatted_address,name,geometry,photo,website,opening_hours,formatted_phone_number,reviews,user_ratings_total,rating";

    // const place_req = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&place_id=${place_id}&fields=${fields}`,
    //   { method: "GET", headers: { "Access-Control-Allow-Origin": "*" } }
    // );
    // const place_res = await place_req.json();

    // this.results = place_res.results;

    const req = await fetch("/api/reviews/" + this.$route.params.shopId);
    const resp = await req.json();
    this.reviews = resp;

    const loader = new Loader({
      apiKey: "AIzaSyBDEqPqGsjpE-nVKMnMvvblsXpZbS7ZK_w",
      libraries: ["places"],
    });

    loader.loadCallback((e) => {
      if (e) console.log(e);
      else {
        this.loaded = true;
        console.log("HERE");
        console.log(document.getElementById("test"));
        let service = new google.maps.places.PlacesService(
          document.getElementById("test")
        );
        service.getDetails(
          { placeId: place_id, fields: fields.split(",") },
          (result, status) => {
            this.results = result;
          }
        );
      }
    });
  },
};
</script>

<style scoped>
.carousel-item img {
  width: 400px;
  min-height: 200px;
  max-height: 400px;
}

.carousel {
  width: fit-content;
}

#map {
  background: black;
  width: 300px;
  height: 150px;
}
</style>
