<template>
  <div>
    <button class="css-button-sliding-to-left--black" @click="callback($event)">
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  methods: {
    callback(event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style>
.css-button-sliding-to-left--black {
  min-width: 130px;
  height: 40px;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
  color: white;
  font-weight: 300;
}
.css-button-sliding-to-left--black:hover {
  color: #fff;
  opacity: 1;
}
.css-button-sliding-to-left--black:hover:after {
  width: 100%;
}
.css-button-sliding-to-left--black:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #212529;
}
</style>