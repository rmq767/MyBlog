<template>
    <div>
        <h3>主题分类列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="themeType" label-width="80px" inline style="width:100%">
                <el-form-item label="文章主题" prop="theme">
                    <el-select v-model="form.theme" filterable style="margin-left: 20px" placeholder="请选择主题">
                        <el-option v-for="item in themeOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章分类" prop="type">
                    <el-select v-model="form.type" filterable style="margin-left: 20px" placeholder="请选择分类">
                        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('themeType')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%" :data="themeType">
            <el-table-column label="主题" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.theme }}</span>
                </template>
            </el-table-column>
            <el-table-column label="分类" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="$router.push(`/themetype/edit/${scope.row.id}`)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="pageInfo.pageSizes" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.count" style="float: right">
        </el-pagination>
    </div>
</template>

<script>
import api from "../../api/index";
export default {
    data() {
        return {
            form: {},
            themeType: [],
            pageInfo: {
                currentPage: 1,
                pageSizes: [10, 20],
                pageSize: 10,
                count: 0,
            },
        };
    },
    methods: {
        handleSizeChange() {},
        handleCurrentChange() {},
        search() {},
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 获取文章主题
        async getTheme() {
            const res = await api.theme.getThemeList();
            this.themeOptions = res.data.data;
        },
        // 获取文章类型
        async getType() {
            const res = await api.type.getTypeList();
            this.typeOptions = res.data.data;
        },
    },
    mounted() {
        this.getTheme();
        this.getType();
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