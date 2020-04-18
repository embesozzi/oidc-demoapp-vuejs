<template>
  <div class="callback">Loading... {{this.tokenResponse}}</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'Callback',
  mounted() {
    this.$store.dispatch("auth/signinRedirectCallback")
  },
    computed: {
    ...mapGetters({
        tokenResponse : 'auth/tokenResponse'
      })
  }
}
</script>