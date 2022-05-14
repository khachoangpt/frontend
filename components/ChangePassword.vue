<template>
  <div>
    <div class="change-password">
      <div class="logo">
        <img class="logo-img" src="/hrm-logo.png" alt="" />
      </div>
      <div class="change-password-form">
        <h2 class="change-password-form__header">Change password</h2>
        <el-form
          ref="form"
          status-icon
          :rules="rules"
          :model="form"
          @submit.native.prevent="submitForm('form')"
        >
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="Password"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="passwordConfirm">
            <el-input
              v-model="form.passwordConfirm"
              placeholder="Confirm password"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <div class="change-password-form__submit">
            <el-button
              class="change-password-form__submit-btn"
              type="primary"
              round
              native-type="submit"
              >Change password</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangePasswordComponent',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.form.passwordConfirm !== '') {
          this.$refs.form.validateField('passwordConfirm')
        }
        callback()
      }
    }
    const validatePassConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        passwordConfirm: '',
      },
      rules: {
        password: [
          {
            validator: validatePass,
            trigger: 'blur',
          },
        ],
        passwordConfirm: [
          {
            validator: validatePassConfirm,
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
          this.$message({
            message: 'Change password successfully',
            type: 'success',
          })
          this.$router.push('/login')
        } else {
          alert('error submit!')
          return false
        }
      })
    },
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
  background-image: linear-gradient(0deg, #08aeea 0%, #2af598 100%);
}

.change-password-form {
  padding: 32px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  min-width: 360px;
  background-color: #fff;
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
</style>
