<template>
    <div>
        <h3>评论列表</h3>
        <el-form :model="form" ref="form" label-width="80px" inline style="float:right">
            <el-form-item label="">
                <el-input v-model="form.search"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table style="width: 100%" :data="comments">
            <el-table-column label="昵称" align="center" :show-overflow-tooltip="true" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评论" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.comment }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评论的文章" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="$router.push(`/comment/edit/${scope.row.id}`)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count" style="float:right" :hide-on-single-page="hide">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            comments: [],
            currentPage: 1,
            pageSizes: [10, 15, 20],
            pageSize: 10,
            count: 10,
            form: {
                search: "",
            },
            hide: false,
        };
    },
    methods: {
        async fetch() {
            const res = await this.$http.get("/comments");
            this.count = res.data.length;
            this.comments = res.data.slice(0, this.pageSize);
        },
        async remove(row) {
            this.$confirm(`确定删除评论?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    await this.$http.delete(`/comments/${row.id}`);
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    this.fetch();
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        async handleSizeChange(val) {
            this.pageSize = val;
            const res = await this.$http.get(
                `/comments/get/page?pageSize=${this.pageSize}&currentPage=${this.currentPage}`
            );
            this.comments = res.data;
        },
        async handleCurrentChange(val) {
            this.currentPage = val;
            const res = await this.$http.get(
                `/comments/get/page?pageSize=${this.pageSize}&currentPage=${this.currentPage}`
            );
            this.comments = res.data;
        },
        async search() {
            const res = await this.$http.post(
                "/comments/get/search",
                this.form
            );
            this.comments = res.data;
            this.count = res.data.length;
            this.pageSize = res.data.length;
            this.hide = true;
        },
    },
    created() {
        this.fetch();
    },
};
</script>
<style scoped>
.el-tooltip__popper {
    display: none;
}
</style>
