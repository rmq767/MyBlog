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
            <v-col v-for="(item, i) in articles" :key="i" cols="12">
              <v-card hover link :to="`/blog/${item.id}`" class="my-6 pa-6">
                <div class="subtitle-2 text-center">
                  <v-icon class="mb-5 mx-4 quote "
                    >mdi-format-quote-open</v-icon
                  >
                  <span class="headline">{{ item.title }}</span>
                  <v-icon class="mb-5 mx-4 quote"
                    >mdi-format-quote-close</v-icon
                  >
                </div>
                <v-card-text class="text--primary">
                  <p class="subtitle font-weight-light">
                    {{ item.content }}
                  </p>
                </v-card-text>
                <div class="d-flex justify-space-around overline">
                  <span
                    ><v-icon class="mr-2">mdi-comment</v-icon
                    >{{ item.comment_count ? item.comment_count : 0 }}</span
                  >
                  <span
                    ><v-icon class="mr-2">mdi-eye</v-icon
                    >{{ item.clicks }}</span
                  >
                  <span
                    ><v-icon class="mr-2">mdi-clock</v-icon
                    >{{ item.date.split("T")[0] }}</span
                  >
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
                <v-list-item-avatar color="grey">
                  <img src="/dog.jpg" alt="" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline">小阮</v-list-item-title>
                  <v-list-item-subtitle>bug工程师</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-text>
                欢迎来到我的bug博客，只要我写的够烂，bug就追不上我
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <pagination
        type="articles"
        @getPagination="getPagination"
        v-if="!searchData"
      ></pagination>
    </v-container>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
export default {
  props: ["searchData"],
  data() {
    return {
      articles: []
    };
  },
  methods: {
    getPagination(val) {
      this.articles = val;
    }
  },
  components: {
    Pagination
  },
  watch: {
    async searchData(newValue, oldValue) {
      const res = await this.$axios.post("/articles/get/search", {
        search: newValue
      });
      this.articles = res.data;
    }
  }
};
</script>

<style scoped>
.home {
  position: relative;
  height: 100%;
  background: url("/pen.jpg");
  background-size: cover;
  background-attachment: fixed;
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
</style>
