<template>
  <div>
      Access Denied
      <p>
        <router-link to="/user">Go to User View</router-link>
      </p>
      <p>
        <router-link to="/home">Go to Home</router-link>
      </p>
  </div>
</template>

<script>
export default {
  name: 'AccessDenied'
}
</script>