<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      bottom
      disable-route-watcher
      app
      color="deep-purple accent-1"
    >
      <v-img
        :aspect-ratio="16 / 9"
        src="https://picsum.photos/1920/1080?random"
      >
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
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-list-item-title v-on="on">{{
                  item.title
                }}</v-list-item-title>
              </template>
              <v-img :src="item.image" width="5rem" height="auto"></v-img>
            </v-tooltip>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="deep-purple accent-1"
      hide-on-scroll
      dark
      height="54rem"
      src="https://picsum.photos/1920/1080?random"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">小阮的个人博客</span>
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        flat
        solo-inverted
        v-model="searchData"
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
    </v-app-bar>

    <v-content>
      <nuxt-child :searchData="searchData"></nuxt-child>
    </v-content>
    <div
      style="position:fixed;bottom:8%;right:3%;"
      @click="$vuetify.goTo(-9999)"
    >
      <v-btn fab large color="#B388FF">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </div>
    <v-bottom-navigation
      grow
      color="deep-purple accent-1"
      fixed
      shift
      height="3rem"
    >
      <v-btn append link to="/">
        <span>我的文章</span>
        <v-icon>mdi-book</v-icon>
      </v-btn>
      <v-btn append link to="/message">
        <span>留言板</span>
        <v-icon>mdi-file-document-edit</v-icon>
      </v-btn>
      <v-btn append link to="/link">
        <span>友情链接</span>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <v-btn append link to="/life">
        <span>我的生活</span>
        <v-icon>mdi-pinwheel</v-icon>
      </v-btn>
      <v-btn append link to="/about">
        <span>Nearby</span>
        <v-icon>mdi-face</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: "",
    items: [
      {
        icon: "mdi-qqchat",
        title: "QQ",
        image: "/qq.jpg"
      },
      {
        icon: "mdi-wechat",
        title: "微信",
        image: "/wechat.png"
      }
    ],
    searchData: ""
  }),
  watch: {
    searchData(newValue, oldValue) {
      this.searchData = newValue;
    }
  }
};
</script>

<style>
#inspire {
  background-color: #fafafa;
  margin-bottom: 3rem;
  height: 100%;
}
</style>
