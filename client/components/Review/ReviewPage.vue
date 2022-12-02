<template>
	  <main>
    <section>
    	<header>
    		<h2>Reviews</h2>
    		<ReviewForm2 />
    	</header>
<!--       <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header> -->
<!--       <ChangeUsernameForm />
      <ChangePasswordForm /> -->
    </section>
  </main>
</template>


<script>
import ReviewForm from '@/components/Review/ReviewForm.vue';
import ReviewForm2 from '@/components/Review/ReviewForm2.vue';
export default {
	name: 'ReviewPage',
	components: {
		ReviewForm,
		ReviewForm2
	}
}
</script>