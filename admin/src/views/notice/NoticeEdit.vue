<template>
    <div>
        <h3>{{ id ? "编辑" : "新建" }}公告</h3>
        <el-form label-width="120px" style="width:45rem;" ref="noticeForm" :rules='rules' :model='notice'>
            <el-form-item label="公告题目" prop='title'>
                <el-input v-model="notice.title"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" prop='notice'>
                <el-input v-model="notice.notice" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save('noticeForm')">保存</el-button>
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
            notice: {},
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入公告题目",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 50,
                        message: "长度在 1 到 50 个字符",
                        trigger: "blur",
                    },
                ],
                notice: [
                    {
                        required: true,
                        message: "请输入公告内容",
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
                        const res = await api.notice.editNotice(
                            this.id,
                            this.notice
                        );
                        if (res.data.success) {
                            this.$message.success("保存成功");
                            this.$router.push("/notice/list");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    } else {
                        const res = await api.notice.addNotice(this.notice);
                        if (res.data.success) {
                            this.$message.success("添加成功");
                            this.$router.push("/notice/list");
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
            const res = await api.notice.noticeInfo(this.id);
            this.notice = res.data.data;
            this.notice = Object.assign({}, this.notice, res.data.data); //把 this.notice{}中，再把res.data.data添加到{}中，如果有覆盖，没有保存
        },
    },
    created() {
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
