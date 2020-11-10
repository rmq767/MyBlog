<template>
    <div>
        <h3>留言列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="messageForm" label-width="80px" inline style="width:100%">
                <el-form-item label="昵称：" prop='nickname'>
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="评论：">
                    <el-input v-model="form.comment" prop='comment'></el-input>
                </el-form-item>
                <el-form-item label=' '>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('messageForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%;" :data="messages">
            <el-table-column label="日期" :show-overflow-tooltip="true" align="center" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
            scope.row.date.split("T")[0]
          }}</span>
                </template>
            </el-table-column>
            <el-table-column label="昵称" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评论" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.message }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="$router.push(`/message/edit/${scope.row.id}`)">编辑</el-button>
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
            messages: [],
            pageInfo: {
                currentPage: 1,
                pageSizes: [10, 20],
                pageSize: 10,
                count: 0,
            },
            form: {
                nickname: "",
                commment: "",
            },
        };
    },
    methods: {
        async fetch() {
            const res = await api.message.getMessageList();
            this.pageInfo.count = res.data.length;
            this.messages = res.data.slice(0, this.pageInfo.pageSize);
        },
        async remove(row) {
            this.$confirm(`确定删除评论?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    await api.message.deleteMessage(row.id);
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
            const res = await api.message.pagination(
                this.pageInfo.pageSize,
                this.pageInfo.currentPage
            );
            this.messages = res.data;
        },
        async search() {
            const params = Object.assign({}, this.form, this.pageInfo);
            const res = await api.message.searchMessage(params);
            this.messages = res.data;
            // this.pageInfo.count = res.data.length;
            // this.pageInfo.pageSize = res.data.length;
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
