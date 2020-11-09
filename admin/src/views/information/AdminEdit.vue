<template>
    <div>
        <h3>账号密码修改</h3>
        <el-form label-width="120px" @submit.native.prevent="save" style="width:45rem;">
            <!-- <el-form-item label="管理员名">
        <el-input v-model="admin.username"></el-input>
      </el-form-item> -->
            <el-form-item label="邮箱">
                <el-input v-model="admin.email"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="admin.password"></el-input>
            </el-form-item>
            <!-- <el-form-item label="管理员权限">
        <el-switch v-model="admin.is_super"> </el-switch>
      </el-form-item> -->
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
            admin: {
                eamil: "",
                password: "",
            },
        };
    },
    methods: {
        async save() {
            if (this.id) {
                await this.$http.put(`/admins/${this.id}`, this.admin);
            } else {
                await this.$http.post("/admins", this.admin);
            }
            this.$router.push("/admin/list");
            this.$message({
                type: "success",
                message: "保存成功",
            });
        },
        async fetch() {
            const res = await this.$http.get(`/admins/${this.id}`);
            this.admin = res.data;
            if (res.data.is_super == 1) {
                this.admin.is_super = true;
            } else {
                this.admin.is_super = false;
            }
            this.admin = Object.assign({}, this.admin, res.data); //把 this.admin{}中，再把res.data添加到{}中，如果有覆盖，没有保存
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
