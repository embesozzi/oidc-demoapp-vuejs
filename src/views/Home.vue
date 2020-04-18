<template>
  <div>
      <button v-on:click="signIn">Sign In</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    signIn: function () {
        this.$store.dispatch("auth/signin");
    }
  }
}
</script>