<template>
  <v-app id="keep">
    <v-app-bar
        app
        clipped-left
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <span class="title ml-3 mr-5">Store&nbsp;<span class="font-weight-light">Online</span></span>
    </v-app-bar>
    <v-main class="grey lighten-4">
      <v-progress-linear :indeterminate="true" />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'Callback',
  mounted() {
    this.$store.dispatch("auth/signinRedirectCallback")
  }
}
</script>