<template>
  <div class="life">
    <h2 class="text-center white--text display-1 site__title font-weight-thin">
      生活不止眼前的苟且，还有诗和远方
    </h2>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item v-for="item in life" :key="item.id">
        <span slot="opposite">{{ item.date.split("-")[0] }}</span>
        <v-hover v-slot:default="{ hover }">
          <v-card class="elevation-2">
            <v-img
              :src="item.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out white v-card--reveal display-1 black--text"
                  style="height: 100%;"
                >
                  {{ item.description }}
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-subtitle class="pb-0">{{
              item.date.split("T")[0]
            }}</v-card-subtitle>
            <v-card-text>
              {{ item.content }}
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
  },
  async asyncData({ $axios }) {
    const life = await $axios.$get("/life");
    return {
      life
    };
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
.site__title {
  color: #f35626;
  font-family: 微软雅黑;
  background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: hue 10s infinite linear;
}
@-webkit-keyframes hue {
  from {
    -webkit-filter: hue-rotate(0deg);
    -moz-filter: hue-rotate(0deg);
  }
  to {
    -webkit-filter: hue-rotate(-360deg);
    -moz-filter: hue-rotate(-360deg);
  }
}
</style>
