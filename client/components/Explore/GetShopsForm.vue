<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import SubmitButton from '@/components/common/SubmitButton.vue';

export default {
  name: 'GetShopsForm',
  mixins: [SubmitButton],
  data() {
    return {value: this.$store.state.shops};
  },
  methods: {
    async submit() {
      this.$store.commit('updateFilter', '');
      this.value = ''; // Clear filter to show all shops
      this.$store.commit('refreshShops');

      //this.$set(this.alerts, e, 'error');
      //setTimeout(() => this.$delete(this.alerts, e), 3000);
    }
  }
};
</script>