<template>
    <div>
        <h3>个人信息</h3>
        <el-form label-width="120px" @submit.native.prevent="save" style="width:45rem;">
            <el-form-item label="头像">
                <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="showAvatar" :headers="mixGetAuthHeaders()" :before-upload="beforeAvatarUpload">
                    <img v-if="info.image" :src="info.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="个人简介">
                <el-input v-model="info.profile"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
                <el-input v-model="info.qq"></el-input>
            </el-form-item>
            <el-form-item label="微信">
                <el-input v-model="info.wechat"></el-input>
            </el-form-item>
            <el-form-item label="github">
                <el-input v-model="info.github"></el-input>
            </el-form-item>
            <el-form-item label="个人描述">
                <el-input v-model="info.description" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item label="寄语">
                <el-input v-model="info.message" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {
                image: "",
            },
        };
    },
    methods: {
        showAvatar(val) {
            this.info.image = val.url;
        },
        async save() {
            console.log(this.info);
        },
    },
};
</script>

<style>
</style>