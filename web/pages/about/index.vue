<template>
    <div class="about">
        <div class="my-info">
            <div class="avatar-pc" v-if="info.avatar">
                <img :src="info.avatar" alt="">
            </div>
            <div class="info-item-social-contact">
                <p class="shine profile" v-if="info.profile">个人介绍：{{info.profile}}</p>
                <p class="shine" v-if="info.qq">QQ:{{info.qq}}</p>
                <p class="shine" v-if="info.wechat">WeChat:{{info.wechat}}</p>
                <p class="shine" v-if="info.github">GitHub:{{info.github}}</p>
                <p class="shine" v-if="info.csdn">CSDN:{{info.csdn}}</p>
            </div>
            <div class="info-item-description">
                <p class="shine desc">{{info.description}}</p>
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
    asyncData() {
        const info = localStorage.getItem("myInfo");
        return {
            info: JSON.parse(info),
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
    // background: url("https://picsum.photos/1920/940?random");
    background: linear-gradient(45deg, #74ebd5 10%, #acb6e5 70%);
    background-size: cover;
    animation: none;
    background-attachment: fixed;
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .my-info {
        text-align: center;
        // display: flex;
        // flex-direction: column;
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
            justify-content: center;
            > img {
                height: 5rem;
                width: 5rem;
                border-radius: 50%;
            }
        }
    }
}
.info-item-description > .desc {
    font-size: 18px !important;
}
.about .shine {
    font-size: 14px;
    background: white;
    cursor: pointer;
    background-image: -webkit-linear-gradient(
        left,
        #fffb00,
        #91ff00 25%,
        #00ff88 50%,
        #00eeff 75%,
        #f8df00
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
    .about .my-info {
        width: 100%;
        height: 100%;
        margin-top: 0;
    }
}
</style>
