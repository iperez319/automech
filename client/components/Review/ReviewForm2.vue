<template>
  <b-form>
    <label :for="shop">Shop:</label>
    <b-input
      :name="shop"
      :value="shopvalue"
      @input="shopvalue = $event.target"
    />
    <label :for="services">Services:</label>
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
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


