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
