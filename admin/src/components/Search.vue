<template>
  <div>
    <el-form inline style="float:right">
      <el-form-item>
        <el-input v-model="model"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: ""
    };
  },
  methods: {
    async search() {
      if (!this.model) {
        this.$message.error("你想搜空气吗？");
        return;
      }
      await this.$emit("search", this.model);
    }
  }
};
</script>
