<template>
  <div class="forgot-page">
    <el-dropdown class="login-page__language" @command="handleCommand">
      <i class="header__icon">
        <country-flag class="header__language" :country="country" />
      </i>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link class="dropdown-language__item" :to="switchLocalePath('vi')">
          <el-dropdown-item command="vn">Tiếng Việt</el-dropdown-item>
        </nuxt-link>
        <nuxt-link class="dropdown-language__item" :to="switchLocalePath('en')">
          <el-dropdown-item command="us">English</el-dropdown-item>
        </nuxt-link>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="forgot">
      <div class="logo">
        <img class="logo-img" src="/hrm-logo.png" alt="" />
      </div>
      <div class="forgot-form">
        <el-page-header class="header-back" @back="back"> </el-page-header>
        <h2 class="forgot-form__header">
          {{ $i18n.t('forgot.forgotPassword') }}
        </h2>
        <el-form ref="form" :model="form" @submit.native.prevent="forgot(form)">
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
              {{ $i18n.t('forgot.changePassword') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
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

  computed: {
    ...mapGetters('auth', ['country']),
  },

  methods: {
    ...mapActions('auth', ['forgot']),
    ...mapMutations('auth', ['setCountry']),
    handleCommand(command) {
      this.setCountry(command)
    },

    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style>
.forgot-page {
  position: relative;
}

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
  position: relative;
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

.login-page__language {
  float: right;
  position: absolute;
  right: 5%;
}

.header-back {
  position: absolute;
  top: -28px;
  left: 4px;
  color: #fff !important;
}

.header-back:hover {
  color: #08aeea !important;
}

.el-page-header__left::after {
  display: none;
}
</style>
