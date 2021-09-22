<template>
  <div class="d-flex align-center justify-center">
    <v-stepper v-model="e1" elevation="5">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Tạo tài khoản
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Nhập thông tin
        </v-stepper-step>

        <v-divider></v-divider>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="card" elevation="0" @keydown.enter="nextStep">
            <div class="align-center">
              <h4
                style="color: #253858"
                class="font-weight-regular py-1 card-title"
              >
                Sign up for your account
              </h4>
              <h3 style="color: #253858">Trà Lô</h3>
            </div>
            <div class="card-account py-3">
              <v-text-field
                v-model="account"
                dense
                type="email"
                outlined
                placeholder="Nhập Email"
                append-icon="mdi-account"
                :rules="[rules.require, rules.email]"
              ></v-text-field>
              <v-text-field
                v-model="password.text"
                :type="password.type"
                dense
                outlined
                placeholder="Nhập mật khẩu"
                :append-icon="checkPassword"
                :rules="[rules.require]"
                @click:append="showPassword('password')"
              ></v-text-field>
              <v-text-field
                v-model="passwordAgain.text"
                :type="passwordAgain.type"
                dense
                outlined
                placeholder="Nhập lại mật khẩu"
                :append-icon="checkPasswordAgain"
                :rules="[rules.require, rules.checkPasswordAgain]"
                @click:append="showPassword('1')"
              ></v-text-field>
              <span v-if="checkError" class="red--text text-center">{{
                error1
              }}</span>

              <v-btn
                color="success"
                style="width: 100%"
                class="font-weight-bold card-account_btn py-3 mt-2"
                @click="nextStep()"
                >Tiếp tục</v-btn
              >
            </div>

            <hr />
            <div class="take-password d-flex justify-space-around align-center">
              <span @click="$router.push({ name: 'Login' })" class="register">
                Already have an Atlassian account? Log in</span
              >
            </div>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="card" elevation="0" width="100%">
            <div class="align-center">
              <h4
                style="color: #253858"
                class="font-weight-regular py-1 card-title"
              >
                Sign up for your account
              </h4>
              <h3 style="color: #253858">Trà Lô</h3>
            </div>
            <div
              class="
                card-account
                py-3
                d-flex
                flex-column
                align-start
                justify-center
              "
            >
              <div style="width: 100%">
                <v-text-field
                  v-model="info.name"
                  dense
                  outlined
                  placeholder="Nhập nick name"
                  append-icon="mdi-account"
                  :rules="[rules.require]"
                ></v-text-field>
                <v-radio-group v-model="info.sex">
                  <div class="d-flex align-center justify-space-around">
                    <h3 class="font-weight-medium">Giới tính:</h3>
                    <v-radio label="Nam" value="nam" class="mt-2"></v-radio>
                    <v-radio label="Nữ" value="nu"></v-radio>
                  </div>
                </v-radio-group>
              </div>
            </div>
            <span class="red--text text-center">{{ error2 }}</span>
          </v-card>
          <div class="d-flex align-center justify-space-around">
            <v-btn
              color="red"
              large
              class="font-weight-medium card-account_btn py-3 mt-2 white--text"
              @click="e1 = 1"
              >Trở lại</v-btn
            >
            <v-btn
              large
              color="success"
              class="font-weight-medium card-account_btn py-3 mt-2"
              @click="register()"
              >Hoàn tất đăng ký</v-btn
            >
          </div>
          <hr class="mt-6" />
          <div class="take-password d-flex justify-space-around align-center">
            <span @click="$router.push({ name: 'Login' })" class="register">
              Already have an Atlassian account? Log in</span
            >
          </div>
        </v-stepper-content>
        <!-- <v-stepper-content step="3">
          <v-card class="card">
            <div class="d-flex flex-column align-start justify-center">
              <h4 class="pt-3 pb-2">Chọn ảnh đại diện:</h4>
              <div>
                <div>
                  <v-btn @click="chooseImage()">choose a photo</v-btn>
                  <input
                    type="file"
                    ref="inputImage"
                    style="display: none"
                    @change="previewImage"
                    accept="image/*"
                  />
                </div>
                <div v-if="imageData != null && uploadValue > 0">
                  <h2>Uploading ....</h2>
                  <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="15"
                    :value="uploadValue"
                    color="teal"
                  >
                    <span>{{ uploadValue }} %</span>
                  </v-progress-circular>
                </div>
                <div style="border-radius: 50%" v-if="imageData != null">
                  <img class="preview" height="268" width="356" :src="img1" />
                  <br />
                </div>
              </div>
            </div>
          </v-card>
        </v-stepper-content> -->
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    checkPassword() {
      return this.password.text ? this.password.icon : "mdi-lock";
    },
    checkPasswordAgain() {
      return this.passwordAgain.text ? this.passwordAgain.icon : "mdi-lock";
    },
  },
  data() {
    return {
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
      e1: 1,
      error1: "",
      error2: "",
      checkError: false,
      account: "",
      info: {
        name: "",
        sex: "male",
      },
      /* imageData: null,
      img1: "",
      caption: "",
      uploadValue: 0, */
      password: {
        text: "",
        textAgain: "",
        typeAgain: "password",
        type: "password",
        icon: "mdi-eye",
      },
      passwordAgain: {
        text: "",
        type: "password",
        icon: "mdi-eye",
      },
      rules: {
        require: (val) => {
          this.error1 = val == "" ? "Cần nhập thông tin!" : "";
        },
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          this.error1 = pattern.test(value)
            ? this.error1
            : "Email phải có dạng 'xyz@gmail.com' !";
        },
        checkPasswordAgain: (value) => {
          this.error1 =
            value == this.password.text
              ? this.error1
              : "Mật khẩu không giống nhau !";
        },
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    showPassword(type) {
      if (type == "password") {
        if (this.password.text) {
          this.password.type =
            this.password.type == "password" ? "text" : "password";
          this.password.icon =
            this.password.type == "password" ? "mdi-eye" : "mdi-eye-off";
        }
      } else {
        if (this.passwordAgain.text) {
          this.passwordAgain.type =
            this.passwordAgain.type == "password" ? "text" : "password";
          this.passwordAgain.icon =
            this.passwordAgain.type == "password" ? "mdi-eye" : "mdi-eye-off";
        }
      }
    },
    register() {
      var loading = this.$loading.show();
      if (this.password.text == this.passwordAgain.text) {
        if (this.info.name) {
          this.login({
            isLogin: false,
            email: this.account,
            password: this.password.text,
            name: this.info.name,
            sex: this.info.sex,
          })
            .then((result) => {
              if (result.success) {
                loading.hide();
                this.$router.push({ name: "home-boards" });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.error2 = "Cần nhập đủ thông tin!";
        }
      }
      this.e1 = 1;
      loading.hide();
    },
    nextStep() {
      this.checkError = true;
      if (this.error1 === "") {
        this.checkError = false;
        this.e1 = 2;
        this.error2 = "";
      }
    },

    //upload Image
    /*  chooseImage() {
      this.$refs.inputImage.click();
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes).toFixed(2) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            console.log(this.img1);
          });
        }
      );
    }, */
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
}
.take-password {
  color: #0052cc;
  opacity: 0.7;
  font-size: 1rem;
  padding: 15px 0;

  .forgot-pass,
  .register {
    cursor: pointer;
    transition: all 1 ease-in 0;
  }
}
.register:hover {
  text-decoration: underline;
}
</style>
