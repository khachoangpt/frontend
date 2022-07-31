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
    salary: 'Bảng lương',
    synthetic: 'Tổng hợp',
  },

  datepicker: {
    chooseDay: 'Chọn một ngày',
  },

  personnel: {
    select: 'Chọn',
    addNewEmployee: 'Thêm mới nhân viên',
    fullName: 'Họ và tên',
    dateOfBirth: 'Ngày sinh',
    gender: 'Giới tính',
    phone: 'Số điện thoại',
    personalEmail: 'Email cá nhân',
    role: 'Phân quyền',
    position: 'Vị trí',
    grade: 'Cấp bậc',
    area: 'Phòng ban',
    workingType: 'Loại hình lao động',
    manager: 'Quản lý',
    employeeType: 'Loại nhân sự',
    office: 'Văn phòng làm việc',
    startDate: 'Ngày bắt đầu',
    endDate: 'Ngày kết thúc',
    back: 'Quay lại',
    addEmployee: 'Thêm',
    genderList: {
      male: 'Nam',
      female: 'Nữ',
    },
    roles: {
      Admin: 'Quản trị viên',
      Manager: 'Quản lý',
      User: 'Nhân viên',
    },
    employeeTypes: {
      Trainee: 'Thực tập',
      'Official Employee': 'Nhân viên chính thức',
      'Probationary Staff': 'Nhân viên thử việc',
    },
    validation: {
      fullName: 'Tên không được để trống',
      birthDate: 'Ngày sinh không được để trống',
      gender: 'Giới tính không được để trống',
      phone: 'Số điện thoại không được để trống',
      personalEmail: 'Email không được để trống',
      role: 'Phân quyền không được để trống',
      position: 'Vị trí không được để trống',
      grade: 'Cấp bậc không được để trống',
      area: 'Phòng ban không được để trống',
      workingType: 'Loại hình lao động không được để trống',
      employeeType: 'Loại nhân viên không được để trống',
      office: 'Văn phòng không được để trống',
      startDate: 'Ngày bắt đầu không được để trống',
      endDate: 'Ngày kết thúc không được để trống',
    },
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

  salary: {
    deductionDialog: {
      'Work Late': 'Đi làm muộn',
      'Leave Soon': 'Về sớm',
    },
  },
}

export default {
  ...vi,
  ...localeVi,
}
