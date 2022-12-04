<!-- TODO: add star rating ui -->

<template>
  <b-form @submit.prevent="submit">

    <label>Shop:</label>
    <b-input @input="shopValue = $event"/>

    <label>Car:</label>
    <div class="card">
      <div class="card-body">
        <div>Make: <b-input @input="makeValue = $event"/></div>
        <div>Model: <b-input @input="modelValue = $event"/></div>
        <div>Year: <b-input @input="yearValue = $event"/></div>
      </div>
    </div>

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

    <label v-if="servicesValue.length">Prices</label>
    <div class="card" v-if="servicesValue.length">
      <div class="card-body">
        <div v-for="s in servicesValue">Price for <b>{{s.name}}</b>
          <b-input @input="s.price=$event"/>
        </div>
      </div>
    </div>

    <label>Rating:</label>
    <b-input @input="ratingValue = $event"/>

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
      makeValue: '',
      modelValue: '',
      yearValue: '',
      servicesValue: [],
      ratingValue: '',
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
      // this.servicesValue = value.map(entry => entry.name);
      this.servicesValue = value;
      console.log(this.servicesValue);
    },
    async submit() {
      console.log('submit');
      console.log(this.shopValue, this.makeValue, this.servicesValue, this.ratingValue, this.makeValue, this.modelValue, this.yearValue);
    }
  },
  async created() {
    console.log("CREATED!");
    
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


