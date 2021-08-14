<template>
  <v-app>
    <div class="px-0 py-10">
      <div v-if="isLogin">
        <Header></Header>
      </div>
      <div v-else>
        <HeaderAuth />
      </div>
    </div>
    <div>
      <router-view />
    </div>
    <footer>
      <Footer></Footer>
    </footer>
  </v-app>
</template>
<script>
import Header from "./layout/Header.vue";
import HeaderAuth from "./layout/HeaderAuth.vue";
import Footer from "./layout/Footer.vue";

export default {
  components: {
    Header,
    HeaderAuth,
    Footer,
  },
  data() {
    return {
      isLogin: false,
    };
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
