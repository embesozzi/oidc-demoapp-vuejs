<template>
  <div class="callback">Loading... {{this.tokenResponse}}</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'Callback',
  mounted() {
    this.$store.dispatch("auth/signinRedirectCallback")
    //.then(this.$router.push("/user"));
  },
    computed: {
    ...mapGetters({
        tokenResponse : 'auth/tokenResponse'
      })
  }
}
</script>