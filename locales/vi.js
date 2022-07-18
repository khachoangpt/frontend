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
    policy: 'Chính sách',
    salary: 'Tiền lương',
  },

  datepicker: {
    chooseDay: 'Chọn một ngày',
  },

  timekeeping: {
    status: {
      normal: 'Bình thường',
      late: 'Đi muộn',
      soon: 'Về sớm',
      off: 'Nghỉ',
      paidLeave: 'Nghỉ có phép',
      half: 'Nửa ngày',
      holiday: 'Nghỉ theo lịch',
      overtime: 'Tăng ca',
    },
    dialog: {
      title: 'Dữ liệu giờ làm ngày ',
      totalTime: 'Tổng giờ làm:',
    },
    message: {
      checkInSuccess: 'Check in thành công.',
      checkOutSuccess: 'Check out thành công.',
    },
  },
}

export default {
  ...vi,
  ...localeVi,
}
