<template>
    <div class="link-container">
        <v-card flat style="background:transparent">
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
export default {
    data() {
        return {
            overlay: false,
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