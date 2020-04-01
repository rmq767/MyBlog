<template>
  <div class="about">
    <v-parallax src="/pen2.jpg" height="650" style="backgroundSize:cover">
      <div class="mb-12 display-1">我想说</div>
      <div class="display-3 shine">{{ info.my_message }}</div>
    </v-parallax>
    <v-parallax src="/computer.jpg" height="650" style="backgroundSize:cover">
      <div class="mb-12 display-1">这是我</div>
      <div class="display-3 shine">{{ info.my_info }}</div></v-parallax
    >
    <v-parallax src="/road.jpg" height="650" style="backgroundSize:cover">
      <div class="mb-12 display-1">我梦想</div>
      <div class="display-3 shine">{{ info.my_hope }}</div></v-parallax
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

<style>
.about .shine {
  background: white;
  cursor: pointer;
  background-image: -webkit-linear-gradient(
    left,
    #cddc39,
    #ff9800 25%,
    #b388ff 50%,
    #7c4dff 75%,
    #cddc39
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 200%;
  -webkit-animation: masked-animation 2s infinite linear;
}
.about .shine:hover {
  -webkit-animation: masked-animation 0.5s infinite linear;
}
@-webkit-keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: -50% -50%;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
