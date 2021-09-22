<template>
  <v-dialog
    v-model="isOpen"
    min-height="600px"
    max-width="700px"
    @click:outside="saveTask"
  >
    <v-card style="color: #37474f !important">
      <v-hover v-slot="{ hover }">
        <template>
          <div
            style="height: 120px; transition: all 150ms ease-in 150ms"
            :style="{
              backgroundColor: setBackground,
              opacity: hover ? '0.7' : '1',
            }"
            class="d-flex align-center justify-center"
          >
            <v-btn outlined color="white" v-if="hover"
              ><v-icon>mdi-folder-multiple-image</v-icon></v-btn
            >
          </div>
        </template>
      </v-hover>
      <div style="background-color: #f4f5f7" class="px-6 py-4">
        <div class="d-flex align-center justify-start my-2">
          <h3 class="font-weight-medium">
            <v-icon color="#37474F" class="mr-2">mdi-subtitles</v-icon>
          </h3>
          <div class="my-text-style">
            <v-text-field
              outlined
              dense
              hide-details
              v-model="task.title"
              class="font-weight-bold"
              dark
              color="primary"
            ></v-text-field>
          </div>
        </div>
        <v-row>
          <v-col cols="10" sm="10" md="10" lg="10" offset="1">
            <div class="d-flex flex-column align-start mb-2 ml-9">
              <h3 class="font-weight-medium">NHÃN</h3>
              <div class="d-flex">
                <div
                  class="box mr-1"
                  v-for="(tag, index) in task.tags"
                  :key="index"
                  :style="{ backgroundColor: tag.color }"
                ></div>
                <div
                  class="box mr-1 d-flex justify-center align-center"
                  style="background-color: rgba(0, 0, 0, 0.2); cursor: pointer"
                  @click="showModal()"
                >
                  <v-icon>mdi-plus</v-icon>
                </div>
              </div>
            </div>
            <div class="my-4">
              <h3 class="font-weight-medium d-flex justify-start align-center">
                <v-icon color="#37474F" class="mr-2"
                  >mdi-format-list-bulleted</v-icon
                >
                Mô tả
              </h3>
              <div class="my-text-style my-2">
                <v-textarea
                  v-model="task.description"
                  outlined
                  dense
                  placeholder="Thêm mô tả"
                  hide-details
                  color="primary"
                  rows="4"
                >
                </v-textarea>
              </div>
            </div>
            <div class="my-4">
              <h3
                class="
                  font-weight-medium
                  d-flex
                  justify-start
                  align-center
                  my-2
                "
              >
                <v-icon color="#37474F" class="mr-2">mdi-calendar-check</v-icon>
                Việc cần làm
              </h3>
              <div class="d-flex align-center my-1" v-if="setProcess != -1">
                <span style="font-size: 14px" class="pr-2"
                  >{{ setProcess || 0 }}%</span
                >
                <v-progress-linear
                  background-color="#263238"
                  background-opacity="0.2"
                  height="10px"
                  style="border-radius: 5px"
                  color="success"
                  :value="setProcess"
                >
                </v-progress-linear>
              </div>
              <div>
                <div
                  v-for="(val, index) in task.toDo"
                  :key="index"
                  class="d-flex justify-start align-center"
                >
                  <v-checkbox small v-model="val.status"></v-checkbox>
                  <div class="my-text-style ml-2 d-flex" style="width: 100%">
                    <v-textarea
                      width="100%"
                      v-model="val.name"
                      outlined
                      dense
                      placeholder="Thêm hoạt động"
                      hide-details
                      color="primary"
                      rows="2"
                      auto-grow
                      dark
                      :style="{
                        textDecoration: val.status ? 'line-through' : 'none',
                      }"
                      style="text-decoration-color: black !important"
                    >
                    </v-textarea>
                    <v-hover v-slot="{ hover }" class="ml-2">
                      <template>
                        <v-icon
                          style="cursor: pointer"
                          @click="removeTask(index)"
                          >mdi-{{ hover ? "delete-empty" : "delete" }}</v-icon
                        >
                      </template>
                    </v-hover>
                  </div>
                </div>
                <div>
                  <div v-if="checkAddTask" class="ml-2" style="width: 100%">
                    <v-textarea
                      width="100%"
                      outlined
                      dense
                      v-model="taskValue"
                      placeholder="Thêm hoạt động"
                      hide-details
                      color="primary"
                      rows="2"
                      auto-grow
                      style="text-decoration-color: black !important"
                    >
                    </v-textarea>
                    <div class="d-flex py-2 pl-2">
                      <v-btn class="primary mr-2" @click="addTask()"
                        >Thêm</v-btn
                      >
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                            style="cursor: pointer"
                            @click="checkAddTask = false"
                            >mdi-close</v-icon
                          >
                        </template>
                        <span>Hủy</span>
                      </v-tooltip>
                    </div>
                  </div>
                  <v-btn
                    v-else
                    color="grey"
                    style="text-style ; text-transform: none;"
                    @click="checkAddTask = true"
                  >
                    <v-icon>mdi-plus</v-icon>
                    Thêm một mục</v-btn
                  >
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <!-- <v-divider class="black--text"></v-divider>
      <div class="d-flex justify-space-around align-center py-4">
        <div>
          <v-btn @click="isOpen = false" color="red " large min-width="120px"
            >Hủy</v-btn
          >
        </div>
        <v-btn @click="changeTask()" color="success" min-width="120px" large
          >Lưu</v-btn
        >
      </div> -->
    </v-card>

    <ModalTag :tag="task.tags" ref="modalTag" />
  </v-dialog>
</template>

<script>
import ModalTag from "./ModalTag.vue";
import service from "../services";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  components: {
    ModalTag,
  },
  computed: {
    setBackground() {
      return this.task.image != "" ? this.task.image : "rgba(0,0,0,0.3)";
    },
    setProcess() {
      if (this.task.toDo) {
        if (this.task.toDo.length) {
          let taskComplete = this.task.toDo.filter((val) => val.status == true);
          let percent = (taskComplete.length / this.task.toDo.length).toFixed(
            2
          );
          return percent * 100;
        }
      }
      return -1;
    },
  },
  data() {
    return {
      isOpen: false,
      taskValue: "",
      checkAddTask: false,
    };
  },
  methods: {
    showDialog() {
      this.isOpen = true;
    },
    closeDialog() {
      this.isOpen = false;
    },
    showModal() {
      this.$refs.modalTag.showDialog();
    },
    removeTask(index) {
      this.task.toDo.splice(index, 1);
    },
    addTask() {
      if (this.taskValue) {
        this.task.toDo.push({
          name: this.taskValue,
          status: false,
        });
        this.taskValue = "";
      }
    },
    saveTask() {
      service.taskService.updateTask(this.task, this.task._id);
    },
  },
};
</script>
<style scoped>
.my-text-style >>> .v-text-field__slot input {
  color: rgba(0, 0, 0, 0.7);
}
.my-text-style >>> .v-text-field__slot textarea {
  color: rgba(0, 0, 0, 0.7);
}
</style>
<style>
.box {
  width: 40px;
  height: 32px;
  border-radius: 5px;
}
</style>