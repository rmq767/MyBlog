<template>
    <div>
        <h3>留言列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="messageForm" label-width="80px" inline style="width:100%">
                <el-form-item label="昵称：" prop='nickname'>
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="评论：" prop='message'>
                    <el-input v-model="form.message"></el-input>
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
                <el-form-item label=' '>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('messageForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%;" :data="messages" v-loading='loading'>
            <el-table-column label="日期" :show-overflow-tooltip="true" align="center" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
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
            <el-table-column label="审核状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_check" :active-value="1" :inactive-value="0" @change="changeCheckStatus(scope.row)">
                    </el-switch>
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
import datePicker from "../../components/datePicker";
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
                message: "",
                is_check: null,
                date: [],
            },
            date: {
                startTime: "",
                endTime: "",
            },
            loading: false,
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
        };
    },
    computed: {
        searchData() {
            const params = {
                pageSize: this.pageInfo.pageSize,
                currentPage: this.pageInfo.currentPage,
                nickname: this.form.nickname,
                message: this.form.message,
                is_check: this.form.is_check,
                startTime: this.date.startTime,
                endTime: this.date.endTime,
            };
            return params;
        },
    },
    methods: {
        // async fetch() {
        //     const res = await api.message.getMessageList();
        //     this.pageInfo.count = res.data.data.length;
        //     this.messages = res.data.data.slice(0, this.pageInfo.pageSize);
        // },
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
        //     const res = await api.message.pagination(
        //         this.pageInfo.pageSize,
        //         this.pageInfo.currentPage
        //     );
        //     this.messages = res.data.data;
        // },
        async search() {
            this.loading = true;
            const res = await api.message.searchMessage(this.searchData);
            this.messages = res.data.data;
            this.pageInfo.count = res.data.total[0].total;
            this.loading = false;
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
        /**
         * @description 改变状态
         */
        async changeCheckStatus(params) {
            try {
                const response = await api.message.messageStatus({
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.date.startTime = "";
            this.date.endTime = "";
            this.search();
        },
    },
    created() {
        this.search();
    },
    components: {
        datePicker,
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
