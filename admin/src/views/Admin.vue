<template>
    <div class="panel">
        <div class="statistics" v-loading='loadingPanel'>
            <div class="panel-item">
                <p class="title">总阅读量</p>
                <p class="count">{{panelData.readCount}}</p>
            </div>
            <div class="panel-item">
                <p class="title">总浏览量</p>
                <p class="count">{{panelData.pv}}</p>
            </div>
            <div class="panel-item">
                <p class="title">总留言量</p>
                <p class="count">{{panelData.messageCount}}</p>
            </div>
        </div>
        <div class="echars-block">
            <div ref="read" :style="{ width: '100%', height: '400px' }" v-loading='loadingRead'></div>
            <div ref="pv" :style="{ width: '100%', height: '400px' }" v-loading='loadingPv'></div>
        </div>
    </div>
</template>

<script>
import api from "../api/index";
export default {
    data() {
        return {
            read: {
                x_data: [],
                s_data: [],
            },
            pv: {
                x_data: [],
                s_data: [],
            },
            panelData: {
                readCount: 0,
                pv: 0,
                messageCount: 0,
            },
            loadingPanel: false,
            loadingRead: false,
            loadingPv: false,
        };
    },
    methods: {
        /**
         * @description 阅读量统计
         */
        drawBar() {
            let myChart1 = this.$echarts.init(this.$refs.read);
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
                    data: this.read.x_data,
                },
                yAxis: {},
                series: [
                    {
                        name: "阅读量",
                        type: "bar",
                        data: this.read.s_data,
                    },
                ],
            });
            window.addEventListener("resize", () => {
                myChart1.resize();
            });
        },
        /**
         * @description 网站访问量统计
         */
        drawLine() {
            let myChart2 = this.$echarts.init(this.$refs.pv);
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
                    data: this.pv.x_data,
                },
                yAxis: {},
                series: [
                    {
                        name: "访问量",
                        type: "line",
                        data: this.pv.s_data,
                    },
                ],
            });
            window.addEventListener("resize", () => {
                myChart2.resize();
            });
        },
        /**
         * @description 获取看板数据
         */
        async getCountData() {
            this.loadingPanel = true;
            const res = await api.statistics.getCountData();
            this.panelData.readCount = res.data.data[0][0].readCount;
            this.panelData.pv = res.data.data[2][0].pv;
            this.panelData.messageCount = res.data.data[1][0].messageCount;
            this.loadingPanel = false;
        },
        async fetchArticle() {
            this.loadingRead = true;
            const res = await api.statistics.getReadData();
            this.read.x_data = res.data.data.map((v) => v.title);
            this.read.s_data = res.data.data.map((v) => v.clicks);
            this.loadingRead = false;
            this.drawBar();
        },
        /**
         * @description 获取pv的图表数据
         */
        async getPvData() {
            this.loadingPv = true;
            const res = await api.statistics.getPvData();
            this.pv.x_data = res.data.data.map((v) => v.date);
            this.pv.s_data = res.data.data.map((v) => v.count);
            this.loadingPv = false;
            this.drawLine();
        },
    },
    mounted() {
        this.getPvData();
        this.getCountData();
        this.fetchArticle();
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
