<!-- TODO: add star rating ui -->

<template>
  <b-form @submit.prevent="submit">

    <label>Shop:</label>
    <b-input @input="shopValue = $event"/>

    <label>Model:</label>
    <b-input @input="modelValue = $event"/>

    <label>Services:</label>
    <multiselect 
      v-model="value" 
      :options="serviceOptions" 
      :multiple="true" 
      :close-on-select="false" 
      :clear-on-select="false" 
      :preserve-search="true" 
      placeholder="Pick some" 
      label="name" 
      track-by="name" 
      @input="updateInput"
      :preselect-first="false">
      <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
    </multiselect>

    <label>Rating:</label>
    <b-input @input="ratingValue = $event"/>

    <label>Description:</label>
    <b-input @input="descriptionValue = $event"/>

    <b-button
      variant="primary"
      type="submit"
    >
      Submit
    </b-button>
  </b-form>
</template>

<script>
//Credit: https://vue-multiselect.js.org/#sub-multiple-select
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      value: [],
      shopValue: '',
      modelValue: '',
      servicesValue: [],
      ratingValue: '',
      descriptionValue: '',
      serviceOptions: [
        { name: 'Oil Change'},
        { name: 'Tire Adjustment'},
        { name: 'Spark Plug Replacement'},
        { name: 'Replace Oxygen Sensor'},
        { name: 'Tighten Fuel Cap'},
        { name: 'Replace AC'  }
      ]
    }
  },
  methods: {
    updateInput(value) {
      console.log(value);
      this.servicesValue = value.map(entry => entry.name);
      console.log(this.servicesValue);
    },
    async submit() {
      console.log('submit');
      console.log(this.shopValue, this.modelValue, this.servicesValue, this.ratingValue, this.descriptionValue);
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


