<template>
    <div>
        <h3>文章列表</h3>
        <div class="header-form">
            <el-form :model="form" ref="articleForm" label-width="80px" inline style="width:100%">
                <el-form-item label="文章题目" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="文章主题" prop="theme">
                    <el-select v-model="form.theme" style="margin-left: 20px" filterable placeholder="请选择主题">
                        <el-option v-for="(item,index) in themeOptions" :key="index" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章分类" prop="type">
                    <el-select v-model="form.type" style="margin-left: 20px" filterable placeholder="请选择分类">
                        <el-option v-for="(item,index) in typeOptions" :key="index" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间筛选" prop="date">
                    <datePicker @chooseDate='chooseDate' :date='form.date'></datePicker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" class="el-icon-search">搜索</el-button>
                    <el-button @click="resetForm('articleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table style="width: 100%" :data="articles" v-loading='loadingData'>
            <el-table-column label="日期" prop="date" fixed align="center" width="150">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{
                        scope.row.date.split(" ")[0]
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="题目" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="内容" align="center">
                <template slot-scope="scope">
                    <span style="maxWidth: 100%;overflow: hidden;whiteSpace: nowrap;textOverflow: ellipsis;">{{
                        scope.row.content_md
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="主题" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.theme }}</span>
                </template>
            </el-table-column>
            <el-table-column label="分类" :show-overflow-tooltip="true" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column label="置顶" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isTop" :active-value="1" :inactive-value="0" @change="changeTop(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="$router.push(`/article/edit/${scope.row.id}`)">编辑</el-button>
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
import datePicker from "../../components/datePicker";
export default {
    data() {
        return {
            articles: [],
            pageInfo: {
                currentPage: 1,
                pageSizes: [10, 20],
                pageSize: 10,
                count: 0,
            },
            form: {
                title: "",
                content: "",
                theme: "",
                type: "",
                date: [],
            },
            themeOptions: [],
            typeOptions: [],
            loadingData: false,
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
                title: this.form.title,
                content: this.form.content,
                theme: this.form.theme,
                type: this.form.type,
                startTime: this.date.startTime,
                endTime: this.date.endTime,
            };
            return params;
        },
    },
    methods: {
        async remove(row) {
            this.$confirm(`是否删除${row.title}`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    await api.article.deleteArticle(row.id);
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    this.search();
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.search();
        },
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.search();
        },
        async search() {
            this.loadingData = true;
            try {
                const response = await api.article.searchArticle(
                    this.searchData
                );
                if (response.data.success) {
                    this.articles = response.data.data;
                    this.pageInfo.count = response.data.total[0].total;
                    this.loadingData = false;
                } else {
                    this.$message.error(response.data.msg);
                    this.loadingData = false;
                }
            } catch (error) {
                this.$message.error(error);
                this.loadingData = false;
            }
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
         * @description 文章置顶
         */
        async changeTop(row) {
            try {
                const response = await api.article.articleTop(row.id, {
                    isTop: row.isTop,
                });
                if (response.data.success) {
                    this.search();
                    this.$message.success("置顶成功");
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
    components: {
        datePicker,
    },
    created() {
        this.search();
        this.getTheme();
        this.getType();
    },
};
</script>
<style lang='less' scoped>
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
