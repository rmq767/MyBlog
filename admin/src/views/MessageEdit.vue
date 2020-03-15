<template>
  <div>
    <h3>{{ id ? "编辑" : "新建" }}留言</h3>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
      style="width:45rem;"
    >
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="showAvatar"
          :headers="mixGetAuthHeaders()"
        >
          <img v-if="message.avatar" :src="message.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="message.name"></el-input>
      </el-form-item>
      <el-form-item label="评论">
        <el-input
          v-model="message.message"
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
      message: {
        avatar: ""
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/messages/${this.id}`, this.message);
      } else {
        await this.$http.post("/messages", this.message);
      }
      this.$router.push("/message/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    showAvatar(val) {
      this.message.avatar = val.url;
    },
    async fetch() {
      const res = await this.$http.get(`/messages/${this.id}`);
      this.message = res.data;
      this.message = Object.assign({}, this.message, res.data); //把 this.message{}中，再把res.data添加到{}中，如果有覆盖，没有保存
    }
  },
  created() {
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
