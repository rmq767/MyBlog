<template>
    <div class="comment">
        <v-container style="backgroundColor:rgba(245,245,245,0.7); width:100%">
            <h3>留言区</h3>
            <div>
                <v-form>
                    <v-textarea v-model="form.message" label="请输入留言（240字以内）" :counter="240" required></v-textarea>
                    <v-text-field v-model="form.name" :counter="20" label="昵称" required></v-text-field>
                    <v-btn class="mr-4" @click="submit" large>提交</v-btn>
                </v-form>
            </div>
            <h3 class="mt-12">评论区</h3>
            <div>
                <v-list v-for="(item) in listData" :key="item.id" dense class="py-0 my-3" two-line>
                    <template>
                        <v-list-item link>
                            <v-list-item-avatar>
                                <v-img src="/user.jpg"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-html="
                    item.name +
                      `<span class='overline ml-5'>${item.date.split('T')[0]} ${
                        item.date.split('T')[1].split('.')[0]
                      }</span>`
                  " class="font-weight-black"></v-list-item-title>
                                <v-list-item-subtitle v-html="type == 'comments' ? item.comment : item.message"></v-list-item-subtitle>
                            </v-list-item-content>
                            <div class="handleReply">
                                <span @click="
                    sheet = !sheet;
                    comment_id = item.id;
                    r_name = item.name;
                  " class="reply">回复</span>
                                <div class="reply mt-4 overline" @click="fetchReply(item.id)">
                                    <v-icon size="medium">mdi-message-processing</v-icon>
                                    <span>{{ item.reply_count ? item.reply_count : 0 }}</span>
                                </div>
                            </div>
                        </v-list-item>
                        <div class="px-8" v-if="show_reply == item.id">
                            <template v-for="comment in commentReply">
                                <v-list-item :key="comment.r_id" dense link>
                                    <v-list-item-avatar>
                                        <v-img src="/user.jpg"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title v-html="
                        comment.i_name +
                          `<span class='caption mx-2'>回复</span> ` +
                          comment.r_name +
                          `<span class='overline ml-5'>${
                            comment.date.split('T')[0]
                          } ${item.date.split('T')[1].split('.')[0]}</span>`
                      " class="font-weight-black"></v-list-item-title>
                                        <v-list-item-subtitle v-html="
                        type == 'comments' ? comment.c_reply : comment.m_reply
                      "></v-list-item-subtitle>
                                    </v-list-item-content>
                                    <div class="handleReply">
                                        <span @click="
                        sheet = !sheet;
                        comment_id = item.id;
                        r_name = comment.i_name;
                      " class="reply">回复</span>
                                    </div>
                                </v-list-item>
                            </template>
                        </div>
                    </template>
                </v-list>
            </div>
            <div>
                <v-bottom-sheet v-model="sheet" inset>
                    <v-sheet class="text-center" height="18rem">
                        <div class="px-2 mt-2">
                            <v-form>
                                <v-textarea v-model="reply.message" label="请输入留言（240字以内）" :counter="240" required></v-textarea>
                                <v-text-field v-model="reply.name" :counter="20" label="昵称" required></v-text-field>
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
            <v-btn text small @click="fetch(10)">加载更多...</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: ["type", "article_id"],
    data() {
        return {
            form: {},
            reply: {},
            listData: [],
            sheet: false,
            commentReply: [],
            comment_id: "",
            a_id: this.$route.params.id,
            show_reply: 0,
            r_name: "",
            count: "",
        };
    },
    methods: {
        async submit() {
            if (this.type == "comments") {
                await this.$axios.post("/comments", {
                    name: this.form.name,
                    comment: this.form.message,
                    article_id: this.a_id,
                });
            } else {
                await this.$axios.post("/messages", {
                    name: this.form.name,
                    message: this.form.message,
                });
            }
            this.form = {};
            this.fetch();
        },
        async submitReply(comment_id) {
            if (this.type == "comments") {
                await this.$axios.post(`/commentreply`, {
                    i_name: this.reply.name,
                    r_name: this.r_name,
                    c_reply: this.reply.message,
                    comment_id: this.comment_id,
                });
            } else {
                await this.$axios.post(`/messagereply`, {
                    i_name: this.reply.name,
                    r_name: this.r_name,
                    m_reply: this.reply.message,
                    message_id: this.comment_id,
                });
            }
            this.sheet = false;
            this.fetch();
            this.comment_id = comment_id;
            this.fetchReply(comment_id);
        },
        async fetch(limit) {
            let res;
            if (this.type == "comments") {
                res = await this.$axios.get(
                    `/comments/get?article_id=${this.a_id}&limit=${
                        limit ? limit : ""
                    }`
                );
                const c_count = await this.$axios.get(
                    `/comments?article_id=${this.a_id}`
                );
                this.count = c_count.data.length;
            } else {
                res = await this.$axios.get(
                    `/messages/get?limit=${limit ? limit : ""}`
                );
                const c_count = await this.$axios.get(`/messages`);
                this.count = c_count.data.length;
            }
            this.listData = res.data;
        },
        async fetchReply(comment_id) {
            let res;
            if (this.type == "comments") {
                res = await this.$axios.get(
                    `/commentreply?comment_id=${comment_id}`
                );
            } else {
                res = await this.$axios.get(
                    `/messagereply?message_id=${comment_id}`
                );
            }
            this.commentReply = res.data;
            this.show_reply = comment_id;
            // this.comment_id = comment_id;
        },
    },
    created() {
        this.fetch();
    },
    watch: {
        type(newValue) {
            this.type = newValue;
            this.fetch();
        },
        $route(to, from) {
            this.a_id = to.params.id;
            this.fetch();
        },
        show_reply(newValue) {
            console.log(newValue);
        },
    },
};
</script>

<style scoped>
.comment .reply:hover {
    color: #b388ff !important;
    border-bottom: 1px solid #b388ff;
    cursor: pointer;
}
.comment {
    margin-top: 20px;
}
</style>
