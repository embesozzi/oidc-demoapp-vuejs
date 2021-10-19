<template>
   <v-app id="inspire">
      <v-app-bar
          app
        >
      <img
        src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Telekom_Logo_2013.svg/200px-Telekom_Logo_2013.svg.png" style="width:60px;"
        alt="HT"
      >
        <v-toolbar-title>
          <span class="title ml-3 mr-5">Store&nbsp;<span class="font-weight-light">Online</span></span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text v-on:click="signIn"> 
            <v-icon>mdi-login</v-icon>
            Log In
        </v-btn>
    </v-app-bar>
    <v-container
      class="fill-height"
      fluid>
      <v-row 
        align="center" 
        justify="center">
        <v-col class="text-center">
            <h1 class="display-1 font-weight-thin mb-4">Welcome to our online store!</h1>
        </v-col>
      </v-row>
    </v-container>
    </v-app>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
      icons: [
        'mdi-web',
        'mdi-github',
        'mdi-linkedin'
      ]}
  ),
  methods: {
    signIn: function () {
        this.$store.dispatch("auth/signin");
    }
  }
}
</script>