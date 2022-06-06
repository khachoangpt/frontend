<template>
  <div>
    <div class="login">
      <div class="logo">
        <img class="logo-img" src="/hrm-logo.png" alt="" />
      </div>
      <div class="login-form">
        <h2 class="login-form__header">Sign in</h2>
        <el-form
          id="app"
          ref="form"
          :rules="rules"
          :model="form"
          @submit.native.prevent="login(form)"
        >
          <el-form-item prop="email" :show-message="false">
            <el-input v-model="form.email" placeholder="Email">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :show-message="false">
            <el-input
              v-model="form.password"
              placeholder="Password"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <div class="login-form__addition">
            <!-- <el-checkbox
              :value="isRememberMe"
              @change="rememberMe(!isRememberMe)"
              >Remember me</el-checkbox
            > -->
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
              native-type="submit"
              round
              >Sign in</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'LoginComponent',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },

  computed: {
    ...mapGetters('auth', ['isRememberMe', 'rules']),
  },

  methods: {
    ...mapActions('auth', ['login', 'rememberMe']),
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
  justify-content: flex-end;
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
