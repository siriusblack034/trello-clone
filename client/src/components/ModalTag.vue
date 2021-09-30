<template>
  <v-dialog
    hide-overlay
    v-model="dialog"
    min-height="600px"
    max-width="350px"
    scrollable
    style="color: #37474f !important"
  >
    <v-card class="pa-4" v-if="check">
      <h3 class="text-center">{{ type == "tag" ? "Nhãn" : "Background" }}</h3>
      <v-divider></v-divider>
      <div>
        <h3 class="font-weight-medium text-start">
          {{ type == "tag" ? "Nhãn" : "Background" }}
        </h3>
        <div class="font-weight-bold">
          <div
            v-for="(col, index) in list"
            :key="index"
            class="color my-2 text-end"
            :style="{ background: col }"
            @click="clickTag(col)"
          >
            <v-icon class="white--text" v-if="checkTick(col)">mdi-check</v-icon>
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
    type: {
      type: String,
    },
    backgrounds: {
      type: String,
    },
  },
  mounted() {
    this.setList();
  },
  data() {
    return {
      dialog: false,
      list: "",
      check: false,
    };
  },

  methods: {
    setList() {
      this.list = this.type == "tag" ? color.tag : color.background;
      this.check = true;
    },
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
    checkBackground(val) {
      return val == this.backgrounds ? true : false;
    },
    clickTag(col) {
      if (this.type == "tag") {
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
      } else {
        let background = this.checkBackground(col) ? "white" : col;
        this.$emit("chooseBackground", background);
      }
    },
    checkTick(col) {
      if (this.type == "tag") {
        return this.checkTag(col);
      } else {
        return this.checkBackground(col);
      }
    },
  },
  watch: {
    type() {
      this.check = false;
      this.setList();
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