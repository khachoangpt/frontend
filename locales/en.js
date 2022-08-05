import localeEn from 'element-ui/lib/locale/lang/en'

const en = {
  dashboard: {
    holidayCompany: 'Company day off',
    salaryHistory: 'Salary history',
    month: 'Month',
    year: 'Year',
    salaryStructure: 'Salary structure',
    organization: 'Organization structure',
  },

  login: {
    signIn: 'Sign in',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    passwordIncorrect: 'The password is incorrect. Try again.',
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
    salary: 'Payroll',
    synthetic: 'Synthetic',
  },
  datepicker: {
    chooseDay: 'Pick a day',
  },

  personnel: {
    select: 'Select',
    addNewEmployee: 'Add new employee',
    fullName: 'Full name',
    dateOfBirth: 'Date of birth',
    gender: 'Gender',
    phone: 'Phone number',
    personalEmail: 'Personal email',
    role: 'Role',
    position: 'Position',
    grade: 'Grade',
    area: 'Area',
    workingType: 'Working type',
    manager: 'Manager',
    employeeType: 'Employee type',
    office: 'Office',
    startDate: 'Start date',
    endDate: 'End date',
    back: 'Back',
    addEmployee: 'Add employee',
    genderList: {
      male: 'Male',
      female: 'Female',
    },
    roles: {
      Admin: 'Admin',
      Manager: 'Manager',
      User: 'Employee',
    },
    employeeTypes: {
      Trainee: 'Trainee',
      'Official Employee': 'Official Employee',
      'Probationary Staff': 'Probationary Staff',
    },
    validation: {
      fullName: 'Full name is not empty',
      birthDate: 'Date of birth is not empty',
      gender: 'Gender is not empty',
      phone: 'Phone number is not empty',
      personalEmail: 'Personal email is not empty',
      role: 'Role is not empty',
      position: 'Position is not empty',
      grade: 'Grade is not empty',
      area: 'Area is not empty',
      workingType: 'Working type is not empty',
      employeeType: 'Employee type is not empty',
      office: 'Office is not empty',
      startDate: 'Start date is not empty',
      endDate: 'End date is not empty',
    },
    detail: {
      personalInfo: 'Personal information',
      changePassword: 'Change password',
      mainInfo: 'Main information',
      editMainInfo: 'Edit main information',
      close: 'Close',
      confirm: 'Confirm',
      fullName: 'Full Name',
      employeeId: 'Employee ID',
      startDate: 'Start date',
      endDate: 'End date',
      workingStatus: 'Working status',
      contractUrl: 'Current Contract',
      phoneNumber: 'Phone Number',
      grade: 'Grade',
      birthDate: 'Date of Birth',
      gender: 'Gender',
      maritalStatus: 'Marriage Status',
      office: 'Office',
      workingSchedule: 'Working Schedule',
      position: 'Position',
      area: 'Area',
    },
  },

  timekeeping: {
    workingDataOf: 'Working data of:',
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
      firstCheckIn: 'First check-in:',
      lastCheckOut: 'Last check-out:',
      history: 'Check-in/Check-out history',
      hour: 'hour(s)',
      minute: 'minute(s)',
    },
    message: {
      checkInSuccess: 'Check in successfully.',
      checkOutSuccess: 'Check out successfully.',
    },
  },

  workingData: {
    workingData: 'Working data',
    employee: 'Employee',
    id: 'ID',
  },

  salary: {
    deductionDialog: {
      'Work Late': 'Work Late',
      'Leave Soon': 'Leave Soon',
    },
  },
}

export default {
  ...en,
  ...localeEn,
}
