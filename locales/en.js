import localeEn from 'element-ui/lib/locale/lang/en'

const en = {
  login: {
    signIn: 'Sign in',
    password: 'Password',
    forgotPassword: 'Forgot password?',
  },

  forgot: {
    forgotPassword: 'Forgot password',
    changePassword: 'Change password',
  },

  changePassword: {
    changePassword: 'Change password',
    oldPassword: 'Old password',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
  },

  sidebar: {
    dashboard: 'Dashboard',
    workingData: 'Working Data',
    timekeeping: 'Timekeeping',
    personnel: 'Personnel',
    request: 'Request',
  },
  datepicker: {
    chooseDay: 'Pick a day',
  },
}

export default {
  ...en,
  ...localeEn,
}
