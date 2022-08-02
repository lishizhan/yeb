<template>
  <div>
    <el-form v-loading="loading"
             element-loading-text="拼命登陆中..."
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)" :model="ruleForm" :rules="rules" ref="ruleForm" class="login">
      <h2 style="text-align: center">YEB 系统登陆</h2>
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="ruleForm.code" placeholder="验证码" style="width: 250px;margin-right: 5px"></el-input>
        <el-image :src="captchaUrl" fit="fit" @click="updateCaptcha"
                  style="width: 95px;height: 40px;overflow: unset"></el-image>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click="submitForm('ruleForm')">登 陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postRequest } from '@/api'

export default {
  name: 'Login',
  data () {
    return {
      loading:false,
      captchaUrl: '/captcha?time=' + new Date(),
      ruleForm: {
        username: 'admin',
        password: '123123',
        code: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading=true
          postRequest('/login', this.ruleForm).then(resp => {
            if (resp) {
              this.loading=false
              //存储token
              const tokenStr = resp.obj.tokenHead + resp.obj.token
              window.sessionStorage.setItem("tokenStr",tokenStr)
              //跳转首页
              this.$router.replace('/home')
            }
          })
        } else {
          this.$message.warning('请填写完整信息')
          return false
        }
      })
    },
    updateCaptcha () {
      this.captchaUrl = '/captcha?time=' + new Date()
    }
  }
}

</script>


<style scoped>
.login {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 150px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
