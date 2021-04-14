<template>
    <div>
        <h3>{{ id ? "编辑" : "新建" }}评论</h3>
        <el-form label-width="120px" style="width:45rem;" :rules='rules' :model='comment' ref="commentForm">
            <el-form-item label="评论的文章" prop='article_id'>
                <el-select v-model="comment.article_id" filterable placeholder="请选择">
                    <el-option v-for="item in articles" :key="item.id" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="昵称" prop='name'>
                <el-input v-model.trim="comment.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop='email'>
                <el-input v-model.trim="comment.email"></el-input>
            </el-form-item>
            <el-form-item label="评论" prop='comment'>
                <el-input v-model.trim="comment.comment" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item label="是否通过审核" prop='is_check' required>
                <el-switch v-model="comment.is_check" :active-value='1' :inactive-value='0'></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save('commentForm')">保存</el-button>
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
            comment: {
                article_id: null,
                name: "",
                email: "",
                comment: "",
                is_check: 1,
            },
            articles: [],
            rules: {
                article_id: [
                    {
                        required: true,
                        message: "请选择评论的文章",
                        trigger: "change",
                    },
                ],
                name: [
                    {
                        required: true,
                        message: "请输入昵称",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 20,
                        message: "长度在 1 到 20 个字符",
                        trigger: "blur",
                    },
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur",
                    },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"],
                    },
                    {
                        min: 1,
                        max: 64,
                        message: "长度在 1 到 64 个字符",
                        trigger: "blur",
                    },
                ],
                comment: [
                    {
                        required: true,
                        message: "请输入评论",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 240,
                        message: "长度在 1 到 240 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        async save(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.id) {
                        const res = await api.comment.editComment(
                            this.id,
                            this.comment
                        );
                        if (res.data.success) {
                            this.$message.success("保存成功");
                            this.$router.push("/comment/list");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    } else {
                        const res = await api.comment.addComment(this.comment);
                        if (res.data.success) {
                            this.$message.success("添加成功");
                            this.$router.push("/comment/list");
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
            const res = await api.comment.commentInfo(this.id);
            this.comment = res.data.data;
            this.comment = Object.assign({}, this.comment, res.data.data); //把 this.comment{}中，再把res.data.data添加到{}中，如果有覆盖，没有保存
        },
        async fetchArticle() {
            let res = await api.article.getArticleList();
            this.articles = res.data.data;
        },
    },
    created() {
        this.fetchArticle();
        this.id && this.fetch();
    },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 8rem;
    height: 8rem;
    line-height: 8rem;
    text-align: center;
}
.avatar {
    width: 8rem;
    height: 8rem;
    display: block;
}
</style>
