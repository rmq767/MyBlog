<template>
    <div class="link-container">
        <v-card flat style="background:transparent">
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
            <v-container v-for="(item,index) in linkList" :key="index" fluid>
                <v-subheader>{{ item.type }}</v-subheader>
                <v-row>
                    <v-col v-for="link in item.links" :key="link.name" cols="12" sm="6" md="4" lg='3' xl='2'>
                        <v-hover v-slot="{ hover }">
                            <v-card outlined shaped :class="{ 'on-hover': hover }" :elevation="hover ? 12 : 2" class="card-diy">
                                <v-img :src=" link.image" :aspect-ratio="1/1" height='200'>
                                </v-img>
                                <v-card-title>{{link.title}}</v-card-title>
                                <v-card-text>
                                    <p>{{link.description}}</p>
                                </v-card-text>
                                <v-card-actions class="white justify-center">
                                    <v-btn v-for="(social, i) in socials" :key="i" :color="social.color" class="white--text" fab icon small :href='link.link'>
                                        <v-icon>{{ social.icon }}</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import link from "../../../admin/src/api/modules/link";
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
            linkList: [],
        };
    },
    methods: {
        async getLinks() {
            const res = await this.$axios.get("/links");
            let typeArr = [];
            let data = [];
            res.data.data.forEach((item) => {
                typeArr.unshift(item.type);
            });
            typeArr = [...new Set(typeArr)];
            typeArr.forEach((item, index) => {
                let arr = [];
                res.data.data.forEach((item1) => {
                    if (item === item1.type) {
                        arr.unshift(item1);
                    }
                });
                data[index] = {
                    type: item,
                    links: arr,
                };
            });
            this.linkList = data;
        },
    },
    mounted() {
        this.getLinks();
    },
};
</script>

<style lang='less' scoped>
.card-diy {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.link-container {
    padding: 0rem 3rem;
    background: linear-gradient(#ccfbff, #ef96c5);
}
@media screen and (max-width: 980px) {
    .link-container {
        padding: 0rem;
    }
}
</style>