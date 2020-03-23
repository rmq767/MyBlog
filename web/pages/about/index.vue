<template>
  <div class="about">
    <v-parallax src="/myinfo.jpg" height="650">
      <div class="mb-12 display-1">我想说</div>
      <div class="display-3">{{ info.my_message }}</div>
    </v-parallax>
    <v-parallax src="/computer.jpg" height="650">
      <div class="mb-12 display-1">这是我</div>
      <div class="display-3">{{ info.my_info }}</div></v-parallax
    >
    <v-parallax src="/pen2.jpg" height="650">
      <div class="mb-12 display-1">我梦想</div>
      <div class="display-3">{{ info.my_hope }}</div></v-parallax
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  async asyncData({ $axios }) {
    const info = await $axios.$get("/informations");
    return {
      info
    };
  }
};
</script>

<style></style>
