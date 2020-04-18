<template>
  <div>
    User View
    <div class="token">{{tokenResponse}}</div>
    <p><router-link to="/user/edit">Edit User</router-link></p>
    <div>
        API Call:
        <span v-if="user!=null">{{user.item}}</span>
        <span v-else>No Data</span>
        {{user}}
    </div>
    <button v-on:click="getUser">API Get User</button>
    <button v-on:click="logout">Logout</button>
    <!-- <button v-on:click="signInSilent">Renew (Silent)</button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'User',
  computed: {
    ...mapGetters({
        tokenResponse : 'auth/tokenResponse',
        user : 'users/user'
      })
  },
  methods: {
    getUser : function() {
        this.$store.dispatch("users/getUser");
    },
    signInSilent: function () {
        this.$store.dispatch("auth/signInSilent");
    },
    logout : function () {
      this.$store.dispatch("auth/signOut");
    }
  }
}
</script>