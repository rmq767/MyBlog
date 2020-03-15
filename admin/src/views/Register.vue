<template>
  <div class="register">
    <div class="d-flex">
      <el-card class="box-card" shadow="hover">
        <h1 style="margin:0px;text-align:center;">注册</h1>
        <div class="form">
          <el-form
            :model="registerForm"
            label-position="left"
            label-width="80px"
            :rules="rules"
            ref="registerForm"
            @submit.native.prevent="register"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="registerForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="registerForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit" size="medium" round
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <router-link to="/login">已有账号，点击登录</router-link>
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
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value.length < 8) {
        callback(new Error("密码不能小于8位"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        password: "",
        checkPass: "",
        email: ""
      },
      rules: {
        pass: [
          {
            validator: validatePass,
            trigger: ["blur", "change"],
            required: true
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: ["blur", "change"],
            required: true
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: ["blur", "change"]
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    async register() {
      await this.$http.post("/register", this.registerForm);
    }
  }
};
</script>

<style>
.register {
  height: 100%;
  widows: 100%;
  background: url("../assets/bg_1.jpg");
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
.register .el-card {
  width: 28%;
  padding: 0 2rem;
  background: #4ca1af; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #4ca1af,
    #c4e0e5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #4ca1af, #c4e0e5);
  opacity: 0.93;
  border-radius: 3rem;
}
.register .el-card .el-input .el-input__inner {
  background-color: rgba(186, 211, 212, 0.5);
  border-color: #fff;
}
.register .el-card .el-form-item__error {
  color: #df0000;
}
.register .el-card .el-form-item.is-error .el-input__inner {
  color: #df0000;
}
@media screen and (max-width: 1200px) {
  .register .el-card {
    width: 36%;
  }
}
@media screen and (max-width: 992px) {
  .register .el-card {
    width: 48%;
  }
}
@media screen and (max-width: 768px) {
  .register .el-card {
    width: 80%;
  }
}
</style>
