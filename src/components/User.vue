<template>
  <div>
    <div class="token">Token {{tokenResponse}}</div>
  <!--  <button v-on:click="getUser">Get User</button> -->
  <button v-on:click="signInSilent">Renew (Silent)</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'User',
  /**
  data () {
    return {
      accessToken: ''
    }
  },
  **/
  computed: {
    ...mapGetters({
        tokenResponse : 'auth/tokenResponse'
      })
  },
  methods: {
    signInSilent: function () {
        this.$store.dispatch("auth/signInSilent");
    },
    getUser: function () {
          console.log(this.$oidcClient);
          /** 
          this.$oidcClient.signinRedirect().catch(function (err) {
            console.log(err)
          })
          */
          //AuthService.getUser();
    } 
  },
  mounted() {
    /**
    AuthService.getUser().then((data) => {
        this.user = data;
    })
    **/
  }
}
</script>