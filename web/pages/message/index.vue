<template>
    <div class="message">
        <div class="input-block">
            <v-text-field filled rounded solo light v-model="message.msg" @change="sendMessage"></v-text-field>
        </div>
        <div class="message-block">
            <message :messageList='messageList'></message>
        </div>
        <v-snackbar v-model="snackbar" :timeout="timeout">{{snackbarText}}</v-snackbar>
    </div>
</template>

<script>
import Message from "../../components/Message.vue";
export default {
    data() {
        return {
            message: {
                msg: "",
                background: "",
                top: 0,
                left: 0,
            },
            messageList: [],
            snackbar: false,
            snackbarText: "",
            timeout: 2000,
            w: window.screen.availWidth,
            h: window.screen.availHeight,
            firstNickName: [
                "西门",
                "上官",
                "司徒",
                "欧阳",
                "轩辕",
                "诸葛",
                "百里",
                "令狐",
                "纳兰",
                "拓跋",
                "宇文",
                "长孙",
                "慕容",
                "夏侯",
                "司马",
                "南宫",
                "端木",
            ],
            secendNickName: [
                "暖暖",
                "长卿",
                "微",
                "琪",
                "小小",
                "撒撒",
                "熊大",
                "宝强",
                "浅",
                "子",
                "宏",
                "怡",
                "哲",
                "悦灵",
                "景跃",
                "澜",
                "昭雪",
                "茹雪",
                "美琳",
                "娅楠",
                "韵寒",
                "诗琪",
                "瑞祺",
                "婉君",
                "丽君",
                "玉洁",
                "美",
                "雪",
                "雨",
                "莲",
                "雅",
                "樱",
                "丽",
                "艳",
                "蕊",
                "娜",
                "惠",
                "玉",
                "月",
                "仪",
                "桃琳",
                "玲",
                "楠",
                "兰",
                "媛媛",
                "芙婷",
                "菁菁",
                "萍",
                "盈盈",
                "姐",
                "芳",
                "馨",
                "琦",
                "琦",
                "兰馨",
                "佳雪",
                "雪涵",
                "薇婷",
                "雪枚",
                "雪樱",
                "云兰",
                "兰馨",
                "盈盈",
                "晶晶",
                "菁菁",
                "婉仪",
                "婉君",
                "梦娴",
                "梦丽",
                "梦琳",
                "依娜",
                "梦仪",
                "诗雨",
                "媛蝴",
                "丛蝶",
                "瑶箐",
                "楠晴",
                "绢竺",
                "姗玫",
                "菊萼",
                "琬莠",
                "蔻谨",
                "蓝桃",
                "萍甜",
                "苎葩",
                "窈莹",
                "菀蝴",
                "妙菱",
                "蓉亭",
                "凤媪",
                "昙帼",
                "楠蝶",
                "茹婧",
                "珊胭",
                "婴谨",
                "婕胭",
                "姿蝉",
                "蓝馨",
                "芩燕",
                "淑谨",
                "苹飘",
                "婷嫫",
                "菩梅",
                "馥嫫",
                "淑篮",
                "凤荟",
                "菀妙",
                "娜阑",
                "菽鹊",
                "旎滢",
                "芦镁",
                "姿琦",
                "诗婧",
                "簧馨",
                "瑶菏",
                "妙妗",
                "颖芍",
                "淑蕊",
                "凤瑛",
                "妙嫣",
                "娟杏",
                "芍葩",
                "竹娴",
                "蕖荟",
                "黛滢",
                "荻葵",
                "嵋缨",
                "旖葵",
                "静娴",
                "雅淳",
                "玉涵",
                "韵婷",
                "兮倩",
                "灵珊",
                "佳悦",
                "诗晴",
                "雯媛",
                "静晗",
                "欣怡",
                "婉莹",
                "若冰",
                "韵涵",
                "思默",
                "茵灵",
                "晓芙",
                "倩颖",
                "依凌",
                "思琪",
                "欣蔓",
                "妍",
                "梦婕",
                "倩薇",
                "蔚蓝",
                "韵菲",
                "宁馨",
                "谊洁",
                "圣涵",
                "晓涵",
                "诗涵",
                "香娣",
                "竹君",
                "诗婷",
                "曼",
                "雪岚",
                "高怡",
                "圆圆",
                "明慧",
                "文倩",
                "静婷",
                "逸凡",
                "寒月",
                "逸",
                "雅馨",
                "慧",
                "思聪",
                "高云",
                "云岫",
                "皓熏",
                "汐情",
                "雅馨",
                "景辉",
                "永豪",
                "晨龙",
                "凡",
                "梦瑶",
                "月柯",
                "语琦",
                "晨",
                "英杰",
                "雨露",
                "顺庆",
                "氏政",
                "义统",
                "唐秀",
                "唐宣",
                "隆景",
                "静婷",
                "雯倩",
                "高诗",
                "晗羿",
                "鸣浩",
                "泽辉",
                "奇凡",
                "咏波",
                "绍峰",
                "明",
                "佳雨",
                "霈泽",
                "文波",
            ],
        };
    },
    methods: {
        sendMessage() {
            if (!this.message.msg.trim()) {
                this.snackbar = true;
                this.snackbarText = "留言不能为空";
            } else if (this.message.msg.length > 240) {
                this.snackbar = true;
                this.snackbarText = "留言不能超过240字";
            } else {
                let r = Math.floor(Math.random() * 255);
                let g = Math.floor(Math.random() * 255);
                let b = Math.floor(Math.random() * 255);
                let left = Math.floor(Math.random() * (this.w - 360));
                let top = Math.floor(Math.random() * (this.h - 200));
                let firstName = this.firstNickName[
                    Math.floor(Math.random() * this.firstNickName.length)
                ];
                let secendName = this.secendNickName[
                    Math.floor(Math.random() * this.secendNickName.length)
                ];
                this.messageList.push({
                    nickName: firstName + secendName,
                    msg: this.message.msg,
                    background: `rgba(${r},${g},${b},0.8)`,
                    left,
                    top,
                });
                this.message.msg = "";
            }
        },
    },

    components: {
        Message,
    },
};
</script>

<style lang='less' scoped>
.message {
    min-height: 100vh;
    position: relative;
    background: -webkit-linear-gradient(45deg, #c973ff 10%, #aebaf8 70%);
    background: linear-gradient(45deg, #c973ff 10%, #aebaf8 70%);
    padding-top: 20px;
    overflow: hidden;
    .input-block {
        z-index: 10;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
@media screen and (min-width: 1200px) {
    .message {
        background: url("https://picsum.photos/1280/800?random");
        background-size: cover;
        animation: none;
        background-attachment: fixed;
    }
}
@media screen and (max-width: 960px) {
    .message .input-block {
        position: absolute;
        top: 0.6rem;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
    }
    .message {
        padding-top: 4rem;
    }
}
</style>
