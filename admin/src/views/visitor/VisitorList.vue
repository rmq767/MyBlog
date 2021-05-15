<template>
    <div>
        <h3>游客列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="visitorForm" label-width="80px" inline style="width:100%">
                <el-form-item label="昵称：" prop='name'>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop='email'>
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="禁用状态:" prop='status'>
                    <el-select v-model="form.status">
                        <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间筛选" prop="date">
                    <datePicker @chooseDate='chooseDate' :date='form.date'></datePicker>
                </el-form-item>
                <el-form-item label=' '>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('visitorForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%" :data="visitors" v-loading='loading'>
            <el-table-column label="时间" align="center" :show-overflow-tooltip="true" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="昵称" align="center" :show-overflow-tooltip="true" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="邮箱" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.email }}</span>
                </template>
            </el-table-column>
            <el-table-column label="禁用状态" width="100" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_delete" :active-value="0" :inactive-value="1" active-color="#13ce66" inactive-color="#ff4949" @change="changeCheckStatus(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <!-- <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
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
            visitors: [],
            pageInfo: {
                currentPage: 1,
                pageSizes: [10, 20],
                pageSize: 10,
                count: 0,
            },
            form: {
                name: "",
                email: "",
                date: [],
                status: null,
            },
            loading: false,
            status: [
                {
                    value: null,
                    label: "全部",
                },
                {
                    value: 0,
                    label: "未禁用",
                },
                {
                    value: 1,
                    label: "禁用",
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
                name: this.form.name,
                email: this.form.email,
                status: this.form.status,
                startTime: this.date.startTime,
                endTime: this.date.endTime,
            };
            return params;
        },
    },
    methods: {
        // async remove(row) {
        //     this.$confirm(`确定删除评论?`, "提示", {
        //         confirmButtonText: "确定",
        //         cancelButtonText: "取消",
        //         type: "warning",
        //     })
        //         .then(async () => {
        //             await api.comment.deleteComment(row.id);
        //             this.$message({
        //                 type: "success",
        //                 message: "删除成功!",
        //             });
        //             this.search();
        //         })
        //         .catch(() => {});
        // },
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
            const res = await api.visitor.pagination(this.searchData);
            this.visitors = res.data.data;
            this.pageInfo.count = res.data.total[0].total;
            this.loading = false;
        },
        /**
         * @description 重置表单
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.date.startTime = "";
            this.date.endTime = "";
            this.search();
        },
        /**
         * @description 改变状态
         */
        async changeCheckStatus(params) {
            try {
                const response = await api.visitor.editVisitor({
                    id: params.id,
                    status: params.is_delete,
                });
                if (response.data.success) {
                    this.$message.success("操作成功");
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
    },
    created() {
        this.search();
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
