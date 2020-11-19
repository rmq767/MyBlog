<template>
    <div>
        <h3>{{ id ? "编辑" : "新建" }}留言</h3>
        <el-form label-width="120px" @submit.native.prevent="save" style="width:45rem;">
            <el-form-item label="公告题目">
                <el-input v-model="notice.title"></el-input>
            </el-form-item>
            <el-form-item label="公告内容">
                <el-input v-model="notice.notice" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
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
            notice: {},
        };
    },
    methods: {
        async save() {
            if (this.id) {
                const res = await api.notice.editNotice(this.id, this.notice);
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
