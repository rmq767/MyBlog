<template>
    <div class="panel">
        <div class="statistics" v-loading='loadingPanel'>
            <div class="panel-item">
                <p class="title">阅读量</p>
                <p class="count">{{panelData.readCount}}</p>
            </div>
            <div class="panel-item">
                <p class="title">网站访问量</p>
                <p class="count">{{panelData.pv}}</p>
            </div>
            <div class="other-item">
                <div class="sub-title1">
                    <p class="title">总留言量</p>
                    <p class="count">{{panelData.messageCount}}</p>
                </div>
                <div class="sub-title2">
                    <p class="title">审核通过量</p>
                    <p class="count">{{panelData.messageCountCheck}}</p>
                </div>
            </div>
            <div class="other-item">
                <div class="sub-title1">
                    <p class="title">评论回复量</p>
                    <p class="count">{{panelData.commentsCount+panelData.commentreplyCount}}</p>
                </div>
                <div class="sub-title2">
                    <p class="title">审核通过量</p>
                    <p class="count">{{panelData.commentsCountCheck+panelData.commentreplyCountCheck}}</p>
                </div>
            </div>
            <div class="panel-item">
                <p class="title">有效游客数</p>
                <p class="count">{{panelData.visitorCount}}</p>
            </div>
            <div class="panel-item">
                <p class="title">网站文章数</p>
                <p class="count">{{panelData.articleCount}}</p>
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
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        snap: true,
                    },
                },
                legend: {
                    data: ["阅读量"],
                },
                xAxis: {
                    data: this.read.x_data,
                    axisLabel: {
                        interval: 0, //强制显示文字
                        rotate: -30,
                        formatter: function (value) {
                            if (value.length >= 8) {
                                return value.slice(0, 8) + "...";
                            }
                            return value;
                        },
                    },
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
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        snap: true,
                    },
                },
                legend: {
                    data: ["访问量"],
                },
                xAxis: {
                    data: this.pv.x_data,
                    axisLabel: {
                        interval: 0,
                    },
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
            this.panelData.pv = res.data.data[3][0].pv;
            this.panelData.messageCount = res.data.data[1][0].messageCount;
            this.panelData.messageCountCheck =
                res.data.data[2][0].messageCountCheck;
            this.panelData.commentsCount = res.data.data[4][0].commentsCount;
            this.panelData.commentsCountCheck =
                res.data.data[5][0].commentsCountCheck;
            this.panelData.commentreplyCount =
                res.data.data[6][0].commentreplyCount;
            this.panelData.commentreplyCountCheck =
                res.data.data[7][0].commentreplyCountCheck;
            this.panelData.visitorCount = res.data.data[8][0].visitorCount;
            this.panelData.articleCount = res.data.data[9][0].articleCount;
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
            this.pv.x_data = res.data.data.map((v) => v.createTime);
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
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    padding: 10px 0px;
    // background: #ffffff;
    .panel-item {
        flex-basis: 30%;
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
    .other-item {
        flex-basis: 30%;
        display: flex;
        flex-direction: row;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: 10px;
        .sub-title1 {
            flex: 3;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .title {
                font-size: 16px;
            }
            .count {
                color: red;
                font-size: 32px;
                font-weight: bold;
            }
        }
        .sub-title2 {
            flex: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .title {
                font-size: 14px;
            }
            .count {
                color: rgb(25, 0, 255);
                font-size: 28px;
                font-weight: bold;
            }
        }
    }
}
.echars-block {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    > div {
        margin-bottom: 50px;
    }
}
</style>
