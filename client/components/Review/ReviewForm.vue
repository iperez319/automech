
<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ReviewForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/reviews', //TODO: add endpoint
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'shop', label: 'Shop', value: ''},
        {id: 'model', label: 'Model', value: ''},
        {id: 'services', label: 'Services', value: ''},
        {id: 'rating', label: 'Rating (0 to 5)', value: ''}
      ],
      title: 'Add Review',
      callback: () => {
        console.log('review added');
        const message = 'Successfully added review!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>

