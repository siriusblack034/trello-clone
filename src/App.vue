<template>
  <v-app>
    <div>
      <!-- <div v-if="isAuth">
        <Header></Header>
      </div>
      <div v-else>
        <HeaderAuth />
      </div> -->
      <HeaderHome :scroll="scroll" />
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
/* import Header from "./layout/Header.vue";
import HeaderAuth from "./layout/HeaderLogin.vue"; */
import HeaderHome from "./layout/HeaderHome.vue";
import Footer from "./layout/Footer.vue";
export default {
  components: {
    /*     Header,
    HeaderAuth, */
    Footer,
    HeaderHome,
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      isAuth: false,
      scroll: false,
    };
  },
  methods: {
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
