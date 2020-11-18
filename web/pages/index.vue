<template>
    <div class="home">
        <v-container fluid>
            <v-row class="mb-6">
                <!-- 右侧通知栏 -->
                <v-col class="d-none d-sm-none d-md-flex col-2">
                    <div style="position: relative; width: 100%">
                        <div style="width: 100%" ref="notice" class="notice">
                            <v-card class="mx-auto" width="100%">
                                <v-card-text>
                                    <div class="mb-4">最新公告</div>
                                    <div v-for="item in notices" :key="item.id">
                                        <p class="caption">
                                            <v-icon color="#B388FF" size="small" class="star">mdi-star</v-icon>
                                            {{ item.date.split(" ")[0] }}
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
                            <v-card hover link :to="`/blog/${item.id}`" class="my-6 pa-6 card-item">
                                <div class="theme">
                                    <v-chip class="mb-2" color="#7c4dff" label text-color="white" small>
                                        <v-icon left> mdi-label </v-icon>
                                        {{item.theme}}
                                    </v-chip>
                                </div>
                                <div class="type">
                                    <v-chip color="#4CAF50" label text-color="white" class="ml-1" x-small v-for="(type,i) in item.type" :key="i">
                                        {{type}}
                                    </v-chip>
                                </div>
                                <div class="subtitle-2 text-center">
                                    <v-icon class="mb-5 mx-4 quote">mdi-format-quote-open</v-icon>
                                    <span class="headline">{{
                                        item.title
                                    }}</span>
                                    <v-icon class="mb-5 mx-4 quote">mdi-format-quote-close</v-icon>
                                </div>
                                <v-card-text class="text--primary">
                                    <p class="subtitle font-weight-light">
                                        {{ item.content_html }}
                                    </p>
                                </v-card-text>
                                <div class="d-flex justify-space-around overline">
                                    <span>
                                        <v-icon class="mr-2">mdi-comment</v-icon>{{
                                            item.comment_count
                                                ? item.comment_count
                                                : 0
                                        }}
                                    </span>
                                    <span>
                                        <v-icon class="mr-2">mdi-eye</v-icon>{{ item.clicks }}
                                    </span>
                                    <span>
                                        <v-icon class="mr-2">mdi-clock</v-icon>{{ item.date.split(" ")[0] }}
                                    </span>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <!-- 右侧卡片 -->
                <v-col class="d-none d-sm-none d-md-flex col-2 ml-12">
                    <div style="position: relative; width: 100%">
                        <div ref="aboutme" class="about_me">
                            <v-card style="padding: 10px 20px">
                                <div class="my-4 subtitle-1">热门文章</div>
                                <div v-for="(item,index) in hotArticles" :key="index" class="article-name" @click="toArticleInfo(item.id)">
                                    <p>{{item.title}}</p>
                                    <span>
                                        <v-icon class="ml-3 mr-1">mdi-eye</v-icon>{{item.clicks}}
                                    </span>
                                </div>
                            </v-card>
                            <v-card style="padding: 10px 20px; marginTop: 20px" outlined>
                                <div class="my-4 subtitle-1">文章主题</div>
                                <div class="theme-type">
                                    <div class="theme-item" v-for="(item,index) in themes" :key="index" @click="chooseTheme(item.theme,index)" :class="{'theme-active':index===themeActive}">
                                        <span>{{item.theme||'全部'}}</span>
                                    </div>
                                </div>
                                <div class="my-4 subtitle-1">文章分类</div>
                                <div class="theme-type">
                                    <div class="type-item" v-for="(item,index) in types" :key="index" @click="chooseType(item.type,index)" :class="{'type-active':index===typeActive}">
                                        <span>{{item.type||'全部'}}</span>
                                    </div>
                                </div>
                            </v-card>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-pagination @input="changePage" v-model="pageInfo.page" :length="pageInfo.length"></v-pagination>
        </v-container>
    </div>
</template>

