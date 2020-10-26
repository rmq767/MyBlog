<template>
    <div class="home">
        <v-container fluid>
            <v-row class="mb-6">
                <!-- 右侧通知栏 -->
                <v-col class="d-none d-sm-none d-md-flex col-2">
                    <div style="position:relative; width:100%;">
                        <div style="width:100%;" ref="notice" class="notice">
                            <v-card class="mx-auto" width="100%">
                                <v-card-text>
                                    <div class="mb-4">最新公告</div>
                                    <div v-for="item in notices" :key="item.id">
                                        <p class="caption">
                                            <v-icon color="#B388FF" size="small" class="star">mdi-star</v-icon>
                                            {{ item.date.split("T")[0] }}
                                        </p>
                                        <div class="text--primary mb-4 body-2">
                                            {{ item.notice }}
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </div>
                    </div>
                </v-col>
                <!-- 正文 -->
                <v-col class="col-xs-12 col-md-6 offset-md-1">
                    <v-row dense>
                        <v-col v-for="(item, i) in articlesData" :key="i" cols="12">
                            <v-card hover link :to="`/blog/${item.id}`" class="my-6 pa-6">
                                <div class="subtitle-2 text-center">
                                    <v-icon class="mb-5 mx-4 quote ">mdi-format-quote-open</v-icon>
                                    <span class="headline">{{ item.title }}</span>
                                    <v-icon class="mb-5 mx-4 quote">mdi-format-quote-close</v-icon>
                                </div>
                                <v-card-text class="text--primary">
                                    <p class="subtitle font-weight-light">
                                        {{ item.content_html }}
                                    </p>
                                </v-card-text>
                                <div class="d-flex justify-space-around overline">
                                    <span>
                                        <v-icon class="mr-2">mdi-comment</v-icon>{{ item.comment_count ? item.comment_count : 0 }}
                                    </span>
                                    <span>
                                        <v-icon class="mr-2">mdi-eye</v-icon>{{ item.clicks }}
                                    </span>
                                    <span>
                                        <v-icon class="mr-2">mdi-clock</v-icon>{{ item.date.split("T")[0] }}
                                    </span>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <!-- 右侧卡片 -->
                <v-col class="d-none d-sm-none d-md-flex col-2 ml-12">
                    <div style="position:relative;width:100%;">
                        <div ref="aboutme" class="about_me">
                            <v-card class="pa-2" outlined>
                                <v-list-item>
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-list-item-avatar color="grey">
                                                <img src="/dog.jpg" alt="" v-on="on" />
                                            </v-list-item-avatar>
                                        </template>
                                        <span>哼！</span>
                                    </v-tooltip>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">小阮</v-list-item-title>
                                        <v-list-item-subtitle>前端工程师</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-card-text>
                                    欢迎来到我的博客，只要我写的够烂，bug就追不上我
                                </v-card-text>
                            </v-card>
                            <v-card style="padding:10px 20px;marginTop:20px">
                                <div class="my-4 subtitle-1">文章主题</div>
                                <div class="theme-type">
                                    <v-btn class="ma-2" color="secondary" rounded v-for="item in 5" :key="item">
                                        Green12
                                    </v-btn>
                                </div>
                                <div class="my-4 subtitle-1">文章分类</div>
                                <div class="theme-type">
                                    <v-btn class="ma-2" color="green" rounded>
                                        Green123
                                    </v-btn>
                                </div>
                            </v-card>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <pagination :type="articles" @getPagination="getPagination" v-if="!searchData"></pagination>
        </v-container>
    </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
export default {
    async asyncData({ $axios }) {
        const notices = await $axios.$get("/notices");
        return {
            notices,
        };
    },
    props: ["searchData"],
    data() {
        return {
            articlesData: [],
            articles: "articles",
            timeout: null,
        };
    },
    methods: {
        getPagination(val) {
            this.articlesData = val;
        },
        toScoll() {
            //向下滑动动画
            let notice = this.$refs.notice;
            let aboutme = this.$refs.aboutme;
            let long = document.documentElement.scrollTop; //获取滚动条位置
            if (long > 50) {
                notice.style.top = long + "px";
                aboutme.style.top = long + "px";
            } else {
                notice.style.top = "0px";
                aboutme.style.top = "0px";
            }
        },
        async getSearch(newValue) {
            const res = await this.$axios.post("/articles/get/search", {
                search: newValue,
            });
            this.articlesData = res.data;
        },
    },
    components: {
        Pagination,
    },
    watch: {
        async searchData(newValue, oldValue) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.getSearch(newValue);
            }, 1000);
        },
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.toScoll);
    },
    mounted() {
        window.addEventListener("scroll", this.toScoll);
        console.log(
            "%c%s",
            "color: red; background: yellow; font-size: 12px;",
            "欢迎来到小阮的个人博客"
        );
        console.log(
            "%c%s",
            "color: red; background: yellow; font-size: 12px;",
            "大佬不要乱搞，磕头了，砰砰砰~"
        );
    },
};
</script>

<style scoped>
.home {
    position: relative;
    height: 100%;
    /* background: url("/pen.jpg");
  background-size: cover;
  background-attachment: fixed; */
}
.subtitle {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.quote {
    animation: shake 3s ease infinite;
}
.theme-type {
    display: flex;
    flex-wrap: wrap;
}
@keyframes shake {
    0%,
    100% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transform-origin: 50% 0;
        transform-origin: 50% 0;
    }
    5% {
        -webkit-transform: rotate(2deg);
        transform: rotate(2deg);
    }
    10%,
    20%,
    30% {
        -webkit-transform: rotate(-8deg);
        transform: rotate(-8deg);
    }
    15%,
    25%,
    35% {
        -webkit-transform: rotate(12deg);
        transform: rotate(12deg);
    }
    40% {
        -webkit-transform: rotate(-2deg);
        transform: rotate(-2deg);
    }
    45% {
        -webkit-transform: rotate(2deg);
        transform: rotate(2deg);
    }
    50% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
}
.home .star {
    animation: star 1s ease-in-out infinite;
}
@keyframes star {
    0% {
        transform: scale(1.2, 1.2);
    }
    50% {
        transform: scale(0.8, 0.8);
    }
    100% {
        transform: scale(1.2, 1.2);
    }
}
.home .notice {
    position: absolute;
    transition: all 0.3s ease-in-out;
}
.home .about_me {
    position: absolute;
    transition: all 0.3s ease-in-out;
}
</style>
