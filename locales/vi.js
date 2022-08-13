import localeVi from 'element-ui/lib/locale/lang/vi'

const vi = {
  dashboard: {
    holidayCompany: 'Ngày nghỉ của công ty',
    salaryHistory: 'Lịch sử lương',
    month: 'Tháng',
    year: 'Năm',
    salaryStructure: 'Cơ cấu lương',
    organization: 'Cơ cấu tổ chức',
  },

  login: {
    signIn: 'Đăng nhập',
    password: 'Mật khẩu',
    forgotPassword: 'Quên mật khẩu?',
    passwordIncorrect: 'Mật khẩu không đúng. Hãy nhập lại.',
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
    collapse: 'Thu gọn',
    expand: 'Mở rộng',
    logout: 'Đăng xuất',
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
    baseSalary: 'Lương cơ bản',
    salary: 'Lương',
    back: 'Quay lại',
    addEmployee: 'Thêm',
    listOfPersonnel: 'Danh sách nhân sự',
    search: 'Tìm kiếm',
    addNew: 'Thêm mới',
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
      baseSalary: 'Lương cơ bản không được để trống',
      salary: 'Lương không được để trống',
      number: 'Nhập vào một số',
    },

    detail: {
      personalInfo: 'Thông tin cá nhân',
      changePassword: 'Đổi mật khẩu',
      mainInfo: 'Thông tin chính',
      editMainInfo: 'Sửa thông tin chính',
      close: 'Đóng',
      confirm: 'Xác nhận',
      fullName: 'Họ và tên',
      employeeId: 'Mã nhân sự',
      startDate: 'Ngày bắt đầu',
      endDate: 'Ngày kết thúc',
      workingStatus: 'Tình trạng làm việc ',
      contractUrl: 'Hợp đồng hiện tại',
      phoneNumber: 'Số điện thoại',
      grade: 'Cấp bậc',
      birthDate: 'Ngày sinh ',
      gender: 'Giới tính',
      maritalStatus: 'Tình trạng hôn nhân',
      office: 'Văn phòng',
      workingSchedule: 'Lịch làm việc',
      position: 'Vị trí',
      area: 'Phòng ban',
      alone: 'Độc thân',
      married: 'Đã có gia đình',
      male: 'Nam',
      female: 'Nữ',
      mainInfoDetail: 'Thông tin cơ bản của nhân viên',
      jobInfo: 'Thông tin công việc',
      jobInfoDetail: 'Lương, công việc, sự nghiệp',
      taxInfo: 'Thuế & bảo hiểm',
      taxInfoDetail: 'Thông tin thuế và bảo hiểm',
      bankInfo: 'Thông tin ngân hàng',
      bankInfoDetail: 'Ngân hàng, địa chỉ, số tài khoản',
      additionalInfo: 'Thông tin thêm',
      additionalInfoDetail: 'Địa chỉ, chứng minh thư, LinkedIn, Facebook',
      workingHistoryInfo: 'Lịch sử làm việc',
      workingHistoryInfoDetail: 'Công ty, vị trí, khoảng thời gian',
      educationInfo: 'Học vấn',
      educationInfoDetail: 'Trường, thời gian, bằng cấp',
      editJobInformation: 'Sửa thông tin công việc',
      salary: 'Lương',
      baseSalary: 'Lương cơ bản',
      personnelClassification: 'Phân loại nhân sự',
      manager: 'Quản lý',
      role: 'Phân quyền',
      taxCode: 'Mã số thuế',
      editTaxInfo: 'Sửa thông tin pháp lý',
      insurance: 'Bảo hiểm',
      insuranceNumber: 'Mã số BHXH',
      placeRegistration: 'Nơi đăng ký',
      accountName: 'Tên chủ tài khoản',
      editBankInfo: 'Sửa thông tin ngân hàng',
      bank: 'Ngân hàng',
      address: 'Địa chỉ',
      accountNumber: 'Số tài khoản',
      editAdditionalInfo: 'Sửa thông tin thêm',
      currentAddress: 'Địa chỉ hiện tại',
      placeOfBirth: 'Nơi sinh',
      permanentResidence: 'Hộ khẩu thường trú',
      idCard: 'CCCD',
      providedPlace: 'Nơi cấp',
      providedDate: 'Ngày cấp',
      nationality: 'Quốc tịch',
      otherEmail: 'Email khác',
      otherPhone: 'Số điện thoại khác',
      addWorkingHistory: 'Thêm lịch sử làm việc',
      company: 'Công ty',
      timePeriod: 'Khoảng thời gian',
      validateCompany: 'Tên công ty không được để trống.',
      validatePosition: 'Vị trí không được để trống.',
      validateTime: 'Thời gian không được để trống.',
      addEducationInfo: 'Thêm thông tin học vấn',
      school: 'Trường học',
      degree: 'Bằng cấp',
      validateSchool: 'Trường học không được để trống.',
      validateDegree: 'Bằng cấp không được để trống.',
      changeAvatar: 'Đổi avatar',
      seniority: 'Thâm niên',
    },
    table: {
      personnel: 'Nhân sự',
    },
  },

  timekeeping: {
    workingDataOf: 'Dữ liệu giờ làm của:',
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
      firstCheckIn: 'Check-in lần đầu:',
      lastCheckOut: 'Check-out lần cuối:',
      history: 'Lịch sử check-in/check-out',
      hour: 'giờ',
      minute: 'phút',
    },
    message: {
      checkInSuccess: 'Check in thành công.',
      checkOutSuccess: 'Check out thành công.',
    },
  },

  workingData: {
    workingData: 'Dữ liệu giờ làm',
    employee: 'Nhân viên',
    id: 'Mã',
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
