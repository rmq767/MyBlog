<template>
    <div class="panel">
        <div class="statistics">
            <div class="panel-item">
                <p class="title">总阅读量</p>
                <p class="count">1234</p>
            </div>
            <div class="panel-item">
                <p class="title">总浏览量</p>
                <p class="count">2222</p>
            </div>
            <div class="panel-item">
                <p class="title">总留言量</p>
                <p class="count">222</p>
            </div>
        </div>
        <div class="echars-block">
            <div ref="pv" :style="{ width: '100%', height: '400px' }"></div>
            <div ref="cv" :style="{ width: '100%', height: '400px' }"></div>
        </div>
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
        drawBar() {
            let myChart1 = this.$echarts.init(this.$refs.pv);
            myChart1.clear();
            myChart1.setOption({
                title: {
                    text: "文章阅读量",
                },
                tooltip: {},
                legend: {
                    data: ["阅读量"],
                },
                xAxis: {
                    data: this.x_data,
                },
                yAxis: {},
                series: [
                    {
                        name: "阅读量",
                        type: "bar",
                        data: this.s_data,
                    },
                ],
            });
            window.addEventListener("resize", () => {
                myChart1.resize();
            });
        },
        drawLine() {
            let myChart2 = this.$echarts.init(this.$refs.cv);
            myChart2.clear();
            myChart2.setOption({
                title: {
                    text: "网站访问量",
                },
                tooltip: {},
                legend: {
                    data: ["访问量"],
                },
                xAxis: {
                    data: this.x_data,
                },
                yAxis: {},
                series: [
                    {
                        name: "访问量",
                        type: "line",
                        data: this.s_data,
                    },
                ],
            });
            window.addEventListener("resize", () => {
                myChart2.resize();
            });
        },
        async fetchArticle() {
            const res = await this.$http.get("/articles");
            let articlesArr = res.data.splice(0, 5);
            this.x_data = articlesArr.map((v) => v.title);
            this.s_data = articlesArr.map((v) => v.clicks);
        },
    },
    async mounted() {
        // await this.fetchArticle();
        this.$nextTick(() => {
            this.drawBar();
            this.drawLine();
        });
    },
};
</script>

<style lang='less' scoped>
.statistics {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 0px;
    // background: #ffffff;
    .panel-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: 10px;
        .title {
            font-size: 16px;
        }
        .count {
            color: red;
            font-size: 32px;
            font-weight: bold;
        }
    }
}
.echars-block {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>
