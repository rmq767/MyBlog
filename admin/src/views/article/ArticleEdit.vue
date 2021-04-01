<template>
    <div>
        <h3>{{ id ? "编辑" : "新建" }}文章</h3>
        <el-form label-width="80px" :rules='rules' ref="articleForm" :model="article">
            <el-form-item label="文章标题" prop='title'>
                <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="文章主题" prop='theme'>
                <el-select v-model.trim="article.theme" filterable allow-create default-first-option placeholder="请选择文章主题">
                    <el-option v-for="(item,index) in themeOptions" :key="index" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章分类" prop='type'>
                <el-select v-model.trim="article.type" multiple allow-create filterable default-first-option placeholder="请选择文章类别" :multiple-limit='3'>
                    <el-option v-for="(item,index) in typeOptions" :key="index" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章置顶" prop='isTop'>
                <el-switch v-model="article.isTop" :active-value="1" :inactive-value="0">
                </el-switch>
            </el-form-item>
            <el-form-item label="文章内容" required>
                <div class="edit_container">
                    <mavon-editor v-model="article.content_md" :ishljs="true" ref="md" @imgAdd="$imgAdd" />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save('articleForm')">立即保存</el-button>
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
                theme: "",
                type: [],
                isTop: 0,
            },
            typeOptions: [],
            themeOptions: [],
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入文章名称",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 100,
                        message: "长度在 1 到 100 个字符",
                        trigger: "blur",
                    },
                ],
                theme: [
                    {
                        required: true,
                        message: "请选择主题",
                        trigger: "change",
                    },
                ],
                type: [
                    {
                        required: true,
                        message: "请选择分类",
                        trigger: "change",
                    },
                ],
                isTop: [
                    {
                        required: true,
                        message: "请选择是否置顶",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    methods: {
        async save(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.article.content_md = this.$refs.md.d_value;
                    this.article.content_html = this.$refs.md.d_render;
                    if (this.id) {
                        const res = await api.article.editArticle(
                            this.id,
                            this.article
                        );
                        if (res.data.success) {
                            this.$message.success("保存成功");
                            this.$router.push("/article/list");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    } else {
                        const res = await api.article.addArticle(this.article);
                        if (res.data.success) {
                            this.$message.success("添加成功");
                            this.$router.push("/article/list");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    }
                } else {
                    return false;
                }
            });
        },
        async fetch() {
            const res = await api.article.articleInfo(this.id);
            this.article = res.data.data;
            this.article.content_md = res.data.data.content_md;
            this.article.theme = res.data.data.theme;
            this.article.type = res.data.data.type.split(",");
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
            this.themeOptions = res.data.data;
        },
        // 获取文章类型
        async getType() {
            const res = await api.type.getTypeList();
            this.typeOptions = res.data.data;
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
