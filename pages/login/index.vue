<template>
  <div>
    <div class="login">
      <div class="logo">
        <img class="logo-img" src="../../static/hrm-logo.png" alt="">
      </div>
      <div class="login-form">
        <h2 class="login-form__header">Sign in</h2>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item>
            <el-input v-model="form.username" placeholder="Username">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
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
            <el-link class="login-form__addition-forgot" type="primary">Forgot password?</el-link>
          </div>
          <div class="login-form__submit">
            <el-button class="login-form__submit-btn" type="primary" round>Sign in</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      checked: true,
      form: {
        username: '',
        password: '',
      },
    }
  },
}
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.login-form {
  padding: 32px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  min-width: 360px;
}

.el-form-item__content {
  margin-left: 0px !important;
}

.login-form__header {
  margin-bottom: 16px;
  margin-top: 0;
}

.login-form__addition {
  display: flex;
  justify-content: space-between;
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
