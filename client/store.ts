import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    shops: [], // All shops created in the app
    reviews: [], // All reviews created in the app
    username: null, // Username of the logged in user
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateShops(state, shops) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.shops = shops;
    },
    updateReviews(state, reviews) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.reviews = reviews;
    },
    async refreshShops(state) {
      /**
       * Request the server for the currently available shops.
       */
      const url = '/api/shops';
      console.log('works', url);
      const res = await fetch(url).then(async r => r.json());
      state.shops = res;
    },
    async refreshLocalShops(state, payload) {
      /**
       * Request the server for the currently available local shops.
       */
      const url = '/api/shops/:local';
      const {location, radius} = payload;
      console.log(location, radius);
      const res = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify({'location': {'lng': location.lng, 'lat': location.lat}, 'radius': radius}),
        headers: {'Content-Type': 'application/json'}, credentials: 'same-origin'}).then(async r => r.json());
      state.shops = res;
    },
    async refreshReviews(state) {
      /**
       * Request the server for the currently available reviews.
       */
      const url = '/api/reviews';
      console.log('works', url);
      const res = await fetch(url, {method: 'GET'}).then(async r => r.json());
      state.shops = res;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
