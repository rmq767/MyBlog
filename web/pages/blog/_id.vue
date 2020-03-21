<template>
  <div class="blog">
    <v-container>
      <div>
        <div class="display-1 text-center">{{ article.title }}</div>
        <div style="position:relative;">
          <div @click="isLike" class="like d-md-flex d-none">
            <v-icon style="font-size:3rem" v-if="notLike"
              >mdi-heart-outline</v-icon
            >
            <v-icon style="font-size:3rem" v-else color="red">mdi-heart</v-icon>
          </div>
        </div>
        <div class="mt-12 d-flex justify-space-between">
          <span
            >发布时间 ：<span> {{ article.date.split("T")[0] }}</span>
          </span>
          <span
            >点击阅读量 ：<span> {{ article.clicks }}</span>
          </span>
        </div>
        <v-divider class="mb-8"></v-divider>
        <div class="content">
          <div class="text-justify" v-html="article.content"></div>
        </div>
        <div style="height:10rem;position:relative;">
          <div v-if="pre" style="position:absolute;bottom:-3%;left:3%;">
            <v-btn fab :to="`/blog/${pre.id}`">
              <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <span class="ml-4">{{ pre.title }}</span>
          </div>
          <div v-if="next" style="position:absolute;bottom:-3%;right:3%;">
            <span class="mr-4">{{ next.title }}</span>
            <v-btn fab :to="`/blog/${next.id}`">
              <v-icon>mdi-skip-next</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <!-- 留言 -->
      <div class="mt-12">
        <comment type="comments"></comment>
      </div>
      <!-- <pagination
        type="comments"
        :article_id="id"
        @getPagination="getPagination"
      ></pagination> -->
    </v-container>
  </div>
</template>

<script>
import Comment from "../../components/Comment";
// import Pagination from "../../components/Pagination.vue";
export default {
  async asyncData({ $axios, params }) {
    const article = await $axios.$get(`/articles/${params.id}`);
    const pre = await $axios.$get(`/articles/get/pre?id=${params.id}`);
    const next = await $axios.$get(`/articles/get/next?id=${params.id}`);
    return {
      article,
      pre,
      next
    };
  },
  data() {
    return {
      notLike: true
      // comments: [],
      // id: this.$route.params.id
    };
  },
  methods: {
    isLike() {
      this.notLike = !this.notLike;
    }
    // getPagination(val) {
    //   this.comments = val;
    // }
  },
  updated() {
    this.$route.params.id;
  },
  components: {
    Comment
    // Pagination
  }
};
</script>

<style>
.blog .like {
  position: absolute;
  top: 2%;
  right: 2%;
  cursor: pointer;
}
.blog .content img {
  /* overflow: hidden; */
  height: auto;
  max-width: 60rem;
}
.blog .content {
  overflow: hidden;
}
</style>
