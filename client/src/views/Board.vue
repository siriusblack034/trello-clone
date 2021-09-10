<template>
  <div class="main" :style="getBackground" v-if="board">
    <div class="board-main d-flex flex-column">
      <div class="board-header d-flex justify-space-between align-center">
        <div class="d-flex justify-start align-center">
          <v-btn
            style="text-transform: none"
            height="40px"
            class="button-color mx-2 my-1"
          >
            Bảng
            <v-icon> mdi-chevron-down </v-icon>
          </v-btn>

          <v-text-field
            name="name"
            id="id"
            dark
            class="button-color"
            dense
            hide-details
            color="white"
            outlined
            v-model="board.nameBoard"
          ></v-text-field>
          <v-btn
            style="text-transform: none"
            height="40px"
            class="button-color mx-2 my-1"
          >
            <v-icon color="yellow" class="font-weight-medium">
              mdi-star-outline
            </v-icon>
          </v-btn>

          <v-btn
            style="text-transform: none"
            height="40px"
            class="button-color mx-1 my-1"
          >
            Riêng tư
            <v-icon class="pl-2 pr-0" style="font-size: 20px">
              mdi-lock
            </v-icon>
          </v-btn>
        </div>
        <div class="d-flex justify-end align-center">
          <v-btn
            style="text-transform: none"
            height="40px"
            class="button-color mx-2 my-1"
          >
            <v-icon class="pr-1"> mdi-dots-horizontal</v-icon>
            Hiện menu
          </v-btn>
        </div>
      </div>

      <div
        class="board-canvas"
        ref="scroll_container"
        @mousewheel.prevent="scrollX"
      >
        <Draggable id="board" :list="board.listTask">
          <v-card
            v-for="(task, idxBoard) in board.listTask"
            :key="task.id"
            class="mx-4 pa-2 list-wrapper"
            :style="{ backgroundColor: '#ebecf0' }"
          >
            <div class="d-flex justify-space-between align-center list">
              <div class="my-text-style">
                <v-text-field
                  v-model="task.title"
                  outlined
                  dense
                  hide-details
                  color="primary"
                  dark
                >
                </v-text-field>
              </div>
              <div class="list-delete" @click="removeListTask(idxBoard)">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-hover v-slot="{ hover }" class="ml-2">
                      <template>
                        <v-icon v-bind="attrs" v-on="on"
                          >mdi-{{ hover ? "delete-empty" : "delete" }}</v-icon
                        >
                      </template>
                    </v-hover>
                  </template>
                  <span>Xóa mục này</span>
                </v-tooltip>
              </div>

              <!-- delete list -->
            </div>
            <Draggable
              :list="task.itemTask"
              :group="{ name: 'task' }"
              v-bind="dragOptions"
            >
              <v-card
                v-for="(val, idxTask) in task.itemTask"
                :key="val.id"
                class="d-flex flex-column my-2 list"
              >
                <div class="d-flex justify-space-around align-center task">
                  <div class="my-text-style d-flex flex-column">
                    <div
                      v-if="val.image"
                      style="height: 32px; border-radius: 3px 3px 0 0"
                      :style="{ backgroundColor: val.image }"
                    ></div>
                    <div class="d-flex">
                      <v-chip
                        class="my-1 font-weight-bold d-flex"
                        style="
                          cursor: pointer;
                          min-width: 56px;
                          font-size: 10px;
                        "
                        :style="{ height: tagName ? '15px' : '10px' }"
                        v-for="(chip, idxTag) in val.tag"
                        :key="idxTag"
                        :color="chip.color"
                        :close="tagName"
                        text-color="white"
                        @click:close="closeTag(idxTag, idxTask, idxBoard)"
                        @click="tagName = !tagName"
                      >
                        {{ tagName ? chip.nameTask : "" }}
                      </v-chip>
                    </div>
                    <v-textarea
                      v-model="val.title"
                      outlined
                      dense
                      hide-details
                      color="black"
                      dark
                      rows="1"
                      auto-grow
                    >
                    </v-textarea>
                    <div v-if="val.description || val.task">
                      <v-divider></v-divider>
                      <div
                        class="d-flex align-center justify-start py-2 pl-2"
                        style="font-size: 12px"
                      >
                        <v-tooltip bottom v-if="val.description">
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon small v-bind="attrs" v-on="on"
                              >mdi-playlist-star</v-icon
                            >
                          </template>
                          <span>Thẻ có miêu tả</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="val.task">
                          <template v-slot:activator="{ on, attrs }">
                            <div
                              class="d-flex align-center justify-center pl-2"
                            >
                              <v-icon
                                :color="
                                  checkTaskComplete(val.task)
                                    ? 'primary'
                                    : 'none'
                                "
                                small
                                v-bind="attrs"
                                v-on="on"
                                >mdi-checkbox-marked-outline</v-icon
                              >
                              <span
                                :class="
                                  checkTaskComplete(val.task)
                                    ? 'primary--text'
                                    : ''
                                "
                                >{{ checkList(val.task) }}</span
                              >
                            </div>
                          </template>
                          <span>Mục trong danh sách công việc</span>
                        </v-tooltip>
                      </div>
                    </div>
                  </div>

                  <a class="edit-task" @click="showModal(val)">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </a>
                </div>
              </v-card>
            </Draggable>
            <!-- <div ></div> -->
            <!-- add Task -->
            <v-hover
              v-slot="{ hover }"
              class="d-flex align-center justify-start"
            >
              <div
                class="py-2 pl-2"
                style="cursor: pointer"
                :style="{ backgroundColor: hover ? 'rgba(0,0,0,0.3)' : '' }"
                @click="addTask = true"
              >
                <a
                  class="black--text"
                  style="text-transform: none; !important;"
                >
                  <v-icon class="pb-1">mdi-plus</v-icon>
                  Thêm thẻ
                </a>
              </div>
            </v-hover>
          </v-card>
          <v-card class="list-wrapper">
            <div v-if="addBoard" class="d-flex flex-column align-start list">
              <div class="my-text-style">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  v-model="newBoard"
                  color="primary"
                  placeholder="Nhập tiêu đề danh sách ... "
                  class="font-weight-bold"
                >
                </v-text-field>
              </div>
              <div class="my-2 pl-2">
                <v-btn small color="grey" @click="addNewBoard()"
                  >Thêm danh sách</v-btn
                >
                <v-icon class="ml-2" @click="addBoard = false"
                  >mdi-close</v-icon
                >
              </div>
            </div>
            <v-btn
              v-else
              style="text-transform: none; !important; width:100%"
              @click="addBoard = true"
            >
              <v-icon>mdi-plus</v-icon>
              Thêm danh sách khác
            </v-btn>
          </v-card>
        </Draggable>
      </div>
    </div>
    <ModalTask ref="ModalTask" :task="task" />
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import { mapActions } from "vuex";
import ModalTask from "../components/ModalTask.vue";
import { uuid } from "../utils";
export default {
  components: {
    Draggable,
    ModalTask,
  },
  async created() {
    const loading = this.$loading.show();
    let id = this.$route.params.boardId;
    await this.getBoard(id);
    loading.hide();
    this.board = this.$store.state.board;
  },

  computed: {
    getBackground() {
      if (this.board.background.color) {
        return `background-color: ${this.board.background.color}`;
      } else {
        return `background-image:url(${this.board.background.image})`;
      }
    },
    dragOptions() {
      return {
        board: "",
        animation: 1,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },

  data() {
    return {
      board: "",
      tagName: false,
      addBoard: false,
      task: {},
      newBoard: "",
    };
  },
  methods: {
    ...mapActions(["getBoard", "addNewTask"]),
    log(evt) {
      window.console.log(evt);
    },
    scrollX(e) {
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      document.getElementById("board").scrollLeft -= delta * 50;
    },
    closeTag(tag, task, board) {
      this.board.listTask[board].itemTask[task].tag.splice(tag, 1);
    },
    addNewBoard() {
      if (this.newBoard) {
        let idTask = uuid();
        this.addNewTask({
          idBoard: this.$route.params.boardId,
          idTask,
          title: this.newBoard,
        });
        this.newBoard = "";
        this.addBoard = false;
      }
    },
    showModal(task) {
      this.$refs.ModalTask.showDialog();
      this.task = task;
    },
    checkList(task) {
      if (task) {
        let taskUnComplete = task.filter((val) => val.status == true);
        return `${taskUnComplete.length}/ ${task.length}`;
      }
    },
    checkTaskComplete(task) {
      if (task) {
        let taskUnComplete = task.filter((val) => val.status == true);
        return taskUnComplete.length == task.length ? true : false;
      }
    },
    removeListTask(index) {
      this.board.listTask.splice(index, 1);
    },
  },
};
</script>

<style  scoped>
.chip-line-height {
  height: 10px !important;
}
.my-text-style >>> .v-text-field__slot input {
  color: rgba(0, 0, 0, 0.7);
}
.my-text-style {
  width: 100%;
}
.my-text-style >>> .v-text-field__slot textarea {
  color: rgba(0, 0, 0, 1);
}
.list div a {
  display: none;
}
.list div:hover a {
  display: block;
}
</style>
<style>
.main {
  min-height: 100vh;
  background-position: 50%;
  background-size: cover;
  position: relative;
  top: 70px;
}
.board-main {
  min-height: 100vh;
  position: relative;
  transition: margin 0.1s ease-in;
  margin-right: 0;
}
.board-header {
  background-color: rgba(0, 0, 0, 0.24);
  height: auto;
  padding: 6px 4px 4px 8px;
  position: relative;
}
.board-canvas {
  background-color: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.24) 0,
    rgba(0, 0, 0, 0.24) 48px,
    transparent 80px,
    transparent
  );
  position: relative;
  flex-grow: 1;
}
.button-color {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
}
#board {
  user-select: none;
  white-space: nowrap;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  position: absolute;
  margin-left: 8px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.list-wrapper {
  width: 250px;
  margin: 0 4px;
  height: auto;
  box-sizing: border-box;
  display: inline-block !important;
  vertical-align: top;
  white-space: nowrap !important;
}
.list {
  background-color: #ebecf0;
  border-radius: 3px;
  position: relative;
  white-space: normal;
}
.list-delete {
  display: none;
  cursor: pointer;
}
.list:hover .list-delete {
  display: block;
}
.list-group-item {
  background-color: antiquewhite;
}
.task {
  position: relative;
}
.edit-task {
  position: absolute;
  top: 2px;
  right: 3px;
  z-index: 1;
  border-radius: 5px;
  padding: 3px;
  background-color: rgba(255, 255, 255, 0.3);
}
.edit-task:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
::-webkit-scrollbar {
  width: 15px;
  height: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #776f68;
  border-radius: 5px;
}

/* Handle on hover */
/* Draggable css */
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 1s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  display: none;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: pointer;
}
.list-group-item i {
  cursor: pointer;
}
</style>