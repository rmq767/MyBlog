<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" disable-route-watcher app color="deep-purple accent-1" temporary>
            <v-img :aspect-ratio="16 / 9" src="https://picsum.photos/800/800?random">
                <v-row align="end" class="lightbox white--text pa-2 fill-height">
                    <v-col>
                        <div class="subheading">小阮</div>
                        <div class="body-1">ruanmaoqi@qq.com</div>
                    </v-col>
                </v-row>
            </v-img>

            <v-list>
                <template>
                    <v-list-item link href="https://github.com/rmq767">
                        <v-list-item-action>
                            <v-icon>mdi-github</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>GitHub</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>mdi-qqchat</v-icon>
                        </v-list-item-action>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-list-item-title v-on="on">QQ</v-list-item-title>
                            </template>
                            <v-img v-if="info.qqQrCode" :src="info.qqQrCode" width="5rem" height="auto"></v-img>
                        </v-tooltip>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>mdi-wechat</v-icon>
                        </v-list-item-action>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-list-item-title v-on="on">微信</v-list-item-title>
                            </template>
                            <v-img v-if="info.wechatQrCode" :src="info.wechatQrCode" width="5rem" height="auto"></v-img>
                        </v-tooltip>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="deep-purple accent-1" dark height="52rem" src="https://picsum.photos/1280/800?random">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
                <span class="hidden-sm-and-down">小阮的个人博客</span>
            </v-toolbar-title>
            <v-spacer />
            <v-text-field flat solo-inverted v-model="searchData" hide-details prepend-inner-icon="mdi-magnify" label="Search" class="hidden-sm-and-down" />
        </v-app-bar>

        <v-content>
            <nuxt-child :searchData="searchData"></nuxt-child>
        </v-content>
        <div style="position:fixed;bottom:8%;right:1%;" @click="$vuetify.goTo(-9999)">
            <v-btn fab small dark color="#B388FF">
                <v-icon dark>mdi-arrow-up</v-icon>
            </v-btn>
        </div>
        <v-bottom-navigation color="deep-purple accent-1" fixed shift height="3rem">
            <v-btn append link to="/">
                <span>我的文章</span>
                <v-icon>mdi-book</v-icon>
            </v-btn>
            <v-btn append link to="/message">
                <span>留言板</span>
                <v-icon>mdi-file-document-edit</v-icon>
            </v-btn>
            <v-btn append link to="/link">
                <span>学习链接</span>
                <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            <v-btn append link to="/project">
                <span>项目分享</span>
                <v-icon>mdi-tools</v-icon>
            </v-btn>
            <v-btn append link to="/about">
                <span>关于我</span>
                <v-icon>mdi-face</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script>
export default {
    props: {
        source: String,
    },
    data: () => ({
        drawer: "",
        searchData: "",
        info: {},
    }),
    watch: {
        searchData(newValue, oldValue) {
            this.searchData = newValue;
        },
    },
    methods: {
        async count() {
            await this.$axios.get("/statistics");
        },
        async getInfo() {
            const response = await this.$axios.get("/informations");
            this.info = response.data.data;
            localStorage.setItem("myInfo", JSON.stringify(this.info));
        },
    },
    mounted() {
        this.count();
        this.getInfo();
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
    components: {},
};
</script>

<style>
#inspire {
    background-color: #fafafa;
    margin-bottom: 3rem;
    height: 100%;
}
.v-application code {
    background-color: transparent !important;
    font-size: 100% !important;
    font-weight: normal !important;
    display: block !important;
    color: #a776ff !important;
}
</style>
