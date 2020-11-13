<template>
    <div class="about">
        <div class="my-info">
            <div class="avatar-pc">
                <img src="https://picsum.photos/200/200?random" alt="">
                <p class="shine">{{info.profile}}</p>
            </div>
            <div class="info-item-social-contact">
                <p class="shine" v-if="info.qq">QQ:{{info.qq}}</p>
                <p class="shine" v-if="info.wechat">WeChat:{{info.wechat}}</p>
                <p class="shine" v-if="info.github">GitHub:{{info.github}}</p>
                <p class="shine" v-if="info.csdn">CSDN:{{info.csdn}}</p>
            </div>
            <div class="info-item-description">
                <p class="shine">{{info.desc}}</p>
            </div>
        </div>
        <mouseMove></mouseMove>
    </div>
</template>

<script>
import mouseMove from "../../components/mouseMove.vue";
export default {
    data() {
        return {};
    },
    async asyncData({ $axios }) {
        const info = await $axios.$get("/informations");
        return {
            info: info.data,
        };
    },
    methods: {
        mouseMove() {},
    },
    components: {
        mouseMove,
    },
};
</script>

<style lang='less'  scoped>
.about {
    background: url("https://picsum.photos/1920/940?random");
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
        cursor: pointer;
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
        background: rgba(0, 0, 0, 0.4);
        padding: 2rem;
        width: 50%;
        margin-top: -120px;
        border-radius: 1rem;
        position: relative;
        z-index: 2;
        > div {
            margin: 1rem 0rem;
        }
        .avatar-pc {
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            > img {
                height: 5rem;
                width: 5rem;
                border-radius: 50%;
                margin-right: 2rem;
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
        #a6c0fe 75%,
        #d57eeb
    );
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 200%;
    animation: masked-animation 5s infinite linear;
}
@keyframes masked-animation {
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
    .avatar-block {
        display: none !important;
    }
    .about .my-info {
        width: 100%;
        height: 100%;
        margin-top: 0;
    }
}
</style>
