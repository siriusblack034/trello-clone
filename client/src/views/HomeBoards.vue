<template>
  <div class="home-page container">
    <section class="viewed-recently">
      <div class="d-flex algin-center mb-2">
        <v-icon class="pr-3 pb-1" color="black">mdi-star-outline</v-icon>
        <h3 class="">Gắn Sao</h3>
      </div>
      <div class="board-list">
        <BoardItem
          :item="item"
          v-for="(item, index) in listStar"
          :key="index"
        />
      </div>
    </section>
    <section class="viewed-recently">
      <div class="d-flex algin-center mb-2">
        <v-icon class="pr-3 pb-1" color="black">mdi-history</v-icon>
        <h2>Các không gian làm việc của bạn</h2>
      </div>
      <div class="board-list">
        <BoardItem
          :item="item"
          v-for="(item, index) in recently"
          :key="index"
          @changeStar="changeStar"
        />
        <div
          class="board d-flex flex-column algin-center justify-center"
          style="background-color: #bdc3cb"
          @click="newBoard()"
        >
          <h3 class="font-weight-medium text-center" style="cursor: pointer">
            Tạo Bảng mới
          </h3>
          <v-icon style="cursor: pointer">mdi-plus</v-icon>
        </div>
      </div>
    </section>
    <ModalBoard ref="ModalBoard" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BoardItem from "../components/BoardItem.vue";
import ModalBoard from "../components/ModalBoard.vue";
export default {
  components: {
    BoardItem,
    ModalBoard,
  },
  async mounted() {
    let loading = this.$loading.show();
    await this.getAllBoard();
    this.recently = this.listBoard;
    loading.hide();
  },
  computed: {
    ...mapState(["listBoard"]),
    listStar() {
      return this.recently.filter((board) => board.star);
    },
  },
  data() {
    return {
      recently: [],
    };
  },

  methods: {
    ...mapActions(["getAllBoard"]),
    newBoard() {
      this.$refs.ModalBoard.open();
    },
    changeStar(star) {
      console.log(star);
    },
  },
};
</script>

<style scoped>
.home-page {
  position: relative;
  top: 70px;
}
.board-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.board {
  margin: 0 2% 2% 0;
  padding: 0;
  transform: translate(0);
  width: 20%;
  cursor: pointer !important;
  height: 120px;
  background-color: aliceblue;
  border-radius: 5px;
}
.board > h2 {
  color: #172b4d;
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