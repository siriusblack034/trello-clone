<template>
  <v-app id="app">
    <div>
      <div
        v-if="this.$route.name == 'Login' || this.$route.name == 'Logup'"
        class="py-6"
      >
        <HeaderAuth />
      </div>
      <div v-else>
        <HeaderHome :scroll="scroll" />
      </div>
    </div>
    <div>
      <router-view />
    </div>
    <!--  <div class="py-5" id="bottom">
      <Footer></Footer>
    </div> -->
  </v-app>
</template>
<script>
import HeaderAuth from "./layout/HeaderAuth.vue";
import HeaderHome from "./layout/HeaderHome.vue";
/* import Footer from "./layout/Footer.vue"; */
import { mapActions, mapState } from "vuex";
import BoardService from "./services/modules/board";
export default {
  components: {
    HeaderAuth,
    /*  Footer, */
    HeaderHome,
  },

  async created() {
    window.addEventListener("scroll", this.handleScroll);
    this.$store.dispatch("getCookie");
     BoardService.getAllBoard().then(result =>{
      console.log(result);
    });
  },
  computed: {
    ...mapState(["user"]),
  },

  data() {
    return {
      scroll: false,
    };
  },
  methods: {
    ...mapActions(["getCookie"]),
    handleScroll() {
      if (window.scrollY == 0) {
        this.scroll = false;
      } else {
        this.scroll = true;
      }
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
