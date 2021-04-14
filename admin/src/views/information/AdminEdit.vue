<template>
    <div>
        <h3>账号密码修改</h3>
        <el-form label-width="120px" style="width:45rem;" ref="adminForm" :rules='rules' :model='admin'>
            <el-form-item label="管理员名" prop='username'>
                <el-input v-model.trim="admin.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop='email'>
                <el-input v-model.trim="admin.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop='password'>
                <el-input v-model.trim="admin.password"></el-input>
            </el-form-item>
            <!-- <el-form-item label="管理员权限">
        <el-switch v-model="admin.is_super"> </el-switch>
      </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="save('adminForm')">保存</el-button>
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
            admin: {
                username: "",
                email: "",
                password: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 20,
                        message: "长度在 1 到 20 个字符",
                        trigger: "blur",
                    },
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur",
                    },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"],
                    },
                    {
                        min: 1,
                        max: 64,
                        message: "长度在 1 到 64 个字符",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
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
                    const res = await api.admin.editAdmin(
                        this.admin.id,
                        this.admin
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
            const res = await api.admin.getAdmin();
            this.admin = Object.assign({}, this.admin, res.data.data[0]); //把 this.admin{}中，再把res.data.data添加到{}中，如果有覆盖，没有保存
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
