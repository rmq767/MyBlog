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
                <el-form-item label="文章：" prop='article_id'>
                    <el-select v-model="form.article_id" placeholder="请选择评论的文章">
                        <el-option v-for="item in articleOptions" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=' '>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('commentForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%" :data="comments" v-loading='loading'>
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="pageInfo.pageSizes" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.count" style="float:right">
        </el-pagination>
    </div>
</template>

<script>
import api from "../../api/index";
export default {
    data() {
        return {
            comments: [],
            pageInfo: {
                currentPage: 1,
                pageSizes: [10, 20],
                pageSize: 10,
                count: 0,
            },
            form: {
                nickname: "",
                comment: "",
                article_id: null,
            },
            articleOptions: [],
            loading: false,
        };
    },
    methods: {
        // async fetch() {
        //     const res = await api.comment.getCommentList();
        //     this.pageInfo.count = res.data.data.length;
        //     this.comments = res.data.data.slice(0, this.pageInfo.pageSize);
        // },
        async remove(row) {
            this.$confirm(`确定删除评论?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    await api.comment.deleteComment(row.id);
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
            this.pageInfo.pageSize = val;
            this.search();
        },
        async handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.search();
        },

        async search() {
            this.loading = true;
            const params = Object.assign({}, this.form, this.pageInfo);
            const res = await api.comment.pagination(params);
            this.comments = res.data.data;
            this.pageInfo.count = res.data.total[0].total;
            this.loading = false;
        },
        /**
         * @description 重置表单
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        /**
         * @description 获取文章
         */
        async getArticleList() {
            const res = await api.article.getArticleList();
            this.articleOptions = res.data.data.map((v) => {
                return {
                    title: v.title,
                    id: v.id,
                };
            });
        },
    },
    created() {
        this.search();
        this.getArticleList();
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
