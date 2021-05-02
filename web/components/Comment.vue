<template>
    <div class="comment">
        <v-container style="backgroundcolor: rgba(245, 245, 245, 0.7); width: 100%">
            <h3>发表评论</h3>
            <div>
                <v-form>
                    <v-textarea v-model="form.message" label="请输入评论内容（240字以内）" :counter="240"></v-textarea>
                    <v-text-field v-model="email" :counter="64" label="邮箱" type='email'></v-text-field>
                    <v-text-field v-model="name" :counter="20" label="昵称"></v-text-field>
                    <v-btn class="mr-4" @click="submit" large>发表</v-btn>
                </v-form>
            </div>
            <h3 class="mt-12">评论区</h3>
            <div>
                <div class="comment-container">
                    <div class="comment-item" v-for="comment in listData" :key="comment.id">
                        <div>
                            <div class="avatar">
                                <v-img src="/user.png"></v-img>
                            </div>
                            <div class="comment-info">
                                <div>
                                    <span class="name">{{comment.name}}</span>
                                    <span class="date">{{comment.date}}</span>
                                </div>
                                <p class="comment">{{comment.comment}}</p>
                            </div>
                            <div class="reply-btn" @click="replyComment(comment)">
                                <span>回复</span>
                            </div>
                        </div>
                        <div class="reply-container" v-if="comment.reply.length">
                            <div class="reply-item" v-for="reply in comment.reply" :key="reply.id">
                                <div>
                                    <div class="avatar">
                                        <v-img src="/user.png"></v-img>
                                    </div>
                                    <div class="reply-info">
                                        <div>
                                            <span class="name">{{reply.i_name}}<span style="color:#666;fontSize:12px;margin:0px 5px">回复</span>{{reply.r_name}}</span>
                                            <span class="date">{{reply.date}}</span>
                                        </div>
                                        <p class="reply-content">{{reply.c_reply}}</p>
                                    </div>
                                    <div class="reply-btn" @click="replyCommentReply(comment.id,reply)">
                                        <span>回复</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <v-bottom-sheet v-model="sheet" inset>
                    <v-sheet class="text-center" height="24rem">
                        <div class="px-2 mt-2">
                            <v-form>
                                <v-textarea v-model="reply.message" label="请输入回复内容（240字以内）" :counter="240"></v-textarea>
                                <v-text-field v-model="email" :counter="64" label="邮箱"></v-text-field>
                                <v-text-field v-model="name" :counter="20" label="昵称"></v-text-field>
                                <v-btn class="mr-4" @click="submitReply(comment_id)" large>提交</v-btn>
                            </v-form>
                        </div>
                    </v-sheet>
                </v-bottom-sheet>
            </div>
        </v-container>
        <div class="my-2 text-center" v-if="count === listData.length">
            <v-btn text small>没有咯~</v-btn>
        </div>
        <div class="my-2 text-center" v-else>
            <v-btn text small @click="fetchAdd()">加载更多...</v-btn>
        </div>
        <v-snackbar v-model="snackbar" :timeout="timeout">{{
            snackbarText
        }}</v-snackbar>
    </div>
</template>

