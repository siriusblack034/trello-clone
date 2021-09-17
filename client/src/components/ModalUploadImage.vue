<template>
  <div>
    <my-upload
      field="avatar"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="300"
      :height="300"
      url="http://localhost:8080/upload-image"
      langType="vi"
      :headers="headers"
      noSquare
      img-format="png"
    ></my-upload>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload/upload-2.vue";
export default {
  data() {
    return {
      show: false,
      url: `${process.env.VUE_APP_API}/upload-image`,
      headers: {
        Authorization: `Bearer ${this.$store.state.token}`,
      },
    };
  },
  components: {
    "my-upload": myUpload,
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },

    cropSuccess() {},

    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
      this.$emit("changeImage", jsonData.url);
      this.show = false;
    },

    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
  },
};
</script>
<style>
</style>