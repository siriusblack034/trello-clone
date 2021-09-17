<template>
  <div class="board" @click="nextBoard()">
    <div class="board-item" :style="getBackground">
      <div class="board-item_details">
        <div class="board-item_title pa-2">
          <div>{{ item.name }}</div>
        </div>
        <div class="board-item_sub">
          <span class="board-tile-options" @click.stop="changeStar"
            ><v-icon
              :color="item.star ? 'yellow' : 'white'"
              size="20px"
              title="Đánh dấu sao bảng này và bảng sẽ được hiện ở đầu danh sách Bảng."
              class="board-tile-options-star-icon"
              >{{ !item.star ? "mdi-star-outline" : "mdi-star" }}</v-icon
            ></span
          >
        </div>
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
      console.log(this.item);
      this.$router.push({
        name: "Board",
        params: {
          boardId: this.item._id,
        },
      });
    },
    changeStar() {
      let star = !this.item.star;
      this.$emit("changeStar", star);
    },
  },
};
</script>

<style scoped>
.board-item_sub {
  align-items: baseline;
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-end;
}
.board-item_details {
  display: flex;
  flex-direction: column;
  height: 94%;
  justify-content: space-between;
  position: relative;
}
.board-tile-options {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: 4px;
  overflow: hidden;
  position: relative;
  right: -4px;
}
.board-tile-options-star-icon {
  bottom: 0;
  color: #fff;
  display: block;
  font-size: 14px;
  height: 20px;
  line-height: 18px;
  opacity: 0;
  right: 0;
  top: 0;
  -webkit-transform: translateZ(0);
  transition-duration: 0.15s;
  transition-property: color, background, opacity, transform, width, margin;
  width: 0;
}
.board-tile-options-star-icon:hover {
  transform: scale(1.2);
}
.board-item:hover .board-tile-options-star-icon:hover {
  opacity: 1;
}
.board-item:hover .board-tile-options-star-icon {
  margin-right: 12px;
  opacity: 0.75;
  width: 18px;
}
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