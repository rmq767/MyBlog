<template>
    <div class="login">
        <div class="d-flex">
            <el-card class="box-card" shadow="hover">
                <h1 style="margin: 0px; text-align: center">登录</h1>
                <div class="form">
                    <el-form :model="loginForm" label-position="left" label-width="70px" :rules="rules" @submit.native.prevent="login">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="loginForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" native-type="submit" style="width: 100%" round>登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import api from "../api";
export default {
    data() {
        return {
            loginForm: {
                password: "",
                email: "",
            },
            rules: {
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        min: 8,
                        max: 16,
                        message: "长度在 8 到 16 个字符",
                        trigger: "blur",
                    },
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱地址",
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
                        message: "长度在64个字符内",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        async login() {
            try {
                const response = await api.login.login(this.loginForm);
                if (response.data.success) {
                    localStorage.token = response.data.token;
                    localStorage.setItem("username", response.data.username);
                    localStorage.setItem("u_id", response.data.id);
                    this.$router.push("/admin");
                    this.$message({
                        type: "success",
                        message: "登录成功",
                    });
                } else {
                    this.$message.error(response.data.msg);
                }
            } catch (error) {
                this.$message.error(error);
            }
        },
    },
};
</script>

<style>
.login {
    height: 100%;
    widows: 100%;
    background: linear-gradient(#ead6ee, #a0f1ea);
    background-size: cover;
}
.form {
    padding: 1rem 0rem;
}
.d-flex {
    height: 100%;
    widows: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.form .el-button--medium.is-round {
    padding: 0.8rem 5rem;
    font-size: 16px;
}
.login .el-card {
    width: 28%;
    padding: 0 2rem;
    background: white;
    opacity: 0.93;
    border-radius: 3rem;
}
/* .login .el-card .el-input .el-input__inner {
    border-color: #fff;
} */
.login .el-card .el-form-item__error {
    color: #df0000;
}
.login .el-card .el-form-item.is-error .el-input__inner {
    color: #df0000;
}
@media screen and (max-width: 1200px) {
    .login .el-card {
        width: 36%;
    }
}
@media screen and (max-width: 992px) {
    .login .el-card {
        width: 48%;
    }
}
@media screen and (max-width: 768px) {
    .login .el-card {
        width: 80%;
    }
}
</style>
