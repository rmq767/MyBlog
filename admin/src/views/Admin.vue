<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="20"
        ><div ref="echarsBar" :style="{ width: '60rem', height: '28rem' }"></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x_data: [],
      s_data: []
    };
  },
  methods: {
    drawLine() {
      let myChart2 = this.$echarts.init(this.$refs.echarsBar);
      myChart2.setOption({
        title: {
          text: "文章点击量"
        },
        tooltip: {},
        legend: {
          data: ["阅读数"]
        },
        xAxis: {
          data: this.x_data
        },
        yAxis: {},
        series: [
          {
            name: "阅读数",
            type: "bar",
            data: this.s_data
          }
        ]
      });
    },
    async fetchArticle() {
      const res = await this.$http.get("/articles");
      this.x_data = res.data.map(v => v.title);
      this.s_data = res.data.map(v => v.clicks);
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.fetchArticle();
    // });
    this.fetchArticle();
    setTimeout(() => {
      this.drawLine();
    }, 500);
  }
  // created() {
  //   this.fetchArticle();
  // }
  // watch: {
  //   bar_data() {
  //     const res = this.$http.get("/articles");
  //     this.bar_data = res.data.map(v => ({
  //       name: `${v.title}`,
  //       value: v.clicks
  //     }));
  //   }
  // }
};
</script>

<style></style>
