import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import http from "./http";
import store from "./store";
import * as echarts from "echarts/lib/echarts";
// 引入 echarts 主模块。
import "echarts/lib/echarts";
// 引入柱形图
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
//// 引入提示框组件、标题组件、工具箱、legend组件。
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import animated from 'animate.css' //引入动画
Vue.use(animated)

Vue.prototype.$echarts = echarts;

Vue.use(mavonEditor);
Vue.prototype.$http = http
Vue.config.productionTip = false;
Vue.mixin({
  //全局的方法等
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload";
    }
  },
  methods: {
    mixGetAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ""}`
      };
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJPG && isLt2M;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");