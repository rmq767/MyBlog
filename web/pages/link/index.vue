<template>
    <div class="link-container">
        <v-card flat>
            <v-container v-for="type in types" :key="type" class="grey lighten-4" fluid>
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
            </v-container>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            types: ["初级", "中级", "高级", "进阶", "其他"],
            cards: ["Good", "Best", "Finest", "aaa"],
            socials: [
                {
                    icon: "mdi-share",
                    color: "indigo",
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