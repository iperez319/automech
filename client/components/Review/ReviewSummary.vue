<template>
	<div class="card">
	  <div class="card-body">
	    <h4>{{datum.shop}}</h4>
	    <p><h6 class="inline">Model:</h6> {{datum.model}}</p>
	    <p><h6 class="inline">Services:</h6></p>
	    <b-list-group >
	    	<b-list-group-item v-for="service in datum.services">{{service}}</b-list-group-item>
	    </b-list-group>
	    <p><h6 class="inline">Rating:</h6>{{datum.rating}}</p>
	    <p><h6 class="inline">Description:</h6>{{datum.description}}</p>
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
  		default: {}
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