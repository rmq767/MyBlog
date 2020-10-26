import Vue from "vue";
import highlight from "highlight.js";
Vue.use(highlight);
//封装成一个指令
const hl = Vue.directive("highlight", {
  inserted: function(el) {
    let blocks = el.querySelectorAll("pre code");
    blocks.forEach(block => {
      highlight.highlightBlock(block);
    });
  }
});

export default hl;
