<template>
    <div>
        <h3>{{ id ? "编辑" : "新建" }}文章</h3>
        <el-form label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="文章主题">
                <el-select v-model="article.theme" filterable placeholder="请选择文章主题">
                    <el-option v-for="item in themeOptions" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章分类">
                <el-select v-model="article.type" multiple collapse-tags filterable default-first-option placeholder="请选择文章类别" :multiple-limit='3'>
                    <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章内容">
                <div class="edit_container">
                    <mavon-editor v-model="article.content_md" :ishljs="true" ref="md" @imgAdd="$imgAdd" />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save()">立即保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import api from "../../api/index";
export default {
    props: {
        id: {},
    },
    data() {
        return {
            article: {
                title: "",
                content_md: "",
                content_html: "",
                theme: [],
                type: [],
            },
            typeOptions: [],
            themeOptions: [],
        };
    },
    methods: {
        async save() {
            this.article.content_md = this.$refs.md.d_value;
            this.article.content_html = this.$refs.md.d_render;
            if (this.id) {
                await api.article.editArticle(this.id, this.article);
            } else {
                await api.article.addArticle(this.article);
            }
            this.$message({
                type: "success",
                message: "保存成功",
            });
            this.$router.push("/article/list");
        },
        async fetch() {
            const res = await api.article.articleInfo(this.id);
            this.article = res.data;
            this.article.content_md = res.data.content_md;
            this.article.theme = res.data.theme.split(",");
            this.article.type = res.data.type.split(",");
        },
        $imgAdd(pos, $file) {
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append("file", $file);
            this.$http.post("/upload", formdata).then((url) => {
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                this.$refs.md.$img2Url(pos, url.data.url);
            });
        },
        // 获取文章主题
        async getTheme() {
            const res = await api.theme.getThemeList();
            this.themeOptions = res.data;
        },
        // 获取文章类型
        async getType() {
            const res = await api.type.getTypeList();
            this.typeOptions = res.data;
        },
    },
    mounted() {
        this.id && this.fetch();
        this.getTheme();
        this.getType();
    },
};
</script>

<style></style>
