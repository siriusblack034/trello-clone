<template>
  <div id="app">
    <v-app id="inspire">
      <v-carousel
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
        class="custom"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{ slide }} Slide</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
};
</script>

<style >
.custom .v-carousel__controls__item.v-btn {
  color: blue;
}

.custom .v-carousel__controls__item.v-btn.v-btn--active {
  color: green;
}

.custom .v-carousel__controls__item.v-btn.v-btn--active:before {
  opacity: 0;
}

.custom .v-carousel__controls__item.v-btn:hover {
  color: blue;
}

.custom .v-carousel__controls__item.v-btn:hover:before {
  opacity: 0;
}
</style>