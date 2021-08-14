<template>
  <div class="section">
    <div class="layout d-flex flex-column">
      <h1 class="title">{{ title }}</h1>
      <p v-html="des" class="des font-weight-regular"></p>
      <div>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.section {
  padding: 60px 20px;
  text-align: center;
  color: #4d4d4d;
  line-height: 1.5rem;

  .layout {
    margin: 0 auto;
    max-width: 650px;

    h1 {
      font-size: 42px !important;
      line-height: 1.2em;
      margin-top: 1.6em;
      padding: 0;
    }
    p {
      padding: 24px 0;
      font-size: 20px !important;
    }
  }
}
</style>