<script>
const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default {
    data() {
        return {
            form: {
                message: "",
            },
            reply: {
                message: "",
            },
            name: "",
            email: "",
            listData: [],
            sheet: false,
            // commentReply: [],
            comment_id: "",
            a_id: this.$route.query.id,
            // show_reply: 0,
            r_name: "",
            i_email: "",
            r_email: "",
            count: "",
            snackbar: false,
            snackbarText: "",
            timeout: 2000,
            limit: 10,
        };
    },
    mounted() {
        if (localStorage.getItem("tourist")) {
            let tourist = localStorage.getItem("tourist");
            tourist = JSON.parse(tourist);
            this.name = tourist.name;
            this.email = tourist.email;
        }
    },
    methods: {
        async submit() {
            if (!this.form.message) {
                this.snackbar = true;
                this.snackbarText = "评论不能为空";
                return;
            }
            if (this.form.message.length > 240) {
                this.snackbar = true;
                this.snackbarText = "评论长度不能超过240个字符";
                return;
            }
            if (!this.email) {
                this.snackbar = true;
                this.snackbarText = "邮箱不能为空";
                return;
            }
            if (!pattern.test(this.email)) {
                this.snackbar = true;
                this.snackbarText = "邮箱格式不正确";
                return;
            }
            if (this.email.length > 64) {
                this.snackbar = true;
                this.snackbarText = "邮箱长度不能超过64个字符";
                return;
            }
            if (!this.name) {
                this.snackbar = true;
                this.snackbarText = "昵称不能为空";
                return;
            }
            if (this.name.length > 20) {
                this.snackbar = true;
                this.snackbarText = "昵称长度不能超过20个字符";
                return;
            }
            try {
                const res = await this.$axios.post("/comments", {
                    name: this.name,
                    email: this.email,
                    comment: this.form.message,
                    article_id: this.a_id,
                });
                if (res.data.success) {
                    localStorage.setItem(
                        "tourist",
                        JSON.stringify({ name: this.name, email: this.email })
                    );
                    this.form.message = "";
                    this.fetch();
                    this.snackbar = true;
                    this.snackbarText = "评论成功，等待审核";
                } else {
                    this.snackbar = true;
                    this.snackbarText = res.data.message || "评论失败";
                }
            } catch (error) {
                this.snackbar = true;
                this.snackbarText = "评论失败";
            }
        },
        async submitReply(comment_id) {
            if (!this.reply.message) {
                this.snackbar = true;
                this.snackbarText = "回复不能为空";
            }
            if (this.reply.message.length > 240) {
                this.snackbar = true;
                this.snackbarText = "回复长度不能超过240个字符";
                return;
            }
            if (!this.email) {
                this.snackbar = true;
                this.snackbarText = "邮箱不能为空";
                return;
            }
            if (!pattern.test(this.email)) {
                this.snackbar = true;
                this.snackbarText = "邮箱格式不正确";
                return;
            }
            if (this.email.length > 64) {
                this.snackbar = true;
                this.snackbarText = "邮箱长度不能超过64个字符";
                return;
            }
            if (!this.name) {
                this.snackbar = true;
                this.snackbarText = "昵称不能为空";
            }
            if (this.name.length > 20) {
                this.snackbar = true;
                this.snackbarText = "昵称长度不能超过20个字符";
                return;
            }
            try {
                const res = await this.$axios.post(`/commentreply`, {
                    i_name: this.name,
                    r_name: this.r_name,
                    i_email: this.email,
                    r_email: this.r_email,
                    c_reply: this.reply.message,
                    comment_id: this.comment_id,
                    article_id: this.a_id,
                });
                if (res.data.success) {
                    localStorage.setItem(
                        "tourist",
                        JSON.stringify({ name: this.name, email: this.email })
                    );
                    this.reply.message = "";
                    this.sheet = false;
                    this.fetch();
                    this.comment_id = comment_id;
                    this.snackbar = true;
                    this.snackbarText = "回复成功，等待审核";
                } else {
                    this.snackbar = true;
                    this.snackbarText = res.data.message || "回复失败";
                }
            } catch (error) {
                this.snackbar = true;
                this.snackbarText = "回复失败";
            }
        },
        async fetch() {
            let res = await this.$axios.get(
                `/comments/get?article_id=${this.a_id}&limit=${this.limit}`
            );
            this.count = res.data.total[0].total;
            this.listData = res.data.data;
        },
        fetchAdd() {
            this.limit += 10;
            this.fetch();
        },
        /**
         * @description 回复评论
         */
        replyComment(item) {
            this.sheet = !this.sheet;
            this.comment_id = item.id;
            this.r_name = item.name;
            this.r_email = item.email;
        },
        /**
         * @description 回复回复
         */
        replyCommentReply(id, item) {
            this.sheet = !this.sheet;
            this.comment_id = id;
            this.r_name = item.i_name;
            this.r_email = item.i_email;
        },
    },
    created() {
        this.fetch();
    },
    watch: {
        $route(to, from) {
            this.a_id = to.query.id;
            this.fetch();
        },
    },
};
</script>

<style scoped lang='less'>
.comment .reply:hover {
    color: #b388ff !important;
    border-bottom: 1px solid #b388ff;
    cursor: pointer;
}
.comment {
    margin-top: 20px;
}
.comment-container {
    margin-top: 10px;
    .comment-item {
        margin-bottom: 10px;
        > div {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            min-height: 64px;
            // margin: 10px 0px;
            background: #ffffff;
            padding: 10px;
            .avatar {
                width: 40px;
                height: 40px;
                margin-right: 10px;
            }
            .comment-info {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                margin-right: 3rem;
                .name {
                    font-weight: 600;
                    font-size: 14px;
                    color: #333;
                    margin-right: 1rem;
                }
                .date {
                    font-size: 12px;
                    color: #ccc;
                }
                .comment {
                    font-size: 14px;
                    color: #666;
                    margin: 5px 0px;
                    background: #f1f1f1;
                    padding: 10px;
                    word-break: break-all;
                }
            }
            .reply-btn {
                position: absolute;
                right: 0.8rem;
                bottom: 1.5rem;
                display: inline-block;
                &:hover {
                    cursor: pointer;
                    color: #b388ff;
                }
            }
        }
        .reply-container {
            padding-left: 60px;
            margin: 0px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .reply-item {
                width: 100%;
                border-left: 1px solid rgb(184, 184, 184);
                padding-left: 10px;
                margin-bottom: 10px;
                > div {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    min-height: 64px;
                    background: #ffffff;
                    position: relative;
                    .avatar {
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                    }
                    .reply-info {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-content: center;
                        margin-right: 3rem;
                        .name {
                            font-weight: 600;
                            font-size: 14px;
                            color: #333;
                            margin-right: 1rem;
                        }
                        .date {
                            font-size: 12px;
                            color: #ccc;
                        }
                        .reply-content {
                            font-size: 14px;
                            color: #666;
                            margin: 5px 0px;
                            background: #f1f1f1;
                            padding: 10px;
                            word-break: break-all;
                        }
                    }
                    .reply-btn {
                        position: absolute;
                        right: 0.3rem;
                        bottom: 1rem;
                        display: inline-block;
                        &:hover {
                            cursor: pointer;
                            color: #b388ff;
                        }
                    }
                }
            }
        }
    }
}
</style>
