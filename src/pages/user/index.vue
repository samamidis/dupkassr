<template>
    <div class="">
        <h4>User Page</h4>
        <nuxt-link :to="localePath('user-profile')">{{ $t('home') }}</nuxt-link>
        <p> UserName : </p>
    </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Event Listing'
    }
  }
}
</script>

<style>
</style>
