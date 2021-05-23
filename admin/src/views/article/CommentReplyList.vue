<template>
    <div>
        <h3>评论回复列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="replyForm" label-width="100px" inline style="width:100%">
                <el-form-item label="昵称：" prop='i_name'>
                    <el-input v-model="form.i_name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop='i_email'>
                    <el-input v-model="form.i_email"></el-input>
                </el-form-item>
                <el-form-item label="评论：" prop='c_reply'>
                    <el-input v-model="form.c_reply"></el-input>
                </el-form-item>
                <el-form-item label="回复昵称：" prop='r_name'>
                    <el-input v-model="form.r_name"></el-input>
                </el-form-item>
                <el-form-item label="回复邮箱：" prop='r_email'>
                    <el-input v-model="form.r_email"></el-input>
                </el-form-item>
                <el-form-item label="文章：" prop='article_id'>
                    <el-select v-model="form.article_id" filterable placeholder="请选择评论的文章">
                        <el-option v-for="item in articleOptions" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态:" prop='is_check'>
                    <el-select v-model="form.is_check">
                        <el-option v-for="item in is_check" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间筛选" prop="date">
                    <datePicker @chooseDate='chooseDate' :date='form.date'></datePicker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('replyForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%" :data="commentreply" v-loading='loading'>
            <el-table-column label="时间" align="center" :show-overflow-tooltip="true" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="昵称" align="center" :show-overflow-tooltip="true" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.i_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="邮箱" align="center" :show-overflow-tooltip="true" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.i_email }}</span>
                </template>
            </el-table-column>
            <el-table-column label="回复的昵称" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.r_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="回复的邮箱" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.r_email }}</span>
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
            <el-table-column label="审核状态" width="100">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_check" :active-value="1" :inactive-value="0" @change="changeCheckStatus(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="scope">
                    <!-- <el-button size="mini" @click="editCommentReply(scope.row)">编辑</el-button> -->
                    <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="评论回复修改" :visible.sync="editReply" width='40%' center>
            <el-form :model="replyForm" label-width="120px">
                <el-form-item label="昵称">
                    <el-input v-model="replyForm.i_name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="replyForm.i_email"></el-input>
                </el-form-item>
                <el-form-item label="回复昵称">
                    <el-input v-model="replyForm.r_name"></el-input>
                </el-form-item>
                <el-form-item label="回复邮箱">
                    <el-input v-model="replyForm.r_email"></el-input>
                </el-form-item>
                <el-form-item label="回复的评论">
                    <el-input v-model="replyForm.c_reply"></el-input>
                </el-form-item>
                <el-form-item label="回复的文章">
                    <el-select v-model="replyForm.article_id" placeholder="请选择评论的文章">
                        <el-option v-for="item in articleOptions" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否通过审核" prop='is_check' required>
                    <el-switch v-model="replyForm.is_check" :active-value='1' :inactive-value='0'></el-switch>
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
import datePicker from "../../components/datePicker";
export default {
    components: {
        datePicker,
    },
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
                i_email: "",
                c_reply: "",
                r_name: "",
                r_email: "",
                is_check: null,
                article_id: null,
                date: [],
            },
            replyForm: {},
            articleOptions: [],
            loading: false,
            editReply: false,
            commentReply_id: 0,
            is_check: [
                {
                    value: null,
                    label: "全部",
                },
                {
                    value: 1,
                    label: "审核通过",
                },
                {
                    value: 0,
                    label: "审核不通过",
                },
            ],
            date: {
                startTime: "",
                endTime: "",
            },
        };
    },
    computed: {
        searchData() {
            const params = {
                pageSize: this.pageInfo.pageSize,
                currentPage: this.pageInfo.currentPage,
                i_name: this.form.i_name,
                i_email: this.form.i_email,
                r_name: this.form.r_name,
                r_email: this.form.r_email,
                c_reply: this.form.c_reply,
                article_id: this.form.article_id,
                is_check: this.form.is_check,
                startTime: this.date.startTime,
                endTime: this.date.endTime,
            };
            return params;
        },
    },
    methods: {
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
                this.editReply = false;
                this.search();
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
        /**
         * @description 分页
         */
        async search() {
            this.loading = true;
            try {
                const response = await api.commentReply.pagination(
                    this.searchData
                );
                if (response.data.success) {
                    this.commentreply = response.data.data;
                    this.pageInfo.count = response.data.total[0].total;
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.$message.error(response.data.msg);
                }
            } catch (error) {
                this.loading = false;
                this.$message.error(error);
            }
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
        /**
         * @description 改变状态
         */
        async changeCheckStatus(params) {
            try {
                const response = await api.commentReply.commentReplyStatus({
                    id: params.id,
                    is_check: params.is_check,
                });
                if (response.data.success) {
                    // this.$message.success("审核通过");
                } else {
                    this.$message.error(response.data.msg);
                }
            } catch (error) {
                this.$message.error(error);
            }
        },
        /**
         * @description 选择时间
         */
        chooseDate(date) {
            if (date) {
                this.date.startTime = date[0];
                this.date.endTime = date[1];
            } else {
                this.date.startTime = "";
                this.date.endTime = "";
            }
            this.search();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.date.startTime = "";
            this.date.endTime = "";
            this.search();
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
