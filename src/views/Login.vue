<template>
  <div class="d-flex align-center justify-center">
    <v-card class="card">
      <div class="align-center">
        <h4 class="font-weight-regular py-1 card-title">
          Log in to continue to:
        </h4>
        <h3>Trà Lô</h3>
      </div>
      <div class="card-account py-3">
        <v-text-field
          v-model="account"
          dense
          outlined
          placeholder="Enter email"
          append-icon="mdi-account"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          dense
          outlined
          placeholder="Enter password"
          append-icon="mdi-lock"
        ></v-text-field>
        <v-btn color="primary" class="font-weight-bold card-account_btn"
          >Continue</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: "",
      rules: {
        require: (val) => !!val || "Require !",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
};
</script>

<style lang="scss">
.card {
  width: 400px;
  padding: 32px 40px;
  background-color: white;
  color: rgb(94, 108, 132);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  .card-account {
    .card-account_btn {
      width: 100%;
    }
  }
}
</style>
