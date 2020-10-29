<template>
    <div>
        <h3>文章列表</h3>
        <el-form
            :model="form"
            ref="articleForm"
            label-width="80px"
            inline
            style="float: right"
        >
            <el-form-item label="文章题目" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <el-input v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="文章主题" prop="theme">
                <el-select
                    v-model="form.theme"
                    style="margin-left: 20px"
                    placeholder="请选择主题"
                >
                    <el-option
                        v-for="item in themeOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章分类" prop="type">
                <el-select
                    v-model="form.type"
                    style="margin-left: 20px"
                    placeholder="请选择主题"
                >
                    <el-option
                        v-for="item in typeOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" class="el-icon-search"
                    >搜索</el-button
                >
                <el-button @click="resetForm('articleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table style="width: 100%" :data="articles">
            <el-table-column
                label="日期"
                prop="date"
                fixed
                align="center"
                width="150"
            >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{
                        scope.row.date.split("T")[0]
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="题目"
                align="center"
                :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="内容"
                :show-overflow-tooltip="true"
                align="center"
            >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.content_md
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="主题"
                :show-overflow-tooltip="true"
                align="center"
            >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.theme }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="分类"
                :show-overflow-tooltip="true"
                align="center"
            >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                align="center"
                width="180"
            >
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="$router.push(`/article/edit/${scope.row.id}`)"
                        >编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="remove(scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"
            style="float: right"
            :hide-on-single-page="hide"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: [],
            currentPage: 1,
            pageSizes: [10, 15, 20],
            pageSize: 10,
            count: 10,
            form: {
                title: "",
                content: "",
                theme: '',
                type: '',
            },
            themeOptions: [],
            typeOptions: [],
            hide: false,
        };
    },
    methods: {
        async fetch() {
            const res = await this.$http.get("/articles");
            this.count = res.data.length;
            this.articles = res.data.slice(0, this.pageSize);
        },
        async remove(row) {
            this.$confirm(`是否删除${row.title}`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    await this.$http.delete(`/articles/${row.id}`);
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
            this.pageSize = val;
            const res = await this.$http.get(
                `/articles/get/page?pageSize=${this.pageSize}&currentPage=${this.currentPage}`
            );
            this.articles = res.data;
        },
        async handleCurrentChange(val) {
            this.currentPage = val;
            const res = await this.$http.get(
                `/articles/get/page?pageSize=${this.pageSize}&currentPage=${this.currentPage}`
            );
            this.articles = res.data;
        },
        async search() {
            const res = await this.$http.post(
                "/articles/get/search",
                this.form
            );

            this.articles = res.data;
            this.hide = true;
        },
        // 获取文章主题
        async getTheme() {
            const res = await this.$http.get(`/articles/get/theme`);
            this.themeOptions = res.data;
        },
        // 获取文章类型
        async getType() {
            const res = await this.$http.get(`/articles/get/type`);
            this.typeOptions = res.data;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
    components: {},
    created() {
        this.fetch();
        this.getTheme();
        this.getType();
    },
};
</script>
<style lang='less' scoped>
.el-tooltip__popper {
    display: none;
}
/deep/.el-form-item {
    &:last-of-type {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
