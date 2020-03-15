<template>
  <div>
    <div class="block" style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="num"
        :hide-on-single-page="hide"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "pageCount"],
  data() {
    return {
      tableData: [],
      num: 0,
      pageSize: 5,
      numSkip: 1,
      currentPage: 1,
      pageSizes: [5, 10, 15, 20],
      hide: false
    };
  },
  methods: {
    async handleSizeChange(val) {
      this.pageSize = val;
      const res = await this.$http.get(`/page/${this.type}`, {
        params: {
          skipPage: this.numSkip,
          number: this.pageSize
        }
      });
      this.tableData = res.data;
      await this.$emit("getPage", this.tableData);
    },
    async handleCurrentChange(val) {
      this.numSkip = val;
      const res = await this.$http.get(`/page/${this.type}`, {
        params: {
          skipPage: this.numSkip,
          number: this.pageSize
        }
      });
      this.tableData = res.data;
      await this.$emit("getPage", this.tableData);
    },
    async fetch() {
      const count = await this.$http.get(`/rest/${this.type}/count`);
      this.num = count.data;
      const res = await this.$http.get(`/page/${this.type}`, {
        params: {
          skipPage: this.numSkip,
          number: this.pageSize
        }
      });
      this.tableData = res.data;
      await this.$emit("getPage", this.tableData);
    }
  },
  mounted() {
    this.fetch();
  },
  watch: {
    pageCount(val) {
      this.num = val;
      this.pageSize = val;
      this.pageSizes = [val];
      this.hide = true;
    }
  }
};
</script>

<style></style>
