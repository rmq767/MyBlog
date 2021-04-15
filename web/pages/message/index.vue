<template>
    <div class="message">
        <div class="input-block">
            <div class="name-block" @click="changeName">
                <span>{{name}}:</span>
            </div>
            <v-text-field filled rounded solo light v-model="message.msg" @change="sendMessage" :max-length='240'></v-text-field>
        </div>
        <div class="message-block">
            <message :messageList="messageList"></message>
        </div>
        <v-snackbar v-model="snackbar" :timeout="timeout">{{
            snackbarText
        }}</v-snackbar>
    </div>
</template>

<script>
import Message from "../../components/Message.vue";
import message from "../../mixin/message";
export default {
    mixins: [message],
    data() {
        return {
            name: "",
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
        };
    },
    methods: {
        changeName() {
            let firstName = this.firstNickName[
                Math.floor(Math.random() * this.firstNickName.length)
            ];
            let secendName = this.secendNickName[
                Math.floor(Math.random() * this.secendNickName.length)
            ];
            this.name = firstName + secendName;
        },
        async sendMessage() {
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
                // let firstName = this.firstNickName[
                //     Math.floor(Math.random() * this.firstNickName.length)
                // ];
                // let secendName = this.secendNickName[
                //     Math.floor(Math.random() * this.secendNickName.length)
                // ];
                // this.name = firstName + secendName;
                const response = await this.$axios.post(`/messages`, {
                    message: this.message.msg,
                    name: this.name,
                    background: `rgba(${r},${g},${b},0.8)`,
                    left,
                    top,
                });
                if (response.data.success) {
                    this.snackbar = true;
                    this.snackbarText = "留言成功，等待审核";
                    this.message.msg = "";
                    this.getMessageList();
                } else {
                    this.snackbar = true;
                    this.snackbarText = response.data.message;
                }
            }
        },
        async getMessageList() {
            const response = await this.$axios.get("/messages");
            this.messageList = response.data.data;
        },
    },
    mounted() {
        this.getMessageList();
        this.changeName();
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
    // background: -webkit-linear-gradient(45deg, #c973ff 10%, #aebaf8 70%);
    background: linear-gradient(45deg, #56ccf2 10%, #2f80ed 70%);
    padding-top: 20px;
    overflow: hidden;
    .input-block {
        z-index: 10;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .name-block {
            background: transparent;
            cursor: pointer;
            position: absolute;
            left: 30px;
            top: -3px;
            z-index: 1;
            font-size: 14px;
            &:hover {
                color: rgb(179, 136, 255);
            }
        }
    }
}
@media screen and (min-width: 1200px) {
    .message {
        // background: url("https://picsum.photos/1920/940?random=1");
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
