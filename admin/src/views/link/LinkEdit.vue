<template>
    <div>
        <h3>{{ id ? '编辑' : '新建' }}链接</h3>
        <el-form label-width="120px" style="width:45rem;" ref="linkForm" :rules='rules' :model='link'>
            <el-form-item label="封面" prop='image'>
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="showAvatar" :headers="mixGetAuthHeaders()" :before-upload="beforeAvatarUpload">
                    <img v-if="link.image" :src="link.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="分类" prop='type'>
                <el-select v-model="link.type" allow-create filterable default-first-option placeholder="请选择">
                    <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="题目" prop='title'>
                <el-input v-model="link.title"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop='link'>
                <el-input v-model="link.link"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop='description'>
                <el-input v-model="link.description" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save('linkForm')">保存</el-button>
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
            typeOptions: [],
            rules: {
                image: [
                    {
                        required: true,
                        message: "请添加封面",
                        trigger: "blur",
                    },
                ],
                type: [
                    {
                        required: true,
                        message: "请选择分类",
                        trigger: "change",
                    },
                ],
                title: [
                    {
                        required: true,
                        message: "请输入题目",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 100,
                        message: "长度在 1 到 100 个字符",
                        trigger: "blur",
                    },
                ],
                link: [
                    {
                        required: true,
                        message: "请输入链接",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 240,
                        message: "长度在 1 到 240 个字符",
                        trigger: "blur",
                    },
                ],
                description: [
                    {
                        required: true,
                        message: "请输入描述",
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
                        const res = await api.link.editLink(this.id, this.link);
                        if (res.data.success) {
                            this.$message.success("保存成功");
                            this.$router.push("/link/list");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    } else {
                        const res = await api.link.addLink(this.link);
                        if (res.data.success) {
                            this.$message.success("添加成功");
                            this.$router.push("/link/list");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    }
                } else {
                    return false;
                }
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
        /**
         * @description 获取分类的选项
         */
        async getOptions() {
            const res = await api.link.getLinkTypeOptions();
            this.typeOptions = res.data.data.map((v) => v.type);
        },
    },
    created() {
        this.id && this.fetch();
        this.getOptions();
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
