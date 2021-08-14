<template>
  <div>heellow trello</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["count"]),
  },
  components: {},
};
</script>
