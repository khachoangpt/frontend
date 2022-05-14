<template>
  <div>
    <div class="login">
      <div class="logo">
        <img class="logo-img" src="/hrm-logo.png" alt="" />
      </div>
      <div class="login-form">
        <h2 class="login-form__header">Sign in</h2>
        <el-form ref="form" :rules="rules" :model="form">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="Username">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="Password"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <div class="login-form__addition">
            <el-checkbox v-model="checked">Remember me</el-checkbox>
            <nuxt-link
              class="login-form__addition-forgot"
              :to="localePath('/forgot')"
            >
              <el-link type="primary">Forgot password?</el-link>
            </nuxt-link>
          </div>
          <div class="login-form__submit">
            <el-button
              class="login-form__submit-btn"
              type="primary"
              round
              @click="submitForm('form')"
              >Sign in</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  data() {
    return {
      checked: true,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: 'Please input Username',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please input Password',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          alert('error submit!')
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #08aeea 0%, #2af598 100%);
}

.login-form {
  padding: 32px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  min-width: 360px;
  background-color: #fff;
}

.login-form__header {
  margin-bottom: 16px;
  margin-top: 0;
}

.login-form__addition {
  display: flex;
  justify-content: space-between;
}

.login-form__addition-forgot {
    text-decoration: none;
}

.login-form__submit {
  margin-top: 32px;
}

.login-form__submit-btn {
  width: 50%;
}

.el-link--inner {
  text-decoration: none !important;
}

.logo-img {
  width: 80px;
}
</style>
