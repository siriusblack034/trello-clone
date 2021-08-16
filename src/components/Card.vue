<template>
  <div class="d-flex flex-column justify-center align-start">
    <h4>{{ feature.name }}</h4>
    <h1 class="header">
      {{ feature.title }}
    </h1>
    <p class="description text-left" style="color: gray">
      {{ feature.description }}
    </p>

    <div class="d-flex flex-column justify-center align-start">
      <h3 class="py-3">
        <a class="black--text" @click="extra1 = !extra1">
          {{ extra1 ? "-" : "+" }} Tìm hiểu thêm
        </a>
      </h3>
      <div
        class="description text-left"
        :style="{ display: extra1 ? 'block' : 'none' }"
      >
        <p>
          {{ feature.expand.description }}
        </p>
        <slot name="example"></slot>
        <ul>
          <li v-for="(val, index) in feature.expand.li" :key="index">
            {{ val }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      extra: false,
      extra1: false,
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
<style >
.header {
  font-size: 32px;
  color: #091e42;
}
.description {
  font-size: 21px;
  line-height: 32px;
  color: #091e42;
}
</style>