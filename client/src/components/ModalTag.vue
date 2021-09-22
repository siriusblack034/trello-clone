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
      <h3 class="text-center">Nhãn</h3>
      <v-divider></v-divider>
      <div>
        <h3 class="font-weight-medium text-start">Nhãn</h3>
        <div class="font-weight-bold">
          <div
            v-for="(col, index) in color.tag"
            :key="index"
            class="color my-2 text-end"
            :style="{ backgroundColor: col }"
            @click="clickTag(col)"
          >
            <v-icon class="white--text" v-if="checkTag(col)">mdi-check</v-icon>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      
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
  },

  computed: {},
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
      let list = this.tag.map((val) => val.color) || [];
      return list.some((val) => val == col) ? true : false;
    },
    clickTag(col) {
      if (this.checkTag(col)) {
        let index = this.tag.findIndex((val) => val.color == col);
        if (index > -1) {
          this.tag.splice(index, 1);
        }
      } else {
        this.tag.push({
          name: "",
          color: col,
        });
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