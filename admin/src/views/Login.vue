<template>
    <div class="login">
        <div class="d-flex">
            <el-card class="box-card" shadow="hover">
                <h1 style="margin:0px;text-align:center;">登录</h1>
                <div class="form">
                    <el-form :model="loginForm" label-position="left" label-width="70px" :rules="rules" @submit.native.prevent="login">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="loginForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" native-type="submit" style="width:100%" round>登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (value.length < 8) {
                callback(new Error("密码不能小于8位"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                password: "",
                email: "",
            },
            rules: {
                password: [
                    {
                        validator: validatePass,
                        trigger: ["blur", "change"],
                        required: true,
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
                ],
            },
        };
    },
    methods: {
        async login() {
            const res = await this.$http.post(
                "http://47.115.83.172/login",
                this.loginForm
            );
            localStorage.token = res.data.token;
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("u_id", res.data.id);
            this.$router.push("/admin");
            this.$message({
                type: "success",
                message: "登录成功",
            });
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
