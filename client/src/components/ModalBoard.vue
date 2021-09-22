<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-row style="height: 130px">
      <v-col
        cols="12"
        sm="12"
        md="8"
        lg="8"
        style="height: 100%; position: relative"
        class="img-fuild d-flex py-2 align-center"
        :style="getBackground"
      >
        <v-text-field
          name="name"
          placeholder="Nhập tên bảng"
          v-model="nameBoard"
          dense
          class="ml-2"
          hide-details
          id="id"
          dark
        ></v-text-field>
        <v-icon
          @click="dialog = false"
          style="position: absolute; top: 15px; right: 5px"
          class="white--text ml-6 pb-3"
          >mdi-close</v-icon
        >
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        class="d-flex flex-wrap justify-space-between"
        style="wrap"
      >
        <div
          class="ml-2 my-1 box img-fuild"
          v-for="(val, index) in backgrounds"
          :key="index"
          :style="{
            backgroundColor: val.type == 'color' ? val.color : '',
            backgroundImage:
              val.type == 'image' ? 'url(' + val.color + ')' : '',
          }"
          @click="chooseBackground(val)"
        >
          <v-icon
            v-if="val.color == color || val.color == image"
            class="white--text"
            style="width: 100%; height: 100%"
            >mdi-check</v-icon
          >
        </div>
        <div class="ml-2 my-1 box" style="background-color: white">
          <v-icon style="width: 100%; height: 100%">mdi-dots-horizontal</v-icon>
        </div>
      </v-col>
    </v-row>
    <div class="py-5 pl-2">
      <v-btn
        class="font-weight-medium"
        style="text-transform: none"
        color="primary"
        width="20%"
        @click="newBoard()"
        :disabled="nameBoard == ''"
        >Tạo bảng</v-btn
      >
    </div>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";
/* import ChooseBackground from "../components/ChooseBackground.vue"; */
/* import services from "../services"; */
import boardService from "../services/modules/board";
export default {
  components: {
    /* ChooseBackground */
  },
  computed: {
    getBackground() {
      if (this.color) {
        return `background-color: ${this.color}`;
      } else {
        return `background-image:url(${this.image})`;
      }
    },
  },
  data() {
    return {
      dialog: false,
      nameBoard: "",
      color: "#0079bf",
      image: "",
      backgrounds: [
        {
          type: "color",
          color: "#0079bf",
        },
        {
          type: "color",
          color: "#b04632",
        },
        {
          type: "color",
          color: "#42526e",
        },
        {
          type: "color",
          color: "#eb5a46",
        },
        {
          type: "image",
          color:
            "https://images.unsplash.com/photo-1630519454452-cb8be44ad5f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjMwNTkxMzAx&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
          type: "image",
          color:
            "https://images.unsplash.com/photo-1630495325532-815f8d91a31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjMwNTkxMzAx&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
          type: "image",
          color:
            "https://images.unsplash.com/photo-1630182044473-34dd20c6dd8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjMwNTkxMzAx&ixlib=rb-1.2.1&q=80&w=400",
        },
        {
          type: "image",
          color:
            "https://images.unsplash.com/photo-1630355267690-c3541cbc7fd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjMwNTkxMzAx&ixlib=rb-1.2.1&q=80&w=400",
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["addNewBoard"]),
    open() {
      this.dialog = true;
    },
    chooseBackground(background) {
      if (background.type == "color") {
        this.color = background.color;
        this.image = "";
      } else {
        this.color = "";
        this.image = background.color;
      }
    },
    newBoard() {
      let board = {
        name: this.nameBoard,
        background: {
          color: this.color,
          image: this.image,
        },
      };
      boardService.newBoard(board).then((result) => {
        if (result.status == 200) {
          this.addNewBoard(board);
          this.$router.push({
            name: "Board",
            params: {
              boardId: result.data.boardId,
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.v-dialog {
  overflow-y: hidden !important;
  min-height: 116px !important;
}
.img-fuild {
  background-position: center center;
  background-size: cover;
}
.box {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
</style>