<template>
  <div
    class="d-flex align-center justify-center text-center"
    style="min-height: 100vh"
  >
    <v-card class="card" elevation="5" ref="form">
      <h3 class="mb-2">Cập nhật mật khẩu</h3>
      <div class="card-account py-3">
        <v-text-field
          ref="oldPassword"
          v-model="password.text"
          dense
          type="password"
          outlined
          placeholder="Nhập mật khẩu cũ"
          :rules="[rules.require]"
        ></v-text-field>
        <v-text-field
          ref="newPassword"
          v-model="newPassword"
          dense
          :append-icon="checkPassword"
          :type="password.type"
          outlined
          placeholder="Nhập mật khẩu mới"
          :rules="[rules.require, rules.min]"
          hint="Mật khẩu ít nhất có 6 ký tự"
          @click:append="showPassword"
        ></v-text-field>

        <span class="red--text">{{ messError }}</span>
        <v-btn
          color="success"
          style="width: 80%"
          class="font-weight-bold card-account_btn py-3 mt-2"
          @click="submit"
          >Lưu mật khẩu</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
import services from "../services";
export default {
  created() {
    document.title = "ChangePassword | Trà Lô";
  },
  computed: {
    checkPassword() {
      return this.newPassword ? this.password.icon : "mdi-lock";
    },
    form() {
      return {
        newPassword: this.newPassword,
        oldPassword: this.password.text,
      };
    },
  },
  data() {
    return {
      newPassword: "",
      messError: "",
      formHasErrors: false,
      password: {
        text: "",
        type: "password",
        icon: "mdi-eye",
      },
      rules: {
        require: (val) => !!val || "Không được bỏ trống !",
        min: (v) => v.length >= 6 || "Mật khẩu phải 6 ký tự trở lên!",
      },
    };
  },
  methods: {
    showPassword() {
      if (this.newPassword) {
        this.password.type =
          this.password.type == "password" ? "text" : "password";
        this.password.icon =
          this.password.type == "password" ? "mdi-eye" : "mdi-eye-off";
      }
    },
    submit() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (!this.formHasErrors) {
        services.authService
          .changePassword({
            newPass: this.newPassword,
            oldPass: this.password.text,
          })
          .then((result) => {
            if (result.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: result.data.message,
              });
            } else if (result.status == 417) {
              this.$swal.fire({
                icon: "error",
                title: result.data.message,
              });
            }
          });
      }
    },
  },
};
</script>


<style scoped >
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
}
.card-account_btn {
  text-transform: none;
}
</style>
