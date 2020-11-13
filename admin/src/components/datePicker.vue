<template>
    <div class="date-picker">
        <el-date-picker v-model="dateTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" @change="chooseDate" :clearable="true"></el-date-picker>
    </div>
</template>

<script>
function weekweek(week) {
    let day;
    switch (week) {
        case "Mon":
            day = 0;
            break;
        case "Tue":
            day = 1;
            break;
        case "Wed":
            day = 2;
            break;
        case "Thu":
            day = 3;
            break;
        case "Fri":
            day = 4;
            break;
        case "Sat":
            day = 5;
            break;
        case "Sun":
            day = 6;
            break;
        default:
            break;
    }
    return day;
}
export default {
    name: "date-picker",
    props: {
        date: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            dateTime: [],
            pickerOptions: {
                //日期选择快捷选择
                shortcuts: [
                    {
                        text: "今日",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "昨日",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 1
                            );
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "近7日",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * (7 - 1)
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "近30日",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * (30 - 1)
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "本周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            let weekDay = start.toString().split(" ")[0];
                            let day = weekweek(weekDay);
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * day
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "上周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            let weekDay = start.toString().split(" ")[0];
                            let day = weekweek(weekDay);
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * (day + 7)
                            );
                            end.setTime(
                                end.getTime() - 3600 * 1000 * 24 * (day + 1)
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "本月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            let month = start.toString().split(" ")[2];
                            start.setTime(
                                start.getTime() -
                                    3600 * 1000 * 24 * Number(month - 1)
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "上月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            const year = new Date().getFullYear();
                            let month = new Date().getMonth() + 1;
                            let lastDays = new Date(year, month, 0)
                                .toString()
                                .split(" ")[2]; //上个月的总天数
                            let days = start.toString().split(" ")[2]; //这个月已过的天数
                            start.setTime(
                                start.getTime() -
                                    3600 *
                                        1000 *
                                        24 *
                                        (Number(days) + Number(lastDays))
                            );
                            end.setTime(
                                end.getTime() - 3600 * 1000 * 24 * Number(days)
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
        };
    },
    mounted() {
        this.dateTime = this.date;
    },
    watch: {
        date(val) {
            this.dateTime = val;
        },
    },
    methods: {
        /**
         * @description 选择日期
         */
        chooseDate(val) {
            this.$emit("chooseDate", val);
        },
    },
};
</script>

<style lang='less' scoped>
.date-picker {
    .el-input__inner {
        padding: 3px 10px;
        /deep/.el-range-separator {
            padding: 0px;
        }
    }
}
</style>