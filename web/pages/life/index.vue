<template>
  <div class="life">
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item v-for="n in 4" :key="n">
        <span slot="opposite">Tus eu perfecto</span>
        <v-hover v-slot:default="{ hover }">
          <v-card class="elevation-2">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  你好
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-subtitle class="pb-0">2020-3-17</v-card-subtitle>
            <v-card-text>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
              scaevola imperdiet nec ut, sed euismod convenire principes at. Est
              et nobis iisque percipit, an vim zril disputando voluptatibus, vix
              an salutandi sententiae.
            </v-card-text>
          </v-card>
        </v-hover>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.life {
  height: 100%;
  background: url("/life.jpg");
  background-size: cover;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
