<template>
  <div>
    <v-btn color="success" @click="logOut"> Logout</v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["userLoggout"]),
    logOut() {
      this.userLoggout();
      this.$router.push({
        name: "LoggedOut",
      });
    },
  },
};
</script>

<style>

</style>