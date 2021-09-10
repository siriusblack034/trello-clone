<template>
  <div class="board" @click="nextBoard()">
    <div class="board-item" :style="getBackground">
      <div class="board-item_title pa-2">
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getBackground() {
      if (this.item.background.color) {
        return `background-color: ${this.item.background.color}`;
      } else {
        return `background-image:url(${this.item.background.image})`;
      }
    },
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    nextBoard() {
      
      this.$router.push({
        name: "Board",
        params: {
          boardId: this.item.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.board-item {
  height: 100%;
  background-color: #97a0af;
  background-position: 50%;
  background-size: cover;
  color: #fff;
  line-height: 20px;
  padding: 8px;
  position: relative;
  text-decoration: none;
  border-radius: 4px;
}
.board-item_title {
  word-wrap: break-word;
  display: inline-block;
  flex: 0 0 auto;
  font-size: 16px;
  overflow: hidden;
  width: 100%;
  max-height: 50px;
  font-weight: 700;
}
.board-item_title > div {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}
</style>