<template>
    <div>
        <h3>{{ id ? "编辑" : "新建" }}信息</h3>
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
    props: {
        id: {},
    },
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
            //   if (this.id) {
            //     await this.$http.put(`/informations/${this.id}`, this.information);
            //   } else {
            //     await this.$http.post("/informations", this.information);
            //   }
            //   this.$router.push("/information/list");
            //   this.$message({
            //     type: "success",
            //     message: "保存成功"
            //   });
        },
        async fetch() {
            //   const res = await this.$http.get(`/informations/${this.id}`);
            //   this.information = res.data;
            //   this.information = Object.assign({}, this.information, res.data); //把 this.information{}中，再把res.data添加到{}中，如果有覆盖，没有保存
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
