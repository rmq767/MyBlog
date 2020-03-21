<template>
  <div class="comment">
    <v-container style="backgroundColor:rgba(245,245,245,0.7)">
      <h3>留言区</h3>
      <div>
        <v-form>
          <v-textarea
            v-model="form.message"
            label="请输入留言（240字以内）"
            :counter="240"
            required
          ></v-textarea>
          <v-text-field
            v-model="form.name"
            :counter="10"
            label="昵称"
            required
          ></v-text-field>
          <v-btn class="mr-4" @click="submit" large>提交</v-btn>
        </v-form>
      </div>
      <h3 class="mt-12">评论区</h3>
      <div>
        <v-list three-line>
          <template v-for="(item, i) in listData">
            <v-list-item :key="item.id" style="border-bottom:1px solid #ccc">
              <v-list-item-avatar>
                <v-img src="/user.jpg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-html="item.name"
                  class="font-weight-black"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="type == 'comments' ? item.comment : item.message"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <div class="handleReply">
                <span
                  @click="
                    sheet = !sheet;
                    comment_id = item.id;
                    index = i;
                  "
                  class="reply"
                  >回复</span
                >
                <div class="reply mt-4 overline" @click="loadReply(item.id, i)">
                  <v-icon size="medium">mdi-message-processing</v-icon>
                  <span>123</span>
                </div>
              </div>
            </v-list-item>
            <div v-if="index == i" :key="i" class="px-12">
              <template v-for="item in commentReply">
                <v-list-item
                  :key="item.id"
                  style="border-bottom:1px solid #ccc"
                >
                  <v-list-item-avatar>
                    <v-img src="/user.jpg"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-html="item.name"
                      class="font-weight-black"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="type == 'comments' ? item.c_reply : item.m_reply"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </div>
          </template>
        </v-list>
      </div>
      <div>
        <v-bottom-sheet v-model="sheet" inset>
          <v-sheet class="text-center" height="18rem">
            <div class="px-2 mt-2">
              <v-form>
                <v-textarea
                  v-model="reply.message"
                  label="请输入留言（240字以内）"
                  :counter="240"
                  required
                ></v-textarea>
                <v-text-field
                  v-model="reply.name"
                  :counter="10"
                  label="昵称"
                  required
                ></v-text-field>
                <v-btn class="mr-4" @click="submitReply" large>提交</v-btn>
              </v-form>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </div>
    </v-container>
    <pagination type="comments" @getPagination="getPagination"></pagination>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
export default {
  props: ["type", "article_id"],
  data() {
    return {
      form: {},
      reply: {},
      listData: [],
      sheet: false,
      commentReply: [],
      index: 1,
      comment_id: "",
      a_id: this.$route.params.id
    };
  },
  methods: {
    async submit() {
      if (this.type == "comments") {
        await this.$axios.post("/comments", {
          name: this.form.name,
          comment: this.form.message,
          article_id: this.a_id
        });
      }
      this.form = {};
      this.fetch();
    },
    async submitReply() {
      if (this.type == "comments") {
        await this.$axios.post(`/commentreply`, {
          name: this.reply.name,
          c_reply: this.reply.message,
          comment_id: this.comment_id
        });
      }
      this.sheet = false;
      this.loadReply(this.comment_id, this.index);
    },
    async fetch() {
      if (this.type == "comments") {
        const res = await this.$axios.get(
          `/comments/get/page?pageSize=${10}&currentPage=${1}&article_id=${
            this.a_id
          }`
        );
        this.listData = res.data;
      } else {
        // const res = await this.$axios.get(`/messages`);
        // this.listData = res.data;
        console.log(111);
      }
    },
    async loadReply(id, i) {
      const res = await this.$axios.get(`/commentreply?comment_id=${id}`);
      this.commentReply = res.data;
      this.index = i;
    },
    getPagination(val) {
      this.listData = val;
    }
  },
  created() {
    this.fetch();
  },
  watch: {
    type(newValue) {
      this.type = newValue;
      this.fetch();
    },
    $route(to, from) {
      this.a_id = to.params.id;
      this.fetch();
    }
  },
  components: {
    Pagination
  }
};
</script>

<style scoped>
.comment .reply:hover {
  color: #b388ff !important;
  border-bottom: 1px solid #b388ff;
  cursor: pointer;
}
</style>
