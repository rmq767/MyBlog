<template>
  <div class="home">
    <v-container fluid>
      <v-row class="mb-6">
        <!-- 右侧通知栏 -->
        <v-col class="d-none d-sm-none d-md-flex col-2">
          <div>
            <v-expansion-panels focusable>
              <v-expansion-panel v-for="(item, i) in 5" :key="i">
                <v-expansion-panel-header>Item</v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
        <!-- 正文 -->
        <v-col class="col-xs-12 col-md-6 offset-md-1">
          <v-row dense>
            <v-col v-for="(item, i) in items" :key="i" cols="12">
              <v-card :color="item.color" dark>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="headline"
                      v-text="item.title"
                    ></v-card-title>

                    <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.src"></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <!-- 右侧卡片 -->
        <v-col class="d-none d-sm-none d-md-flex col-2 ml-12">
          <div>
            <v-card class="pa-2" outlined max-width="16rem">
              <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline">小阮</v-list-item-title>
                  <v-list-item-subtitle>by vue+node</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-card-text>
                Visit ten places on our planet that are undergoing the biggest
                changes today.
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          color: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          artist: "Foster the People"
        },
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          artist: "Ellie Goulding"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
.home {
  height: 100%;
  background: url("/pen.jpg");
  background-size: cover;
}
</style>
