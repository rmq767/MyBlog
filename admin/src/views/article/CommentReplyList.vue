<template>
    <div>
        <h3>评论回复列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="replyForm" label-width="80px" inline style="width:100%">
                <el-form-item label="昵称：" prop='nickname'>
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="评论：" prop='comment'>
                    <el-input v-model="form.comment"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('replyForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%" :data="commentreply">
            <el-table-column label="昵称" align="center" :show-overflow-tooltip="true" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.i_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="回复的昵称" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.r_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="回复的评论" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.c_reply }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="scope">
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
            commentreply: [],
            pageInfo: {
                currentPage: 1,
                pageSizes: [10, 20],
                pageSize: 10,
                count: 0,
            },
            form: {
                nickname: "",
                comment: "",
            },
            hide: false,
        };
    },
    methods: {
        async fetch() {
            const res = await api.commentReply.getCommentReplyList();
            this.pageInfo.count = res.data.data.length;
            this.commentreply = res.data.data.slice(0, this.pageInfo.pageSize);
        },
        async remove(row) {
            this.$confirm(`确定删除评论?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    await api.commentReply.deleteCommentReply(row.id);
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
            this.pagination();
        },
        async handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.pagination();
        },
        /**
         * @description 分页
         */
        async pagination() {
            const res = await api.commentReply.pagination(
                this.pageInfo.pageSize,
                this.pageInfo.currentPage
            );
            this.commentreply = res.data.data;
        },
        async search() {
            const res = await api.commentReply.searchCommentReply(this.form);
            console.log(res.data.data);
            // this.commentreply = res.data.data;
            // this.pageInfo.count = res.data.data.length;
            // this.pageInfo.pageSize = res.data.data.length;
        },
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
