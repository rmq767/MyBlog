<template>
    <div>
        <h3>链接列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="linkForm" label-width="120px" inline style="width:100%">
                <el-form-item label="分类选择：" prop='type'>
                    <el-select v-model="form.type" placeholder="请选择链接分类">
                        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称：" prop='title'>
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('linkForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%" :data="links" v-loading='loading'>
            <el-table-column label="分类" :show-overflow-tooltip="true" align="center" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.type}}</span>
                </template>
            </el-table-column>
            <el-table-column label="题目" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="链接" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.link }}</span>
                </template>
            </el-table-column>
            <el-table-column label="封面" prop="avatar" align="center" width="150">
                <template slot-scope="scope">
                    <el-image :src="scope.row.image" fit="scale-down" :preview-src-list="[scope.row.image]"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="$router.push(`/link/edit/${scope.row.id}`)">编辑</el-button>
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
            links: [],
            pageInfo: {
                currentPage: 1,
                pageSizes: [10, 20],
                pageSize: 10,
                count: 0,
            },
            form: {
                title: "",
                type: "",
            },
            typeOptions: [],
            loading: false,
        };
    },
    methods: {
        // async fetch() {
        //     const res = await api.link.getLinkList();
        //     this.pageInfo.count = res.data.data.length;
        //     this.links = res.data.data.slice(0, this.pageInfo.pageSize);
        // },
        async remove(row) {
            this.$confirm(`确定删除评论?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    await api.link.deleteLink(row.id);
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
        //     const res = await api.link.pagination(
        //         this.pageInfo.pageSize,
        //         this.pageInfo.currentPage
        //     );
        //     this.links = res.data.data;
        // },
        async search() {
            this.loading = true;
            const params = Object.assign({}, this.form, this.pageInfo);
            const res = await api.link.pagination(params);
            this.links = res.data.data;
            this.pageInfo.count = res.data.total[0].total;
            this.loading = false;
        },
        /**
         * @description 获取options
         */
        async getLinkTypeOptions() {
            const res = await api.link.getLinkTypeOptions();
            this.typeOptions = res.data.data.map((v) => v.type);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.search();
        },
    },
    created() {
        this.search();
        this.getLinkTypeOptions();
    },
};
</script>
<style lang='less' scoped>
/* .el-tooltip__popper {
    display: none;
} */
.el-image-viewer__close {
    color: #fff;
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
