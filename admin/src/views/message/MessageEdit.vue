<template>
    <div>
        <h3>{{ id ? "编辑" : "新建" }}留言</h3>
        <el-form label-width="120px" style="width:45rem;" ref="messageForm" :rules='rules' :model='message'>
            <el-form-item label="昵称" prop='name'>
                <el-input v-model="message.name"></el-input>
            </el-form-item>
            <el-form-item label="颜色" prop='background'>
                <el-color-picker v-model="message.background" show-alpha></el-color-picker>
            </el-form-item>
            <el-form-item label="左边距" prop='posLeft'>
                <el-input-number v-model="message.posLeft" :min="1" :max="1660"></el-input-number>
            </el-form-item>
            <el-form-item label="上边距" prop='posTop'>
                <el-input-number v-model="message.posTop" :min="1" :max="860"></el-input-number>
            </el-form-item>
            <el-form-item label="评论" prop='message'>
                <el-input v-model="message.message" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item label="是否通过审核" prop='is_check' required>
                <el-switch v-model="message.is_check" :active-value='1' :inactive-value='0'></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save('messageForm')">保存</el-button>
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
            message: {
                name: "",
                message: "",
                background: "",
                posLeft: 1,
                posTop: 1,
                is_check: 1,
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入文章名称",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 20,
                        message: "长度在 1 到 20 个字符",
                        trigger: "blur",
                    },
                ],
                background: [
                    {
                        required: true,
                        message: "请选择背景",
                        trigger: "change",
                    },
                ],
                posLeft: [
                    {
                        required: true,
                        message: "请输入左边距",
                        trigger: "blur",
                    },
                ],
                posTop: [
                    {
                        required: true,
                        message: "请输入上边距",
                        trigger: "blur",
                    },
                ],
                message: [
                    {
                        required: true,
                        message: "请输入留言",
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
                        const res = await api.message.editMessage(
                            this.id,
                            this.message
                        );
                        if (res.data.success) {
                            this.$message({
                                type: "success",
                                message: "保存成功",
                            });
                            this.$router.push("/message/list");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    } else {
                        const res = await api.message.addMessage(this.message);
                        if (res.data.success) {
                            this.$message({
                                type: "success",
                                message: "添加成功",
                            });
                            this.$router.push("/message/list");
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
            const res = await api.message.messageInfo(this.id);
            this.message = res.data.data;
            this.message = Object.assign({}, this.message, res.data.data); //把 this.message{}中，再把res.data.data添加到{}中，如果有覆盖，没有保存
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
