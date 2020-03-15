<template>
  <div>
    <h3>{{ id ? "编辑" : "新建" }}评论</h3>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
      style="width:45rem;"
    >
      <el-form-item label="评论的文章">
        <el-select v-model="comment.article_id" filterable placeholder="请选择">
          <el-option
            v-for="item in articles"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="comment.name"></el-input>
      </el-form-item>
      <el-form-item label="评论">
        <el-input
          v-model="comment.comment"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 6 }"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
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
      comment: {},
      articles: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/comments/${this.id}`, this.comment);
      } else {
        await this.$http.post("/comments", this.comment);
      }
      this.$router.push("/comment/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`/comments/${this.id}`);
      this.comment = res.data;
      this.comment = Object.assign({}, this.comment, res.data); //把 this.comment{}中，再把res.data添加到{}中，如果有覆盖，没有保存
    },
    async fetchArticle() {
      let res = await this.$http.get(`/articles`);
      this.articles = res.data;
    }
  },
  created() {
    this.fetchArticle();
    this.id && this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 8rem;
  height: 8rem;
  line-height: 8rem;
  text-align: center;
}
.avatar {
  width: 8rem;
  height: 8rem;
  display: block;
}
</style>
