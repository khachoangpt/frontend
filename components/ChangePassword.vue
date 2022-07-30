<template>
  <div>
    <div class="change-password">
      <div class="logo">
        <img class="logo-img" src="/hrm-logo.png" alt="" />
      </div>
      <div class="change-password-form">
        <h2 class="change-password-form__header">
          {{ $i18n.t('changePassword.changePassword') }}
        </h2>
        <el-form
          ref="form"
          status-icon
          :rules="rules"
          :model="form"
          @submit.native.prevent="changePassword(form)"
        >
          <el-form-item prop="email" :show-message="false">
            <el-input
              v-model="form.email"
              class="change-password-form__input"
              placeholder="Email"
            >
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="old_password" :show-message="false">
            <el-input
              v-model="form.old_password"
              class="change-password-form__input"
              :placeholder="$i18n.t('changePassword.oldPassword')"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="new_password" :show-message="false">
            <el-input
              v-model="form.new_password"
              class="change-password-form__input"
              :placeholder="$i18n.t('changePassword.newPassword')"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="re_password" :show-message="false">
            <el-input
              v-model="form.re_password"
              class="change-password-form__input"
              :placeholder="$i18n.t('changePassword.confirmPassword')"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <div class="login-form__addition">
            <nuxt-link
              class="login-form__addition-forgot"
              :to="localePath('/forgot')"
            >
              <el-link type="primary">{{
                $i18n.t('login.forgotPassword')
              }}</el-link>
            </nuxt-link>
          </div>
          <div class="change-password-form__submit">
            <el-button
              class="change-password-form__submit-btn"
              type="primary"
              round
              native-type="submit"
            >
              {{ $i18n.t('changePassword.changePassword') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ChangePasswordComponent',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.form.re_password !== '') {
          this.$refs.form.validateField('re_password')
        }
        callback()
      }
    }
    const validatePassConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.new_password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      form: {
        email: '',
        old_password: '',
        new_password: '',
        re_password: '',
      },
      rules: {
        email: [
          {
            required: true,
            trigger: 'blur',
          },
        ],
        old_password: [
          {
            required: true,
            trigger: 'blur',
          },
        ],
        new_password: [
          {
            validator: validatePass,
            trigger: 'blur',
          },
        ],
        re_password: [
          {
            validator: validatePassConfirm,
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    ...mapGetters('auth', ['email']),
  },

  mounted() {
    this.form.email = this.email
  },

  methods: {
    ...mapActions('auth', ['changePassword']),
  },
}
</script>

<style>
.change-password {
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
  color: #fff;
}

.change-password-form {
  padding: 32px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  min-width: 360px;
  background-color: rgba(255, 255, 255, 0.1);
}

.change-password-form__header {
  margin-bottom: 16px;
  margin-top: 0;
}

.change-password-form__submit {
  margin-top: 32px;
}

.change-password-form__submit-btn {
  width: 50%;
}

.el-link--inner {
  text-decoration: none !important;
}

.logo-img {
  width: 80px;
}

.change-password-form__input input {
  background-color: rgba(255, 255, 255, 0) !important;
  color: #fff !important;
}

.login-form__addition {
  display: flex;
  justify-content: flex-end;
}

.login-form__addition-forgot {
  text-decoration: none;
}
</style>
