<template>
  <div class="main" :style="getBackground" v-if="board">
    <div class="board-main d-flex flex-column">
      <div class="board-header d-flex justify-space-between align-center">
        <div
          class="d-flex justify-start align-center"
          style="position: relative"
        >
          <Button
            :title="'Quay trở lại'"
            @click="$router.push({ name: 'HomeBoards' })"
          />
          <v-btn
            style="text-transform: none"
            height="40px"
            class="button-color mx-2 my-1"
            title="Chọn bảng hiển thị"
            @click="showList"
          >
            Bảng
            <v-icon> mdi-chevron-down </v-icon>
          </v-btn>
          <v-card
            v-if="showListBoard"
            v-click-outside="hideList"
            class="pa-3 list-board"
            width="300"
          >
            <div class="d-flex align-center justify-center my-2">
              <p class="text-center ma-0" style="width: 90%">Tất cả các bảng</p>
              <v-icon @click="hideList" style="cursor: pointer"
                >mdi-close</v-icon
              >
            </div>
            <v-divider color="black"></v-divider>
            <div>
              <div
                class="ma-2"
                v-for="(board, index) in listBoard"
                :key="index"
              >
                <BoardItem :item="board" :disableStar="true" />
              </div>
            </div>
          </v-card>
          <v-text-field
            name="name"
            id="id"
            dark
            class="button-color"
            dense
            hide-details
            color="white"
            outlined
            :value="board.name"
            @change="changeNameBoard"
          ></v-text-field>
          <v-btn
            style="text-transform: none"
            height="40px"
            class="button-color mx-2 my-1"
            title="Đánh dấu bảng này"
            @click="changeStar"
          >
            <v-icon
              :color="board.star == true ? 'yellow' : ''"
              class="font-weight-medium"
            >
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
            @click="loggout"
          >
            Đăng xuất
          </v-btn>
        </div>
      </div>

      <div
        class="board-canvas"
        ref="scroll_container"
        @mousewheel.prevent="scrollX"
      >
        <Draggable
          id="board"
          :list="board.decks"
          handle=".list-wrapper"
          @change="moveDeck"
        >
          <v-card
            v-for="(deck, indexDeck) in board.decks"
            :key="deck._id"
            class="mx-4 pa-2 list-wrapper"
            :style="{ backgroundColor: '#ebecf0' }"
          >
            <div class="d-flex justify-space-between align-center list">
              <div class="my-text-style">
                <v-text-field
                  v-model="deck.title"
                  @change="changeNameDeck(deck.title, deck._id, indexDeck)"
                  outlined
                  dense
                  hide-details
                  color="primary"
                  dark
                >
                </v-text-field>
              </div>
              <div class="list-delete" @click="removeDeck(indexDeck, deck._id)">
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
              :list="deck.tasks"
              :group="{ name: 'task' }"
              v-bind="dragOptions"
              handle=".list"
              @change="moveTask(deck._id, $event)"
            >
              <v-card
                v-for="(val, idxTask) in deck.tasks"
                :key="val.id"
                class="d-flex flex-column my-2 list"
              >
                <div class="d-flex justify-space-around align-center task">
                  <div class="my-text-style d-flex flex-column">
                    <div
                      v-if="val.background"
                      style="height: 32px; border-radius: 3px 3px 0 0"
                      :style="{ background: val.background }"
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
                        v-for="(chip, idxTag) in val.tags"
                        :key="idxTag"
                        :color="chip.color"
                        :close="tagName"
                        text-color="white"
                        @click:close="
                          closeTag(idxTag, idxTask, indexDeck, val._id)
                        "
                        @click="tagName = !tagName"
                      >
                        {{ tagName ? chip.nameTask : "" }}
                      </v-chip>
                    </div>
                    <v-textarea
                      v-model="val.title"
                      outlined
                      @change="
                        changeNameTask(val.title, val._id, idxTask, indexDeck)
                      "
                      dense
                      hide-details
                      color="black"
                      dark
                      rows="1"
                      auto-grow
                    >
                    </v-textarea>

                    <div v-if="checkSub(val)">
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
                        <v-tooltip bottom v-if="val.toDo.length != 0">
                          <template v-slot:activator="{ on, attrs }">
                            <div
                              class="d-flex align-center justify-center pl-2"
                            >
                              <v-icon
                                :color="
                                  checkTaskComplete(val.toDo)
                                    ? 'primary'
                                    : 'none'
                                "
                                small
                                class="mr-1"
                                v-bind="attrs"
                                v-on="on"
                                >mdi-checkbox-marked-outline</v-icon
                              >
                              <span
                                :class="
                                  checkTaskComplete(val.toDo)
                                    ? 'primary--text'
                                    : ''
                                "
                                >{{ checkList(val.toDo) }}</span
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
            <div
              v-if="indexDeck === indexTask"
              class="d-flex flex-column align-start"
            >
              <div class="my-text-style">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  v-model="newTask"
                  color="primary"
                  placeholder="Nhập tiêu đề danh sách ... "
                  class="font-weight-bold"
                  @keypress.enter="addNewTask(deck._id, indexDeck)"
                >
                </v-text-field>
              </div>
              <div class="my-2 pl-2">
                <v-btn
                  small
                  color="grey"
                  @click="addNewTask(deck._id, indexDeck)"
                  >Thêm danh sách</v-btn
                >
                <v-icon class="ml-2" @click="openAddTask(10000)"
                  >mdi-close</v-icon
                >
              </div>
            </div>
            <!-- add Task -->
            <v-hover
              v-if="indexDeck !== indexTask"
              v-slot="{ hover }"
              class="d-flex align-center justify-start"
            >
              <div
                class="py-2 pl-2"
                style="cursor: pointer"
                :style="{ backgroundColor: hover ? 'rgba(0,0,0,0.3)' : '' }"
                @click="openAddTask(indexDeck)"
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
          <v-card class="list-wrapper1" :style="{ opacity: addDeck ? 1 : 0.5 }">
            <div v-if="addDeck" class="d-flex flex-column align-start list">
              <div class="my-text-style">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  v-model="newDeck"
                  color="primary"
                  placeholder="Nhập tiêu đề danh sách ... "
                  class="font-weight-bold"
                >
                </v-text-field>
              </div>
              <div class="my-2 pl-2">
                <v-btn small color="grey" @click="add()">Thêm danh sách</v-btn>
                <v-icon class="ml-2" @click="addDeck = false">mdi-close</v-icon>
              </div>
            </div>
            <v-btn
              v-else
              style="text-transform: none; !important; width:100%;"
              @click="addDeck = true"
              width="100%"
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
import { mapActions, mapState } from "vuex";
import ModalTask from "../components/ModalTask.vue";
import Button from "../components/Button.vue";
import BoardItem from "../components/BoardItem.vue";
import service from "../services";
export default {
  components: {
    Draggable,
    ModalTask,
    Button,
    BoardItem,
  },
  async created() {
    await this.setData();
  },

  computed: {
    ...mapState(["listBoard"]),
    getBackground() {
      if (this.board.background.color) {
        return `background-color: ${this.board.background.color}`;
      } else {
        return `background-image:url(${this.board.background.image})`;
      }
    },
    dragOptions() {
      return {
        animation: 1,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },

  data() {
    return {
      board: {},
      tagName: false,
      addDeck: false,
      task: {},
      newDeck: "",
      newTask: "",
      indexTask: "",
      showListBoard: false,
    };
  },
  methods: {
    ...mapActions(["getBoard", "addNewDeck", "userLoggout"]),
    async setData() {
      const loading = this.$loading.show();
      let id = this.$route.params.boardId;
      await this.getBoard(id);
      this.board = this.$store.state.board;
      document.title = `${this.board.name} | Trà Lô`;
      loading.hide();
    },
    log(evt) {
      window.console.log(evt);
    },
    showList() {
      this.showListBoard = true;
    },
    hideList() {
      this.showListBoard = false;
    },
    scrollX(e) {
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      document.getElementById("board").scrollLeft -= delta * 50;
    },
    async closeTag(tag, task, deck, idTask) {
      this.board.decks[deck].tasks[task].tags.splice(tag, 1);
      const tags = this.board.decks[deck].tasks[task].tags;
      await service.taskService.updateTask({ tags }, idTask);
    },
    async add() {
      if (this.newDeck) {
        let location = this.board.decks.length;
        await service.deckService
          .newDeck({
            title: this.newDeck,
            boardId: this.$route.params.boardId,
            location,
          })
          .then((result) => {
            if (result.status == 200) {
              this.board.decks.push(result.data.deck);
              this.newDeck = "";
              this.addDeck = false;
            }
          });
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
    removeDeck(index, id) {
      service.deckService.deleteDeck(id, this.board.decks).then((result) => {
        if (result.status == 200) {
          this.board.decks.splice(index, 1);
          this.addTask.splice(false, 1);
        }
      });
    },
    async moveDeck(event) {
      let newIndex = event.moved.newIndex;
      let oldIndex = event.moved.oldIndex;
      await service.deckService.dragDeck({
        decks: this.board.decks,
        newIndex,
        oldIndex,
      });
    },
    changeNameBoard(title) {
      service.boardService
        .updateBoard({ name: title }, this.$route.params.boardId)
        .then((result) => {
          if (result.status == 200) {
            this.board.name = title;
            document.title = title + " | Trà Lô";
          }
        });
    },
    changeNameDeck(title, idDeck, index) {
      service.deckService.updateDeck({ title }, idDeck).then((result) => {
        if (result.status == 200) {
          this.board.decks[index].title = title;
        }
      });
    },
    changeNameTask(title, idTask) {
      service.taskService.updateTask({ title }, idTask);
    },
    openAddTask(index) {
      this.indexTask = index;
    },

    async moveTask(deckId, event) {
      const deck = this.board.decks.filter((deck) => deck._id === deckId);
      if (event.added) {
        const task = event.added.element;
        //update deckId for task
        await service.taskService.updateTask({ deck: deckId }, task._id);
        // update location for task in deck arrival
        await service.taskService.dragTask({
          tasks: deck[0].tasks,
        });
      }
      // update location for task in deck move
      if (event.removed) {
        await service.taskService.dragTask({
          tasks: deck[0].tasks,
        });
      }
      if (event.moved) {
        await service.taskService.dragTask({
          tasks: deck[0].tasks,
        });
      }
    },
    async addNewTask(deckId, index) {
      if (this.newTask) {
        let listTask = this.board.decks[index].tasks;
        let length = listTask.length;

        let task = {
          title: this.newTask,
          deckId,
          location: length,
        };
        await service.taskService.newTask(task).then((result) => {
          if (result.status == 200) {
            this.board.decks[index].tasks.push(result.data.task);
            this.newTask = "";
          }
        });
      }
    },
    checkSub(task) {
      let toggle = false;
      if (task.description) {
        toggle = true;
      }
      if (task.toDo) {
        if (task.toDo.length > 0) {
          toggle = true;
        }
      }
      return toggle;
    },
    changeStar() {
      service.boardService
        .updateBoard({ star: !this.board.star }, this.board._id)
        .then((result) => {
          if (result.status == 200) {
            this.board.star = !this.board.star;
          }
        });
    },
    loggout() {
      this.userLoggout();
      this.$router.push({ path: "/logged-out" });
    },
  },
  watch: {
    async $route() {
      await this.setData()
    },
  },
};
</script>

<style  scoped>
.list-board {
  position: absolute;
  top: 48px;
  z-index: 1000;
  left: 135px;
  background-color: rgba(255, 255, 255, 0.7);
  color: #172b4d;
}
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
  height: 100%;
  background-position: 50%;
  background-size: cover;
  position: relative;
}
.board-main {
  min-height: 100vh;
  position: relative;
  transition: margin 0.1s ease-in;
  margin-right: 0;
  overflow-y: hidden;
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
.list-wrapper1 {
  width: 250px;
  margin: 0 4px;
  height: auto;
  box-sizing: border-box;
  display: inline-block !important;
  vertical-align: top;
  white-space: nowrap !important;
}
.list-wrapper {
  width: 250px;
  margin: 0 4px;
  height: auto;
  box-sizing: border-box;
  display: inline-block !important;
  vertical-align: top;
  white-space: nowrap !important;
  max-height: 100%;
  overflow-y: auto;
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
  width: 12px;
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