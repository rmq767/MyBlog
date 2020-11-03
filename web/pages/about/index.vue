<template>
    <div class="about">
        <div class="avatar-block">
            <v-tooltip v-model="show" right>
                <template v-slot:activator="{  attrs }">
                    <div class="avatar" ref="avatar-img" @click="mouseMove" v-bind="attrs">
                        <img src="https://picsum.photos/200/200?random" />
                    </div>
                </template>
                <span>{{showText}}</span>
            </v-tooltip>
        </div>
        <div class="my-info">
            <div class="avatar-pc">
                <img src="https://picsum.photos/200/200?random" alt="">
            </div>
            <div class="info-item-social-contact">
                <p class="shine">QQ:{{}}</p>
                <p class="shine">WeChat:{{}}</p>
                <p class="shine">GitHub:{{}}</p>
                <p class="shine">CSDN:{{}}</p>
            </div>
            <div class="info-item-description">
                <p class="shine">hahahahahahhahahahahahahahahahahahahaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhha</p>
            </div>
            <div class="info-item-message">
                <p class="shine">hahahahahahhahahahahahahahahahahahahaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhh</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: true,
            showText: "点我试试 v_v",
            CSDN: "https://blog.csdn.net/qq_44775782",
        };
    },
    async asyncData({ $axios }) {
        const info = await $axios.$get("/informations");
        return {
            info,
        };
    },
    methods: {
        mouseMove() {
            window.addEventListener("mousemove", this.moveTo, false);
            this.show = true;
            this.showText = "哈哈，甩不掉了吧";
            setTimeout(() => {
                this.show = false;
                this.showText = "";
            }, 1000);
        },
        moveTo(e) {
            const avatar = this.$refs["avatar-img"];
            avatar.style.top = e.clientY + "px";
            avatar.style.left = e.clientX + "px";
            avatar.style.width = 2 + "rem";
            avatar.style.height = 2 + "rem";
        },
    },
    mounted() {},
};
</script>

<style lang='less'  scoped>
.about {
    background: url("https://picsum.photos/1920/1080?random");
    background-size: cover;
    animation: none;
    background-attachment: fixed;
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
        height: 5rem;
        width: 5rem;
        position: absolute;
        left: 0%;
        top: 5%;
        transition-timing-function: linear;
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }
    .my-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: space-around;
        background: rgba(0, 0, 0, 0.5);
        padding: 2rem;
        width: 50%;
        > div {
            margin: 1rem 0rem;
        }
        .avatar-pc {
            height: 5rem;
            width: 5rem;
            > img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }
        p {
            word-break: break-all;
        }
    }
}
.about .shine {
    background: white;
    cursor: pointer;
    background-image: -webkit-linear-gradient(
        left,
        #a18cd1,
        #fbc2eb 25%,
        #a6c1ee 50%,
        #d57eeb 75%,
        #a6c0fe
    );
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-background-size: 200% 200%;
    -webkit-animation: masked-animation 5s infinite linear;
}
@-webkit-keyframes masked-animation {
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: -50% -50%;
    }
    100% {
        background-position: 0 0;
    }
}
@media screen and (max-width: 960px) {
    .avatar {
        display: none;
    }
    .about .my-info {
        width: 100%;
    }
}
</style>
