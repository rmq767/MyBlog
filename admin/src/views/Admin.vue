<template>
    <div class="echars-block">
        <el-row :gutter="24">
            <el-col :span="20">
                <div ref="echarsBar" :style="{ width: '80rem', height: '30rem' }"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            x_data: [],
            s_data: [],
        };
    },
    methods: {
        drawLine() {
            let myChart2 = this.$echarts.init(this.$refs.echarsBar);
            myChart2.setOption({
                title: {
                    text: "文章点击量",
                },
                tooltip: {},
                legend: {
                    data: ["阅读数"],
                },
                xAxis: {
                    data: this.x_data,
                },
                yAxis: {},
                series: [
                    {
                        name: "阅读数",
                        type: "bar",
                        data: this.s_data,
                    },
                ],
            });
        },
        async fetchArticle() {
            const res = await this.$http.get("/articles");
            let articlesArr = res.data.splice(0, 5);
            this.x_data = articlesArr.map((v) => v.title);
            this.s_data = articlesArr.map((v) => v.clicks);
        },
    },
    mounted() {
        // this.$nextTick(() => {
        //   this.fetchArticle();
        // });
        this.fetchArticle();
        setTimeout(() => {
            this.drawLine();
        }, 500);
    },
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

<style>
.echars-block {
    width: 100%;
    height: 100%;
}
</style>
