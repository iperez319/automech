<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import SubmitButton from '@/components/common/SubmitButton.vue';

export default {
  name: 'GetLocalShopsForm',
  mixins: [SubmitButton],
  data() {
    return {value: this.$store.state.shops};
  },
  methods: {
    async submit() {
      this.$store.commit('updateFilter', '');
      this.value = ''; // Clear filter to show all local shops
      this.$store.commit('refreshLocalShops');

      //this.$set(this.alerts, e, 'error');
      //setTimeout(() => this.$delete(this.alerts, e), 3000);
    }
  }
};
</script>