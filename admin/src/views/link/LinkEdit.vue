<template>
    <div>
        <h3>{{ id ? '编辑' : '新建' }}链接</h3>
        <el-form label-width="120px" @submit.native.prevent="save" style="width:45rem;">
            <el-form-item label="封面">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="showAvatar" :headers="mixGetAuthHeaders()" :before-upload="beforeAvatarUpload">
                    <img v-if="link.image" :src="link.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="link.type" allow-create filterable default-first-option placeholder="请选择">
                    <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="题目">
                <el-input v-model="link.title"></el-input>
            </el-form-item>
            <el-form-item label="链接">
                <el-input v-model="link.link"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="link.description" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
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
            link: {
                image: "",
                type: "其他",
            },
            typeOptions: ["初级", "中级", "高级", "进阶", "其他"],
        };
    },
    methods: {
        async save() {
            if (this.id) {
                await api.link.editLink(this.id, this.link);
            } else {
                await api.link.addLink(this.link);
            }
            this.$router.push("/link/list");
            this.$message({
                type: "success",
                message: "保存成功",
            });
        },
        showAvatar(val) {
            this.link.image = val.url;
        },
        async fetch() {
            const res = await api.link.linkInfo(this.id);
            this.link = res.data.data;
            this.link = Object.assign({}, this.link, res.data.data); //把 this.link{}中，再把res.data.data添加到{}中，如果有覆盖，没有保存
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
