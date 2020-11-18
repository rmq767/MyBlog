<template>
    <div>
        <h3>主题分类列表</h3>
        <div class="theme">
            <div class="header-form">
                <el-form :model="themeForm" ref="theme" label-width="80px" inline style="width:100%">
                    <el-form-item label="文章主题" prop="theme">
                        <el-input v-model="theme" placeholder="输入文章主题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                        <el-button @click="resetForm('theme')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table style="width: 100%" :data="themeData">
                <el-table-column label="主题" :show-overflow-tooltip="true" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.theme }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit">编辑</el-button>
                        <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="themePageInfo.currentPage" :page-sizes="themePageInfo.pageSizes" :page-size="themePageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="themePageInfo.count" style="float: right">
            </el-pagination>
        </div>
        <div class="type">
            <div class="header-form">
                <el-form :model="typeForm" ref="type" label-width="80px" inline style="width:100%">
                    <el-form-item label="文章分类" prop="type">
                        <el-input v-model="type" placeholder="输入文章分类"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                        <el-button @click="resetForm('type')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table style="width: 100%" :data="typeData">
                <el-table-column label="分类" :show-overflow-tooltip="true" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.type }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit">编辑</el-button>
                        <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="typePageInfo.currentPage" :page-sizes="typePageInfo.pageSizes" :page-size="typePageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="typePageInfo.count" style="float: right">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import api from "../../api/index";
export default {
    data() {
        return {
            themeForm: {},
            typeForm: {},
            themeData: [],
            typeData: [],
            themePageInfo: {
                currentPage: 1,
                pageSizes: [10, 20],
                pageSize: 10,
                count: 0,
            },
            typePageInfo: {
                currentPage: 1,
                pageSizes: [10, 20],
                pageSize: 10,
                count: 0,
            },
        };
    },
    methods: {
        async searchTheme() {
            const params = Object({}, this.themeForm, this.themePageInfo);
            const res = await api.theme.pagination(params);
            this.themeData = res.data.data;
        },
        async searchType() {
            const params = Object({}, this.themeForm, this.typePageInfo);
            const res = await api.type.pagination(params);
            this.typeData = res.data.data;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // // 获取文章主题
        // async getTheme() {
        //     const res = await api.theme.getThemeList();
        //     this.themeOptions = res.data.data;
        // },
        // // 获取文章类型
        // async getType() {
        //     const res = await api.type.getTypeList();
        //     this.typeOptions = res.data.data;
        // },
        handleSizeChange1(val) {
            this.themePageInfo.pageSize = val;
            this.searchTheme();
        },
        handleCurrentChange1(val) {
            this.themePageInfo.currentPage = val;
            this.searchTheme();
        },
        handleSizeChange2(val) {
            this.typePageInfo.pageSize = val;
            this.searchType();
        },
        handleCurrentChange2(val) {
            this.typePageInfo.currentPage = val;
            this.searchType();
        },
    },
    mounted() {
        this.searchTheme();
        this.searchType();
    },
};
</script>

<style lang='less' scoped>
.theme {
    margin-bottom: 50px;
}
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