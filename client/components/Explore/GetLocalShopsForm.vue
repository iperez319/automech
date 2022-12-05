<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import SubmitButton from '@/components/common/SubmitButton.vue';

export default {
  name: 'GetLocalShopsForm',
  mixins: [SubmitButton],
  data() {
    return {
      currentLocation: null,  
      value: this.$store.state.shops};
  },
  methods: {
    async submit() {
      this.$store.commit('updateFilter', '');
      this.value = ''; // Clear filter to show all local shops
      var coords = this.currentLocation.coords;
      console.log('coords', coords);
      console.log('latitude', coords.latitude);
      var payload = {
        'location': {'lat':coords.latitude,'lng':coords.longitude}, 
        'radius': 100
      };
      this.$store.commit('refreshLocalShops', payload);

      //this.$set(this.alerts, e, 'error');
      //setTimeout(() => this.$delete(this.alerts, e), 3000);
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLocation = position; 
      console.log('yay', position);
    });
  },
};
</script>