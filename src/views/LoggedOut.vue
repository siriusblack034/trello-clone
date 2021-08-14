<template>
  <div class="logout">
    <div v-for="(content, index) in contents" :key="index">
      <SectionLogout
        :title="content.title"
        :des="content.des"
        :style="{ backgroundColor: content.color }"
      >
        <template v-slot:button v-if="content.button">
          <v-btn
            @click="removeFavor(index)"
            color="white"
            large
            class="text--black mx-5 py-2"
            style="box-shadow: 0 1px rgba(149 157 161 , 0.3);}"
            >{{ content.button }}</v-btn
          >
        </template>
      </SectionLogout>
    </div>
  </div>
</template>

<script>
import SectionLogout from "../components/SectionLogout.vue";
export default {
  components: {
    SectionLogout,
  },
  data() {
    return {
      contents: [
        {
          title: "Cảm ơn vì đã sử dụng Trello.",
          des: "Bạn đã đăng xuất. Vậy, bạn sẽ làm gì tiếp theo?",
          button: "",
          color: "#ffffff",
        },

        {
          title: "Đang sử dụng máy tính được chia sẻ?",
          des: "Chúng tôi đã lưu một số yêu thích của bạn cho lần đăng nhập tiếp theo, nhưng nếu bạn muốn bạn có thể xóa các yêu thích đó ngay bây giờ.",
          button: "Gỡ bỏ các yêu thích đã lưu",
          color: "#0079bf",
        },
        {
          title: "Theo dõi chúng tôi",
          des: `…trên Trello Blog, Twitter, và Facebook.<br> Chúng tôi đăng tất cả các mẹo và cập nhật nhưng không quá nhiều đến mức gây khó chịu.`,
          button: "",
          color: "#bcd9ea",
        },
        {
          title: "Chia sẻ Trello để nhận Trello Gold miễn phí.",
          des: "Đúng vậy. Với mỗi thành viên bạn mời đăng ký, bạn sẽ nhận một tháng Trello Gold miễn phí, lên tới 12 tháng. Với Trello Gold bạn nhận ba Power-ups cho mỗi bảng, tùy chỉnh hình nền, các nhãn dán và biểu tượng cảm xúc, 250MB tệp đính kèm và lưu trữ các kết quả tìm kiếm.<br><br>Hãy giúp chúng tôi giới thiệu thêm nhiều người nữa và nhận về một số Gold miễn phí.",
          button: "Chia sẻ Trello",
          color: "#f5ea92",
        },
        {
          title: "Cảm ơn Trello, nhưng tôi xong việc hôm nay rồi.",
          des: "Bạn đã đăng xuất. Vậy, bạn sẽ làm gì tiếp theo?",
          button: "",
          color: "#f5ea92",
        },
        {
          title: "Cảm ơn vì đã sử dụng Trello.",
          des: "Bạn đã đăng xuất. Vậy, bạn sẽ làm gì tiếp theo?",
          button: "",
          color: "#0079bf",
        },
      ],
    };
  },
  methods: {
    removeFavor(index) {
      this.contents[index] = "";
    },
  },
};
</script>

<style>
</style>