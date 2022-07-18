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
    policy: 'Policy',
    salary: 'Salary',
  },
  datepicker: {
    chooseDay: 'Pick a day',
  },

  timekeeping: {
    status: {
      normal: 'Normal',
      late: 'Late',
      soon: 'Leave soon',
      off: 'Off',
      paidLeave: 'Paid leave',
      half: 'Half day',
      holiday: 'Holiday',
      overtime: 'Overtime',
    },
    dialog: {
      title: 'Working data at ',
      totalTime: 'Total working time:',
    },
    message: {
      checkInSuccess: 'Check in successfully.',
      checkOutSuccess: 'Check out successfully.',
    },
  },
}

export default {
  ...en,
  ...localeEn,
}
