<template>
  <div class="about">
    <v-parallax src="/myinfo.jpg" height="650">
      <h1>你好</h1>
    </v-parallax>
    <v-parallax src="/computer.jpg" height="650"> <h1>hello</h1></v-parallax>
    <v-parallax src="/pen2.jpg" height="650"> <h1>world</h1></v-parallax>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.about {
  /* height: 100%;
  background: url("/myinfo.jpg");
  background-size: cover; */
}
</style>
