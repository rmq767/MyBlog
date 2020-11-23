<template>
    <div>
        <h3>评论回复列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="replyForm" label-width="100px" inline style="width:100%">
                <el-form-item label="昵称：" prop='i_name'>
                    <el-input v-model="form.i_name"></el-input>
                </el-form-item>
                <el-form-item label="评论：" prop='c_reply'>
                    <el-input v-model="form.c_reply"></el-input>
                </el-form-item>
                <el-form-item label="回复昵称：" prop='r_name'>
                    <el-input v-model="form.r_name"></el-input>
                </el-form-item>
                <el-form-item label="文章：" prop='article_id'>
                    <el-select v-model="form.article_id" filterable placeholder="请选择评论的文章">
                        <el-option v-for="item in articleOptions" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('replyForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%" :data="commentreply" v-loading='loading'>
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
            <el-table-column label="评论的文章" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editCommentReply(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="评论回复修改" :visible.sync="editReply" width='40%' center>
            <el-form :model="replyForm" label-width="120px">
                <el-form-item label="昵称">
                    <el-input v-model="replyForm.i_name"></el-input>
                </el-form-item>
                <el-form-item label="回复昵称">
                    <el-input v-model="replyForm.r_name"></el-input>
                </el-form-item>
                <el-form-item label="回复的评论">
                    <el-input v-model="replyForm.c_reply"></el-input>
                </el-form-item>
                <el-form-item label="回复的评论">
                    <el-select v-model="replyForm.article_id" placeholder="请选择评论的文章">
                        <el-option v-for="item in articleOptions" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editReply = false">取 消</el-button>
                <el-button type="primary" @click="saveReply">确 定</el-button>
            </div>
        </el-dialog>
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
                i_name: "",
                c_reply: "",
                r_name: "",
                article_id: null,
            },
            replyForm: {},
            articleOptions: [],
            loading: false,
            editReply: false,
            commentReply_id: 0,
        };
    },
    methods: {
        // async fetch() {
        //     const res = await api.commentReply.getCommentReplyList();
        //     this.pageInfo.count = res.data.data.length;
        //     this.commentreply = res.data.data.slice(0, this.pageInfo.pageSize);
        // },
        async editCommentReply(row) {
            this.commentReply_id = row.id;
            const res = await api.commentReply.commentReplyInfo(row.id);
            this.replyForm = res.data.data;
            this.editReply = true;
        },
        async saveReply() {
            const res = await api.commentReply.editCommentReply(
                this.commentReply_id,
                this.replyForm
            );
            if (res.data.success) {
                this.$message.success("修改成功");
            }
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
                    this.search();
                })
                .catch(() => {});
        },
        async handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.search();
        },
        async handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.search();
        },
        // /**
        //  * @description 分页
        //  */
        // async pagination() {
        //     const res = await api.commentReply.pagination(
        //         this.pageInfo.pageSize,
        //         this.pageInfo.currentPage
        //     );
        //     this.commentreply = res.data.data;
        // },
        async search() {
            this.loading = true;
            const params = Object.assign({}, this.form, this.pageInfo);
            const res = await api.commentReply.pagination(params);
            this.commentreply = res.data.data;
            this.pageInfo.count = res.data.total[0].total;
            this.loading = false;
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
    /deep/.el-form-item {
        &:last-of-type {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
