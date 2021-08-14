<template>
  <v-container class="flex align-center justify-center">
    <div>
      <h1 class="mb-6">Page not exist !!</h1>
      <v-btn color="success" large @click="$router.push({ name: 'Home' })"
        >Back to Home</v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>