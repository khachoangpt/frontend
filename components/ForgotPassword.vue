<template>
  <div>
    <div class="forgot">
      <div class="logo">
        <img class="logo-img" src="/hrm-logo.png" alt="" />
      </div>
      <div class="forgot-form">
        <h2 class="forgot-form__header">Forgot password</h2>
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          @submit.native.prevent="forgot(form)"
        >
          <el-form-item prop="email" :show-message="false">
            <el-input
              v-model="form.email"
              class="forgot-form__input"
              placeholder="Email"
            >
              <i slot="prefix" class="el-icon-message"></i>
            </el-input>
          </el-form-item>
          <div class="forgot-form__submit">
            <el-button
              class="forgot-form__submit-btn"
              type="primary"
              round
              native-type="submit"
            >
              Change password
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ForgotPasswordComponent',
  data() {
    return {
      form: {
        email: '',
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Email is required',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Email is incorrect',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    ...mapActions('auth', ['forgot']),
  },
}
</script>

<style>
.forgot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #08aeea;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('~/static/background-login.jpg');
  color: #fff !important;
}

.forgot-form {
  padding: 32px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  min-width: 360px;
  background-color: rgba(255, 255, 255, 0.1);
}

.forgot-form__header {
  margin-bottom: 16px;
  margin-top: 0;
}

.forgot-form__submit {
  margin-top: 32px;
}

.forgot-form__submit-btn {
  width: 50%;
}

.el-link--inner {
  text-decoration: none !important;
}

.logo-img {
  width: 80px;
}

.forgot-form__input input {
  background-color: rgba(255, 255, 255, 0) !important;
  color: #fff !important;
}
</style>
