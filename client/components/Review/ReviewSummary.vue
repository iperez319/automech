<template>
	<p>ReviewSummary</p>
</template>

<script>
//Credit: https://vue-multiselect.js.org/#sub-multiple-select
export default {
  components: {
  },
  data () {
    return {
    	datum: {
    		'shop': 'Vipre Auto',
    		'model': 'Toyota Sienna 2007',
    		'services': ['Oil Change', 'Tire Adjustment'],
    		'rating': '4',
    		'description': 'I thought they did a good job, though it could have gone faster. It took around 2 days'
    	}
    }
  },
  methods: {
  }
}
</script>