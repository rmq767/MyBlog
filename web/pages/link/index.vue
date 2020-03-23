<template>
  <div class="link">
    <v-container>
      <v-row class="overflow-y-auto">
        <v-col
          v-for="(link, i) in links"
          :key="i"
          class="col-xs-12 col-md-6 col-lg-4"
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

<style scoped>
.link {
  height: 100%;
  background: url("/lib.jpg");
  background-size: cover;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.7;
}
</style>
