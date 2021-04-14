<template>
    <div>
        <h3>编辑信息</h3>
        <el-form label-width="120px" :model="info" ref="infoForm" style="width:45rem;" :rules='rules'>
            <el-form-item label="头像">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="showAvatar" :headers="mixGetAuthHeaders()" :before-upload="beforeAvatarUpload">
                    <img v-if="info.avatar" :src="info.avatar" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="个人简介" prop='profile'>
                <el-input v-model="info.profile"></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop='qq'>
                <el-input v-model="info.qq"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop='wechat'>
                <el-input v-model="info.wechat"></el-input>
            </el-form-item>
            <el-form-item label="github" prop='github'>
                <el-input v-model="info.github"></el-input>
            </el-form-item>
            <el-form-item label="CSDN" prop='csdn'>
                <el-input v-model="info.csdn"></el-input>
            </el-form-item>
            <el-form-item label="寄语" prop='description'>
                <el-input v-model="info.description" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item label="QQ二维码">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="showQQ" :headers="mixGetAuthHeaders()" :before-upload="beforeAvatarUpload">
                    <img v-if="info.qqQrCode" :src="info.qqQrCode" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="微信二维码">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="showWechat" :headers="mixGetAuthHeaders()" :before-upload="beforeAvatarUpload">
                    <img v-if="info.wechatQrCode" :src="info.wechatQrCode" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save('infoForm')">保存</el-button>
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
            info: {
                profile: "",
                qq: "",
                wechat: "",
                github: "",
                csdn: "",
                description: "",
                avatar: "",
                qqQrCode: "",
                wechatQrCode: "",
            },
            rules: {
                profile: [
                    {
                        min: 0,
                        max: 120,
                        message: "长度120个字符以内",
                        trigger: "blur",
                    },
                ],
                qq: [
                    {
                        min: 0,
                        max: 16,
                        message: "长度16个字符以内",
                        trigger: "blur",
                    },
                ],
                wechat: [
                    {
                        min: 0,
                        max: 20,
                        message: "长度20个字符以内",
                        trigger: "blur",
                    },
                ],
                github: [
                    {
                        min: 0,
                        max: 20,
                        message: "长度20个字符以内",
                        trigger: "blur",
                    },
                ],
                csdn: [
                    {
                        min: 0,
                        max: 20,
                        message: "长度20个字符以内",
                        trigger: "blur",
                    },
                ],
                description: [
                    {
                        min: 0,
                        max: 240,
                        message: "长度240个字符以内",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        showAvatar(val) {
            this.info.avatar = val.url;
        },
        showQQ(val) {
            this.info.qqQrCode = val.url;
        },
        showWechat(val) {
            this.info.wechatQrCode = val.url;
        },
        async save(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const params = Object.assign({}, this.info);
                    const res = await api.information.editInformation(
                        this.info.id,
                        params
                    );
                    if (res.data.success) {
                        this.$message({
                            type: "success",
                            message: "保存成功",
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                } else {
                    return false;
                }
            });
        },
        async fetch() {
            const res = await api.information.getInformation();
            this.info = res.data.data[0];
            // this.info = Object.assign({}, this.info, res.data.data); //把 this.information{}中，再把res.data.data添加到{}中，如果有覆盖，没有保存
        },
    },
    created() {
        this.fetch();
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
