<template>
    <div>
        <h3>评论列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="commentForm" label-width="80px" inline style="width:100%">
                <el-form-item label="昵称：" prop='nickname'>
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="评论：" prop='comment'>
                    <el-input v-model="form.comment"></el-input>
                </el-form-item>
                <el-form-item label="文章：" prop='article'>
                    <el-select v-model="form.article" placeholder="请选择评论的文章">
                        <el-option v-for="item in articleOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=' '>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('commentForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
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
                nickname: "",
                comment: "",
                article: 0,
            },
            articleOptions: [
                {
                    value: "选项1",
                    label: "黄金糕",
                },
                {
                    value: "选项2",
                    label: "双皮奶",
                },
                {
                    value: "选项3",
                    label: "蚵仔煎",
                },
                {
                    value: "选项4",
                    label: "龙须面",
                },
                {
                    value: "选项5",
                    label: "北京烤鸭",
                },
            ],
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
        /**
         * @description 重置表单
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
    created() {
        this.fetch();
    },
};
</script>
<style lang='less' scoped>
.el-tooltip__popper {
    display: none;
}
.header-form {
    min-height: 100px;
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 20px 10px 0px;
}
/deep/.el-form-item {
    &:last-of-type {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
