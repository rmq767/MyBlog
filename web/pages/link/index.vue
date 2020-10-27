<template>
    <div class="link-container">
        <v-card flat>
            <!-- <v-container v-for="type in types" :key="type" class="grey lighten-4" fluid>
                <v-subheader>{{ type }}</v-subheader>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col v-for="card in cards" :key="card" cols="12" sm="6" md="4" lg='3'>
                        <v-card outlined shaped>
                            <v-img :src="`https://picsum.photos/200/200?image=${getImage()}`" height="200px">
                                <span class="headline white--text pl-4 pt-4 d-inline-block" v-text="card"></span>
                            </v-img>
                            <v-card-text>
                                <p>123</p>
                            </v-card-text>
                            <v-card-actions class="white justify-center">
                                <v-btn v-for="(social, i) in socials" :key="i" :color="social.color" class="white--text" fab icon small>
                                    <v-icon>{{ social.icon }}</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container> -->
            <v-container v-for="(item,index) in linkList" :key="index" class="grey lighten-4" fluid>
                <v-subheader>{{ item.type }}</v-subheader>
                <v-row>
                    <v-col v-for="link in item.links" :key="link.name" cols="12" sm="4" md="3" lg='2'>
                        <v-card outlined shaped>
                            <v-img :src="link.img" :aspect-ratio="1/1" height='200'></v-img>
                            <v-card-title>{{link.name}}</v-card-title>
                            <v-card-text>
                                <p>{{link.desc}}</p>
                            </v-card-text>
                            <v-card-actions class="white justify-center">
                                <v-btn v-for="(social, i) in socials" :key="i" :color="social.color" class="white--text" fab icon small :href='link.link'>
                                    <v-icon>{{ social.icon }}</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            overlay: false,
            types: ["初级", "中级", "高级", "进阶", "其他"],
            cards: ["Good", "Best", "Finest", "aaa"],
            socials: [
                {
                    icon: "mdi-share",
                    color: "indigo",
                },
            ],
            linkList: [
                {
                    type: "初级",
                    links: [
                        {
                            name: "HTML",
                            link: "https://baidu.com/",
                            desc: "haha",
                            img: "/html.png",
                        },
                        {
                            name: "CSS",
                            link: "123",
                            desc: "haha",
                            img: "/css.png",
                        },
                        {
                            name: "JavaScipt",
                            link: "https://baidu.com/",
                            desc: "haha",
                            img: "/js.png",
                        },
                        {
                            name: "jQuery",
                            link: "123",
                            desc: "haha",
                            img: "/jQuery.png",
                        },
                    ],
                },
                {
                    type: "中级",
                    links: [
                        {
                            name: "ES6",
                            link: "123",
                            desc: "haha",
                            img: "/es6.png",
                        },
                        {
                            name: "Bootstrap",
                            link: "123",
                            desc: "haha",
                            img: "/bootstrap.png",
                        },
                        {
                            name: "Vue",
                            link: "123",
                            desc: "haha",
                            img: "/Vue.png",
                        },
                        {
                            name: "React",
                            link: "123",
                            desc: "haha",
                            img: "/react.png",
                        },
                    ],
                },
                {
                    type: "高级",
                    links: [
                        {
                            name: "Node",
                            link: "123",
                            desc: "haha",
                            img: "/Nodejs.png",
                        },
                        {
                            name: "Git",
                            link: "123",
                            desc: "haha",
                            img: "/GIT.png",
                        },
                        {
                            name: "MongoDB",
                            link: "123",
                            desc: "haha",
                            img: "/mongo.png",
                        },
                        {
                            name: "Webpack",
                            link: "123",
                            desc: "haha",
                            img: "/Webpack.png",
                        },
                    ],
                },
                {
                    type: "其他",
                    links: [
                        {
                            name: "Flutter",
                            link: "123",
                            desc: "haha",
                            img: "/flutter.png",
                        },
                        {
                            name: "Sass",
                            link: "123",
                            desc: "haha",
                            img: "/sass.png",
                        },
                        {
                            name: "Less",
                            link: "123",
                            desc: "haha",
                            img: "/less.png",
                        },
                        {
                            name: "TypeScript",
                            link: "123",
                            desc: "haha",
                            img: "/typescript.png",
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        getImage() {
            const min = 550;
            const max = 560;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
    },
};
</script>

<style scoped>
</style>