<script>
import notice from "../../admin/src/api/modules/notice";
import type from "../../admin/src/api/modules/type";
// import Pagination from "../components/Pagination.vue";
export default {
    async asyncData({ $axios }) {
        const notices = await $axios.$get("/notices");
        const themes = await $axios.$get("/themes");
        themes.data.unshift({ theme: "" });
        const types = await $axios.$get("/types");
        types.data.unshift({ type: "" });
        const hotArticles = await $axios.$get("/articles/get/hot");
        return {
            notices: notices.data,
            themes: themes.data,
            types: types.data,
            hotArticles: hotArticles.data,
        };
    },
    props: ["searchData"],
    data() {
        return {
            articlesData: [],
            // articles: "articles",
            timeout: null,
            // show: true,
            typeList: [],
            pageInfo: {
                page: 1,
                size: 10,
                // length:Math.ceil(total.data.length / 10)
                length: 0,
            },
            search: {
                theme: "",
                type: "",
            },
            themeActive: 0,
            typeActive: 0,
        };
    },
    computed: {
        searchParams() {
            const params = {
                page: this.pageInfo.page,
                size: this.pageInfo.size,
                titleContent: this.searchData,
                theme: this.search.theme,
                type: this.search.type,
            };
            return params;
        },
    },
    methods: {
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
        async getSearch() {
            const res = await this.$axios.get(
                `/articles/get/page?size=${this.searchParams.size}&page=${this.searchParams.page}&titleContent=${this.searchParams.titleContent}&theme=${this.searchParams.theme}&type=${this.searchParams.type}`
            );
            this.articlesData = res.data.data;
            this.articlesData.forEach((element) => {
                if (element.type) {
                    element.type = element.type.split(",");
                }
            });
            this.pageInfo.length = Math.ceil(
                res.data.count[0].article_count / this.pageInfo.size
            );
        },
        /**
         * @description 跳转文章详情
         */
        toArticleInfo(id) {
            this.$router.push({
                path: `/blog/${id}`,
            });
        },
        /**
         * @description 搜索同主题文章
         */
        async chooseTheme(theme, index) {
            this.search.theme = theme;
            this.themeActive = index;
            this.getSearch();
        },
        /**
         * @description 搜索同分类文章
         */
        async chooseType(type, index) {
            this.search.type = type;
            this.typeActive = index;
            this.getSearch();
        },
        /**
         * @description 分页
         */
        changePage(val) {
            this.getSearch();
        },
    },
    watch: {
        async searchData(newValue, oldValue) {
            clearTimeout(this.timeout);
            this.timeout = null;
            this.timeout = setTimeout(async () => {
                this.getSearch();
            }, 1000);
        },
        articlesData() {
            document.documentElement.scrollTop = 0;
        },
    },
    beforeDestroy() {
        clearTimeout(this.timeout);
        this.timeout = null;
        window.removeEventListener("scroll", this.toScoll);
    },
    mounted() {
        this.getSearch();
        window.addEventListener("scroll", this.toScoll);
    },
};
</script>

<style lang='less' scoped>
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
    .theme-item {
        padding: 0px 5px;
        border-radius: 10%;
        background: #7c4dff;
        border: 1px solid #7c4dff;
        color: #ffffff;
        cursor: pointer;
        margin: 5px 5px;
        &:hover {
            color: #7c4dff;
            background: #ffffff;
        }
        > span {
            font-size: 12px;
        }
    }
    .theme-active {
        color: #7c4dff !important;
        background: #ffffff !important;
    }
    .type-active {
        color: rgb(76, 175, 80) !important;
        background: #ffffff !important;
    }
    .type-item {
        padding: 0px 5px;
        border-radius: 10%;
        background: rgb(76, 175, 80);
        border: 1px solid rgb(76, 175, 80);
        color: #ffffff;
        cursor: pointer;
        margin: 5px 5px;
        &:hover {
            color: rgb(76, 175, 80);
            background: #ffffff;
        }
        > span {
            font-size: 12px;
        }
        .active {
            color: #7c4dff;
            background: #ffffff;
        }
    }
}
.card-item {
    position: relative;
}
.card-item .theme {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.card-item .type {
    position: absolute;
    right: 0;
    bottom: 0;
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
    .article-name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.7rem;
        > p {
            word-break: break-all;
            color: #666;
            font-size: 14px;
            margin: 0;
            cursor: pointer;
            &:hover {
                color: rgb(124, 77, 255);
            }
        }
        > span {
            font-size: 12px;
            color: #ccc;
            display: flex;
            align-items: center;
            .v-icon {
                font-size: 16px;
                color: #ccc;
            }
        }
    }
}
</style>
