<template>
  <div class="d-flex align-center justify-center text-center">
    <v-card class="card" elevation="5" @keydown.enter="getAuth()">
      <div class="align-center">
        <h4 class="font-weight-regular py-1 card-title">
          Log in to continue to:
        </h4>
        <h3 style="color: #253858">Sign up for your account</h3>
      </div>
      <div class="card-account py-3">
        <v-text-field
          v-model="account"
          dense
          outlined
          placeholder="Enter email"
          append-icon="mdi-account"
          :rules="[rules.require, rules.email]"
        ></v-text-field>
        <v-text-field
          v-model="password.text"
          :type="password.type"
          dense
          outlined
          placeholder="Enter password"
          :append-icon="checkPassword"
          :rules="[rules.require]"
          @click:append="showPassword"
        ></v-text-field>
        <span class="red--text">{{ messError }}</span>
        <v-btn
          color="success"
          style="width: 100%"
          class="font-weight-bold card-account_btn py-3 mt-2"
          @click="getAuth()"
          >Đăng Nhập</v-btn
        >
      </div>
      <h4 class="font-weight-thin">HOẶC</h4>
      <div class="login-associate pb-2">
        <v-btn
          v-for="(associate, index) in associates"
          :key="index"
          color="white"
          class="d-flex justify-center align-center pl-3 py-2 my-3"
          elevation="7"
          @click="loginWithAssociate(associate.name)"
          style="width: 100%; height: 42px"
        >
          <v-icon :color="associate.color">{{ associate.icon }}</v-icon>
          <span
            class="font-weight-bold pl-3"
            style="color: #505f79; text-transform: none; letter-spacing: 0.4px"
            >Tiếp tục với {{ associate.name }}</span
          >
        </v-btn>
      </div>
      <hr />
      <div class="take-password d-flex justify-space-around align-center">
        <span
          @click="$router.push({ name: 'ForgotPassword' })"
          class="forgot-pass"
          >Không thể đăng nhập</span
        >
        <span @click="$router.push({ name: 'Logup' })" class="register"
          >● Đăng kí tài khoản</span
        >
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    checkPassword() {
      return this.password.text ? this.password.icon : "mdi-lock";
    },
  },
  data() {
    return {
      params: {
        client_id:
          "674926875872-t4veb122uilveljl5iepkd81s9d3idjb.apps.googleusercontent.com",
      },
      renderParams: {
        width: 320,
        height: 42,
        longtitle: true,
      },
      associates: [
        {
          name: "Facebook",
          icon: "mdi-facebook",
          color: "blue",
        },
        {
          name: "Gmail",
          icon: "mdi-gmail",
          color: "red darken-4",
        },
        {
          name: "Github",
          icon: "mdi-github",
          color: "black",
        },
      ],
      messError: "",
      account: "",
      password: {
        text: "",
        type: "password",
        icon: "mdi-eye",
      },
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
  methods: {
    ...mapActions(["login", "loginWithGmail"]),

    showPassword() {
      console.log(process.env.VUE_APP_API);
      if (this.password.text) {
        this.password.type =
          this.password.type == "password" ? "text" : "password";
        this.password.icon =
          this.password.type == "password" ? "mdi-eye" : "mdi-eye-off";
      }
    },
    getAuth() {
      if (this.account && this.password.text) {
        let loading = this.$loading.show();
        this.login({
          isLogin: true,
          email: this.account,
          password: this.password.text,
        })
          .then((result) => {
            if (result.success) {
              loading.hide();
              this.$router.push({ name: "HomeBoards" });
            }
          })
          .catch((error) => {
            console.log(error);
            this.messError = "Sai mật khẩu | tài khoản !";
          });
        loading.hide();
      }
    },
    async loginWithAssociate(name) {
      if (name == "Gmail") {
        const googleUser = await this.$gAuth.signIn();
        console.log(googleUser);
      }
    },
  },
};
</script>


<style lang="scss"  >
.card {
  width: 400px;
  padding: 32px 40px;
  background-color: white;
  color: rgb(94, 108, 132);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
}
.take-password {
  color: #0052cc;
  opacity: 0.7;
  font-size: 1rem;
  padding: 15px 0;

  .forgot-pass,
  .register {
    cursor: pointer;
  }
}
</style>
