<template>
  <div class="login-container q-px-lg fixed-center">
    <h4 class="login-title">罗想OA</h4>
    <el-form :model="loginModel" status-icon :rules="loginRules" ref="loginModel" label-width="100px" class="login-form">
      <el-form-item label="服务器">
        <el-select v-model="loginModel.server" placeholder="请选择服务器" style="width: 100%;">
          <el-option label="罗想OA" value="https://oa.roadshare.com/rshare/"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业编码" prop="corpid">
        <el-input v-model="loginModel.corpid"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userid">
        <el-input v-model="loginModel.userid"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginModel.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginModel')">登陆</el-button>
        <el-button @click="resetForm('loginModel')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { loginService } from 'src/api'

Vue.use(ElementUI)

export default {
  name: 'PageName',
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginModel: {
        server: 'https://oa.roadshare.com/rshare/',
        corpid: '',
        userid: '',
        password: ''
      },
      loginRules: {
        corpid: [
          { required: true, message: '请输入企业编码', trigger: 'blur' }
        ],
        userid: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      const self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          loginService.login(this.loginModel).then(function(response) {
            self.$router.push('/desktop')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.login-container {
  background-color: rgb(242, 244, 248);
}

.login-title {
  text-align: center;
}

.login-form {
  width: 500px;
}
</style>
