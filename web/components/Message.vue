<template>
    <div class="page-container">
        <div v-if="isWidth">
            <div v-for="(item,index) in messageList" :key="index">
                <div class="page" @mousedown="move" :style="{background:item.background,top:item.top+'px',left:item.left+'px'}">
                    <p>{{item.nickName}}：{{item.msg}}</p>
                </div>
            </div>
        </div>
        <v-row v-else>
            <v-col v-for="(item,index) in messageList" :key="index" cols="12" sm="6" md="4" lg='3' xl='2'>
                <div class="page" @mousedown="move" :style="{background:item.background}">
                    <p>{{item.nickName}}：{{item.msg}}</p>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: {
        messageList: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            windowWidth: window.screen.availWidth,
        };
    },
    computed: {
        isWidth() {
            return this.windowWidth > 960;
        },
    },
    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });
    },
    methods: {
        move(e) {
            let odiv = e.target; //获取目标元素
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            document.onmousemove = (e) => {
                // console.log(e);
                //鼠标按下并移动的事件
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                //移动当前元素
                odiv.style.left = left + "px";
                odiv.style.top = top + "px";
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
    },
};
</script>

<style lang='less' scoped>
.page-container {
    position: relative;
    height: 100%;
}
.page {
    max-width: 25rem;
    min-width: 15rem;
    line-height: 1.1rem;
    padding: 1rem;
    background-color: transparent;
    position: absolute !important;

    -moz-border-radius-bottomleft: 20px 500px;
    -moz-border-radius-bottomright: 500px 30px;
    -moz-border-radius-topright: 5px 100px;

    -webkit-border-bottom-left-radius: 20px 500px;
    -webkit-border-bottom-right-radius: 500px 30px;
    -webkit-border-top-right-radius: 5px 100px;

    border-bottom-left-radius: 20px 500px;
    border-bottom-right-radius: 500px 30px;
    border-top-right-radius: 5px 100px;

    background: -moz-repeating-linear-gradient(
        top,
        #fcf59b,
        #fcf59b 29px,
        #81cbbc 30px
    );

    background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#81cbbc),
        color-stop(2%, #fcf59b)
    );

    background: repeating-linear-gradient(
        top,
        #fcf59b,
        #fcf59b 29px,
        #81cbbc 30px
    );

    -webkit-background-size: 100% 30px;

    -moz-box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);

    // text-shadow: 0 1px 0 #ffffff;
    position: relative;
    > p {
        background: rgba(255, 255, 255, 0.7);
        min-height: 2rem;
        font-size: small;
        padding: 0.2rem;
        margin-bottom: 0px;
        word-wrap: break-word;
    }
}
.page:after {
    width: 6rem;
    height: 2rem;
    content: " ";
    // margin-left: -90px;
    border: 1px solid rgba(200, 200, 200, 0.8);

    background: rgba(254, 254, 254, 0.6);
    -moz-box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);

    -moz-transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
    -o-transform: rotate(-5deg);
    transform: rotate(-5deg);

    position: absolute;
    left: 50%;
    top: 0px;
    transform: translate(-50%, -50%);
}
@media screen and (max-width: 960px) {
    .page {
        position: relative !important;
        max-width: 100%;
        margin-bottom: 1rem;
    }
}
// @media screen and (min-width: 960px) {
//     .page {
//         position: absolute !important;
//     }
// }
</style>