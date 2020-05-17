<template>
  <div class="link">
    <v-container>
      <v-row class="overflow-y-auto">
        <v-col
          v-for="(link, i) in links"
          :key="i"
          class="col-12 col-md-6 col-lg-4"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card link :href="link.link" hover :class="{ 'on-hover': hover }">
              <v-img
                :src="link.image"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="link.title"></v-card-title>
              </v-img>
              <v-card-text class="text--primary">
                <div>{{ link.description }}</div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  async asyncData({ $axios }) {
    const links = await $axios.$get("/links");
    return {
      links
    };
  }
};
</script>

<style>
.link {
  height: 100%;
  position: relative;
  background: -webkit-linear-gradient(45deg, #a27d52 10%, #e2e2e2 90%);
  background: linear-gradient(45deg, #a27d52 10%, #e2e2e2 90%);
  overflow: hidden;
  background-size: 200% 100%;
  -webkit-animation: move 10s ease infinite;
  animation: move 10s ease infinite;
}
@-webkit-keyframes move {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
/* .link {
  height: 100%;
  background: url("/lib.jpg");
  background-size: cover;
} */
.link .v-card {
  transition: opacity 0.4s ease-in-out;
}
.link .v-card:not(.on-hover) {
  opacity: 0.7;
}
@media screen and (min-width: 1200px) {
  .link {
    background: url("https://picsum.photos/1280/800?random");
    background-size: cover;
    animation: none;
    background-attachment: fixed;
  }
}
</style>
