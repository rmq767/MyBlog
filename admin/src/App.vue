<template>
  <div id="app">
    <transition
      enter-active-class="animated zoomIn faster"
      leave-active-class="animated zoomOut faster"
      mode="out-in"
    >
      <router-view class="show_animate" />
    </transition>
  </div>
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
/* .tran {
  position: relative;
} */
/* .show_animate {
  position: absolute;
} */
</style>
