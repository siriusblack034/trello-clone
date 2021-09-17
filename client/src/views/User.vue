<template>
  <div class="container home-page d-flex justify-center align-center">
    <v-row>
      <v-col
        cols="12"
        sm="4"
        class="d-flex flex-column justify-center align-center image pb-6"
      >
        <div class="ma-3 d-flex flex-column image-upload">
          <img
            :src="srcImage"
            alt="avatar image"
            style="width: 100%; height: 100%"
          />
          <div
            class="hover-icon d-flex align-center justify-center"
            @click="openModal"
          >
            <v-icon large class="white--text">mdi-lead-pencil</v-icon>
          </div>
        </div>
        <v-btn
          width="80%"
          class="mx-3 my-3 button-upload font-weight-bold"
          large
          @click="openModal"
        >
          <v-icon>mdi-upload</v-icon>
          Tải ảnh mới
        </v-btn>
      </v-col>
      <v-col cols="12" sm="7" class="image pa-9 ml-sm-8 mt-cols-4">
        <v-row class="d-flex align-center justify-center">
          <v-col cols="3" class="text">Tên đăng nhập</v-col>
          <v-col>
            <v-text-field
              dense
              hide-details
              placeholder="Nhập tên đăng nhập"
              v-model="name"
              outlined
              @change="isChange = true"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="3" class="text">Email</v-col>
          <v-col>
            <v-text-field
              dense
              hide-details
              disabled
              v-model="user.email"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="3" class="text">Giới Tính</v-col>
          <v-col>
            <v-select
              @change="isChange = true"
              :items="[
                {
                  text: 'Nam',
                  value: 'nam',
                },
                {
                  text: 'Nữ',
                  value: 'nu',
                },
              ]"
              v-model="sex"
              outlined
              dense
              hide-details=""
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex align-center justify-center mt-6">
        <v-btn
          color="warning"
          large
          class="font-weight-bold black--text"
          :disabled="!isChange"
          x-large
          @click="update"
          >Lưu</v-btn
        >
      </v-col>
    </v-row>
    <ModalUploadImage @changeImage="changeImage" ref="ModalUploadImage" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import helpers from "../utils";
import ModalUploadImage from "../components/ModalUploadImage.vue";
export default {
  components: {
    ModalUploadImage,
  },
  computed: {
    ...mapState(["user"]),
    srcImage() {
      const url = this.newImage || this.user.avatar;
      return helpers.srcImage(url);
    },
  },
  created() {
    this.name = this.user.name;
    this.sex = this.user.sex;
    document.title = 'Profile | Trà Lô' 
  },
  data() {
    return {
      isChange: false,
      newImage: "",
      name: "",
      sex: "",
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    update() {
      var user = {
        avatar: this.newImage || this.user.avatar,
        name: this.name,
        sex: this.sex,
      };
      this.updateUser(user).then((result) => {
        if (result.success) {
          this.$swal.fire({
            icon: "success",
            title: "Cập nhật thành công !",
          });
          this.isChange = false;
          this.newImage = "";
        }
      });
    },
    changeImage(url) {
      this.newImage = url;
      this.isChange = true;
    },
    openModal() {
      this.$refs.ModalUploadImage.toggleShow();
    },
  },
};
</script>

<style scoped>
.home-page {
  position: relative;
  min-height: 100vh;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.image {
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 4px;
}
.text {
  opacity: 0.8;
  font-weight: 600;
}
.image-upload {
  cursor: pointer;
  position: relative;
  width: 300px;
  height: auto;
  border-radius: 6.2px;
  box-sizing: border-box;
  border: 4px solid #fff;
}
.image-upload img {
  border-radius: 4px;
}
.image-upload:hover .hover-icon {
  opacity: 1;
}
.hover-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.4;
  opacity: 0;
}
.button-upload {
  background-color: #2c3445 !important;
  transform: none;
  color: white;
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
</style>