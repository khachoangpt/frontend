import localeVi from 'element-ui/lib/locale/lang/vi'

const vi = {
  login: {
    signIn: 'Đăng nhập',
    password: 'Mật khẩu',
    forgotPassword: 'Quên mật khẩu?',
  },

  forgot: {
    forgotPassword: 'Quên mật khẩu',
    changePassword: 'Đổi mật khẩu',
  },

  changePassword: {
    changePassword: 'Đổi mật khẩu',
    oldPassword: 'Mật khẩu cũ',
    newPassword: 'Mật khẩu mới',
    confirmPassword: 'Nhập lại mật khẩu',
  },

  sidebar: {
    dashboard: 'Màn hình chính',
    workingData: 'Dữ liệu giờ làm',
    timekeeping: 'Chấm công',
    personnel: 'Nhân sự',
    request: 'Yêu cầu',
  },
  datepicker: {
    chooseDay: 'Chọn một ngày',
  },
}

export default {
  ...vi,
  ...localeVi,
}
