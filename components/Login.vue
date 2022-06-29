<template>
  <div class="login-page">
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
    <div class="login">
      <div class="logo">
        <img class="logo-img" src="/hrm-logo.png" alt="" />
      </div>
      <div class="login-form">
        <h2 class="login-form__header">{{ $i18n.t('login.signIn') }}</h2>
        <el-form
          id="app"
          ref="form"
          :rules="rules"
          :model="form"
          @submit.native.prevent="login(form)"
        >
          <el-form-item prop="email" :show-message="false">
            <el-input
              v-model="form.email"
              class="login-form__input"
              placeholder="Email"
            >
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :show-message="false">
            <el-input
              v-model="form.password"
              class="login-form__input"
              :placeholder="$i18n.t('login.password')"
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
              <el-link type="primary">{{
                $i18n.t('login.forgotPassword')
              }}</el-link>
            </nuxt-link>
          </div>
          <div class="login-form__submit">
            <el-button
              class="login-form__submit-btn"
              type="primary"
              native-type="submit"
              round
            >
              {{ $i18n.t('login.signIn') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
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
    ...mapGetters('auth', ['isRememberMe', 'rules', 'country']),
  },

  methods: {
    ...mapActions('auth', ['login', 'rememberMe']),
    ...mapMutations('auth', ['setCountry']),
    handleCommand(command) {
      this.setCountry(command)
    },
  },
}
</script>

<style>
.login-page {
  background-color: #08aeea;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('~/static/background-login.jpg');
  position: relative;
}

.login-page__language {
  float: right;
  position: absolute;
  right: 5%;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  color: #fff;
}

.login-form {
  padding: 32px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  min-width: 360px;
  background-color: rgba(255, 255, 255, 0.1);
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

.logo-img {
  width: 80px;
}

.login-form__input input {
  background-color: rgba(255, 255, 255, 0) !important;
  color: #fff !important;
}

.el-link.el-link--primary {
  color: #fff;
}

.el-link.el-link--primary:hover {
  color: #fff;
}
</style>
