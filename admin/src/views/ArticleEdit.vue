<template>
  <div>
    <h3>{{ id ? "编辑" : "新建" }}文章</h3>
    <el-form label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <div class="edit_container">
          <mavon-editor v-model="article.content" :ishljs="true" ref="md" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save()">立即保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      article: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/articles/${this.id}`, this.article);
      } else {
        await this.$http.post("/articles", this.article);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/article/list");
    },
    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.article = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style></style>
