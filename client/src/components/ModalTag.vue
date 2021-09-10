<template>
  <v-dialog
    hide-overlay
    v-model="dialog"
    min-height="600px"
    max-width="350px"
    scrollable
    style="color: #37474f !important"
  >
    <v-card class="pa-4">
      <h3>{{ check ? "Nhãn" : "Background Color" }}</h3>
      <v-divider></v-divider>
      <div>
        <h3 class="font-weight-medium text-start">
          {{ check ? "Nhãn" : "Background Color" }}
        </h3>
        <div class="font-weight-bold">
          <div
            v-for="(col, index) in getListColor"
            :key="index"
            class="color my-2 text-end"
            :style="{ backgroundColor: col }"
            @click="clickTag(col)"
          >
            <v-icon class="white--text" v-if="checkTag(col) && check"
              >mdi-check</v-icon
            >
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <!-- <div class="d-flex justify-end align-center pt-4 pb-2">
        <v-btn @click="saveTag()" color="primary" min-width="120px">Lưu</v-btn>
      </div> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { color } from "../assets/tagColor.js";
export default {
  props: {
    tag: {
      type: Array,
    },
    background: {
      type: String,
      default: "",
    },
  },
  beforeMount() {
    this.check = this.background == "" ? true : false;
    console.log(this.check);
  },
  computed: {
    getListColor() {
      return this.check ? this.color.tag : this.color.background;
    },
  },
  data() {
    return {
      dialog: false,
      color,
      check: false, // true == tag ? background
    };
  },

  methods: {
    showDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    checkTag(col) {
      let list = this.tag.map((val) => val.color);
      return list.some((val) => val == col) ? true : false;
    },
    clickTag(col) {
      if (this.checkTag(col)) {
        let index = this.tag.findIndex((val) => val.color == col);
        console.log(index);
        if (index > -1) {
          this.tag.splice(index, 1);
        }
      } else {
        this.tag.push({
          name: "",
          color: col,
        });
        console.log(this.tag);
      }
    },
  },
};
</script>

<style scoped>
.color {
  min-height: 32px;
  width: 90%;
  border-radius: 3px;
  padding: 6px 12px;
  cursor: pointer;
  transition: padding 85ms, margin 85ms, box-shadow 85ms;
}
</style>