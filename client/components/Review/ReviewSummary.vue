<template>
	<div class="card">
	  <div class="card-body">
	    <h4>{{datum.name}}</h4>
	    <p><h6 class="inline">Model:</h6>
	    	<div class="card" v-if="datum.model">
		      <div class="card-body">
		        <div><h6 class="inline">Make: {{datum.model.make}}</h6></div>
		        <div><h6 class="inline">Model: {{datum.model.model}}</h6></div>
		        <div><h6 class="inline">Year: {{datum.model.year}}</h6></div>
		      </div>
		    </div>
	    </p>
	    <p><h6 class="inline">Services:</h6></p>
<!-- 	    <b-list-group >
	    	<b-list-group-item v-for="service in datum.services">{{service}}</b-list-group-item>
	    </b-list-group> -->
	    <div class="card" v-if="datum.services.length">
      <div class="card-body">
        <div v-for="s in datum.services"><h6 class="inline">{{s.name}}</h6>: 
          <p>${{s.price}}</p>
        </div>
      </div>
    </div>
	    <p ><h6 class="inline">Rating:</h6>
	    	<b-form-rating
		      v-model.number="datum.rating"
		      class="mb-2"
		      variant="warning"
		      show-value
		      show-value-max
		      no-border
		      readonly
    ></b-form-rating></p>
	  </div>
	</div>
</template>

<script>
//Credit: https://vue-multiselect.js.org/#sub-multiple-select
export default {
  components: {
  },
  data () {
    return {
    	// datum: {
    	// 	'shop': 'Vipre Auto',
    	// 	'model': 'Toyota Sienna 2007',
    	// 	'services': ['Oil Change', 'Tire Adjustment'],
    	// 	'rating': '4',
    	// 	'description': 'I thought they did a good job, though it could have gone faster. It took around 2 days'
    	// }
    }
  },
  props: {
  	datum: {
  		type: Object,
  		default: () => {}
  	}
  },
  methods: {
  }
}
</script>

<style scoped>
.inline {
	display:  inline-block;
}
</style>