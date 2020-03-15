<template>
  <div>
    <h3>{{ id ? "编辑" : "新建" }}信息</h3>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
      style="width:45rem;"
    >
      <el-form-item label="我的留言">
        <el-input v-model="information.my_message"></el-input>
      </el-form-item>
      <el-form-item label="我的信息">
        <el-input v-model="information.my_info"></el-input>
      </el-form-item>
      <el-form-item label="我的希望">
        <el-input v-model="information.my_hope"></el-input>
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
      information: {}
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/informations/${this.id}`, this.information);
      } else {
        await this.$http.post("/informations", this.information);
      }
      this.$router.push("/information/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`/informations/${this.id}`);
      this.information = res.data;
      this.information = Object.assign({}, this.information, res.data); //把 this.information{}中，再把res.data添加到{}中，如果有覆盖，没有保存
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
