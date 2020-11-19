<template>
    <div class="blog">
        <v-btn class="mx-2" fab dark color="rgb(179, 136, 255)" @click="backHome">
            <v-icon dark> mdi-arrow-left </v-icon>
        </v-btn>
        <v-container>
            <div class="theme-type">
                <v-card>
                    <div v-if="sameThemeArticles.length">
                        <div class="my-4 subtitle-1">同主题文章</div>
                        <div class="article-theme" v-for="(item,index) in sameThemeArticles" :key="index" @click="toArticleInfo(item.id)">
                            {{item.title}}
                        </div>
                    </div>
                    <div v-if="sameTypeArticles.length">
                        <div class="my-4 subtitle-1">同分类文章</div>
                        <div class="article-type" v-for="(item,index) in sameTypeArticles" :key="index+item.id" @click="toArticleInfo(item.id)">{{item.title}}</div>
                    </div>
                </v-card>
            </div>
            <div>
                <div class="display-1 text-center">{{ article.title }}</div>
                <div class="mt-12 d-flex justify-space-between">
                    <span>更新时间：<span>
                            {{  article.date.split(" ")[0] }}</span>
                    </span>
                    <span>阅读量：<span> {{ article.clicks }}</span>
                    </span>
                    <span>评论：<span>
                            {{
                                article.comment_count
                                    ? article.comment_count
                                    : 0
                            }}</span>
                    </span>
                </div>
                <v-divider class="mb-8"></v-divider>
                <div class="content">
                    <div class="text-justify" v-html="article.content_html" v-highlight></div>
                </div>
                <div style="height: 10rem; position: relative">
                    <div v-if="pre" style="position: absolute; top: 10%; left: 3%">
                        <v-btn fab :to="{path:'/blog',query:{id:pre.id}}" small>
                            <v-icon>mdi-skip-previous</v-icon>
                        </v-btn>
                        <span class="ml-4">{{ pre.title }}</span>
                    </div>
                    <div v-if="next" style="position: absolute; bottom: 10%; right: 3%">
                        <span class="mr-4">{{ next.title }}</span>
                        <v-btn fab :to="{path:'/blog',query:{id:next.id}}" small>
                            <v-icon>mdi-skip-next</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
            <!-- 留言 -->
            <div class="mt-12">
                <comment></comment>
            </div>
        </v-container>
    </div>
</template>

<script>
import Comment from "../../components/Comment";
import "highlight.js/styles/darcula.css";
import highlight from "../../plugins/highlight";
// import Pagination from "../../components/Pagination.vue";
export default {
    // async asyncData({ $axios, query }) {
    //     const article = await $axios.$get(`/articles/${query.id}`);
    //     const sameThemeArticles = await $axios.$get(
    //         `/articles/get/sametheme?theme=${article.data.theme}`
    //     );
    //     const sameTypeArticles = await $axios.$get(
    //         `/articles/get/sametype?type=${article.data.type}`
    //     );
    //     const nextPre = await $axios.$get(
    //         `/articles/get/nextpre?id=${query.id}`
    //     );
    //     let pre, next;
    //     if (article.data.id > nextPre.data[0].id && nextPre.data.length === 1) {
    //         pre = null;
    //         next = nextPre.data[0];
    //     } else if (
    //         article.data.id < nextPre.data[0].id &&
    //         nextPre.data.length === 1
    //     ) {
    //         pre = nextPre.data[0];
    //         next = null;
    //     } else {
    //         pre = nextPre.data[1];
    //         next = nextPre.data[0];
    //     }
    //     return {
    //         article: article.data,
    //         pre: pre,
    //         next: next,
    //         sameThemeArticles: sameThemeArticles.data,
    //         sameTypeArticles: sameTypeArticles.data,
    //     };
    // },
    data() {
        return {
            article: {
                date: "",
            },
            pre: {},
            next: {},
            sameThemeArticles: [],
            sameTypeArticles: [],
        };
    },
    directives: { highlight },
    methods: {
        async getArticle() {
            const article = await this.$axios.get(
                `/articles/${this.$route.query.id}`
            );
            this.article = article.data.data;
        },
        async getNextPre() {
            const nextPre = await this.$axios.get(
                `/articles/get/nextpre?id=${this.$route.query.id}`
            );
            let pre, next;
            if (
                this.article.id > nextPre.data.data[0].id &&
                nextPre.data.data.length === 1
            ) {
                pre = null;
                next = nextPre.data.data[0];
            } else if (
                this.article.id < nextPre.data.data[0].id &&
                nextPre.data.data.length === 1
            ) {
                pre = nextPre.data.data[0];
                next = null;
            } else {
                pre = nextPre.data.data[1];
                next = nextPre.data.data[0];
            }
            this.pre = pre;
            this.next = next;
        },
        async getSameThemeArticles() {
            const sameThemeArticles = await this.$axios.get(
                `/articles/get/sametheme?theme=${this.article.theme}&id=${this.$route.query.id}`
            );
            this.sameThemeArticles = sameThemeArticles.data.data;
        },
        async getSameTypeArticles() {
            const sameTypeArticles = await this.$axios.get(
                `/articles/get/sametype?type=${this.article.type}&id=${this.$route.query.id}`
            );
            this.sameTypeArticles = sameTypeArticles.data.data;
        },
        backHome() {
            this.$router.push({
                path: "/",
            });
        },
        /**
         * @description 跳转文章详情
         */
        toArticleInfo(id) {
            this.$router.push({
                path: `/blog`,
                query: {
                    id,
                },
            });
        },
    },
    // updated() {
    //     this.$route.query.id;
    // },
    components: {
        Comment,
    },
    watch: {
        async $route(to, from) {
            document.documentElement.scrollTop = 0;
            await this.getArticle();
            this.getNextPre();
            this.getSameThemeArticles();
            this.getSameTypeArticles();
        },
    },
    async mounted() {
        await this.getArticle();
        this.getNextPre();
        this.getSameThemeArticles();
        this.getSameTypeArticles();
    },
};
</script>

<style scoped lang='less'>
.blog {
    position: relative;
}
.blog .like {
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
}
.blog .content .text-justify {
    width: 100%;
    /deep/img {
        /* overflow: hidden; */
        height: auto;
        max-width: 100%;
        object-fit: contain;
    }
}
.blog .content {
    overflow: hidden;
}
.container {
    width: 60%;
    margin-top: 20px;
}
.container .theme-type {
    position: fixed;
    right: 2%;
    top: 10%;
    width: 15%;
}
.container .theme-type .v-card {
    padding: 20px;
}
.theme-type .article-theme {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #ccc;
    padding: 5px 0px;
    font-size: 14px;
    cursor: pointer;
    color: rgb(179, 136, 255);
    &:hover {
        color: rgb(82, 0, 226);
    }
}
.theme-type .article-type {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #ccc;
    padding: 5px 0px;
    font-size: 14px;
    cursor: pointer;
    color: rgb(76, 175, 80);
    &:hover {
        color: #009606;
    }
}
.mx-2 {
    position: fixed;
    left: 5%;
    top: 10%;
}
@media screen and (max-width: 980px) {
    .container {
        width: 100%;
    }
    .mx-2 {
        display: none;
    }
    .container .theme-type {
        display: none;
    }
}
</style>
