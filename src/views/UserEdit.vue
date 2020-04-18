<template>
  <div>
    User Edit
    <div class="token">{{tokenResponse}}</div>
    <p><router-link to="/user">View User</router-link></p>
     <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'User',
  computed: {
    ...mapGetters({
        tokenResponse : 'auth/tokenResponse'
      })
  },
  methods: {
    logout : function () {
      this.$store.dispatch("auth/signOut");
    }
  }
}
</script>