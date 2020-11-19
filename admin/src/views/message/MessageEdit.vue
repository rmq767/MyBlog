<template>
    <div>
        <h3>{{ id ? "编辑" : "新建" }}留言</h3>
        <el-form label-width="120px" @submit.native.prevent="save" style="width:45rem;">
            <el-form-item label="昵称">
                <el-input v-model="message.name"></el-input>
            </el-form-item>
            <el-form-item label="颜色">
                <el-color-picker v-model="message.background" show-alpha></el-color-picker>
            </el-form-item>
            <el-form-item label="左边距">
                <el-input-number v-model="message.posLeft" :min="1" :max="1660"></el-input-number>
            </el-form-item>
            <el-form-item label="上边距">
                <el-input-number v-model="message.posTop" :min="1" :max="860"></el-input-number>
            </el-form-item>
            <el-form-item label="评论">
                <el-input v-model="message.message" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
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
                posLeft: 0,
                posTop: 0,
            },
        };
    },
    methods: {
        async save() {
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
