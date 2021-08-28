<template>
  <v-app>
    <div>
      <div v-if="user.isLogin">
        <HeaderBoard />
      </div>
      <div
        v-else-if="this.$route.name == 'Login' || this.$route.name == 'Logup'"
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
    <footer class="py-5 pb-0">
      <Footer></Footer>
    </footer>
  </v-app>
</template>
<script>
import HeaderBoard from "./layout/HeaderBoard.vue";
import HeaderAuth from "./layout/HeaderAuth.vue";
import HeaderHome from "./layout/HeaderHome.vue";
import Footer from "./layout/Footer.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    HeaderBoard,
    HeaderAuth,
    Footer,
    HeaderHome,
  },
  
   created() {
    window.addEventListener("scroll", this.handleScroll);
     this.$store.dispatch('getCookie')

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
  text-align: center;
  color: #2c3e50;
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
</style>
