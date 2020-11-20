<template>
    <div>
        <h3>留言列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="noticeForm" label-width="120px" inline style="width:100%">
                <el-form-item label="公告题目：" prop='title'>
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="公告内容：" prop='content'>
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="时间筛选" prop="date">
                    <datePicker @chooseDate='chooseDate' :date='form.date'></datePicker>
                </el-form-item>
                <el-form-item label=' '>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('noticeForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%" :data="notices" v-loading='loading'>
            <el-table-column label="日期" :show-overflow-tooltip="true" align="center" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
            scope.row.date.split(" ")[0]
          }}</span>
                </template>
            </el-table-column>
            <el-table-column label="公告题目" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="公告内容" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.notice }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="$router.push(`/notice/edit/${scope.row.id}`)">编辑</el-button>
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
            notices: [],
            pageInfo: {
                currentPage: 1,
                pageSizes: [10, 20],
                pageSize: 10,
                count: 0,
            },
            form: {
                title: "",
                content: "",
                date: [],
            },
            date: {
                startTime: "",
                endTime: "",
            },
            loading: false,
        };
    },
    computed: {
        searchData() {
            const params = {
                pageSize: this.pageInfo.pageSize,
                currentPage: this.pageInfo.currentPage,
                title: this.form.title,
                notice: this.form.content,
                startTime: this.date.startTime,
                endTime: this.date.endTime,
            };
            return params;
        },
    },
    methods: {
        // async fetch() {
        //     const res = await api.notice.getNoticeList();
        //     this.pageInfo.count = res.data.data.length;
        //     this.notices = res.data.data.slice(0, this.pageInfo.pageSize);
        // },
        async remove(row) {
            this.$confirm(`确定删除评论?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    await api.notice.deleteNotice(row.id);
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
        //     const res = await api.notice.pagination(
        //         this.pageInfo.pageSize,
        //         this.pageInfo.currentPage
        //     );
        //     this.notices = res.data.data;
        // },
        async search() {
            this.loading = true;
            const res = await api.notice.searchNotice(this.searchData);
            this.notices = res.data.data;
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.date.startTime = "";
            this.date.endTime = "";
        },
    },
    created() {
        // this.fetch();
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
