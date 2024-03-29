export default () => ({
  personnelList: '',
  personnelDetail: '.',
  taxList: [],
  bankInfo: '.',
  additionInfo: '.',
  workingHistory: '.',
  relativeInfo: '.',
  educationInfo: '.',
  workingStatus: [
    {
      value: 'Active',
      label: 'Đang làm việc',
      width: '150px',
    },
    {
      value: 'Deactive',
      label: 'Không đi làm',
      width: '150px',
    },
  ],
  genderList: [
    {
      value: 'Male',
      label: 'male',
    },
    {
      value: 'Female',
      label: 'female',
    },
  ],
  roles: [],
  workingTypes: [],
  listGrade: [],
  listOffice: [],
  listArea: [],
  employeeTypes: [],
  listPositions: [],
  isEditAdditionInfo: true,
  isEditWorkInfo: true,
  isEditTaxInfo: true,
  isEditBankInfo: true,
  isEditMainInfo: true,
  isEditLine: '',
  isEditLineRelative: '',
  isEditLineEducation: '',
  searchText: '',
  totalPage: 1,
  fullscreenLoading: false,
  listManager: [],
  listHoliday: [],
  workingInfo: {
    final_salary: '',
    base_salary: '',
    office: '',
    area: '',
    position: '',
    grade: '',
    working_type: '',
    start_date: '',
    employee_type: '',
    manager_id: '',
    manager_name: '',
    salary_contract_id: '',
    working_contract_id: '',
    working_place_id: '',
    newWorkingInfo: {
      final_salary: '',
      base_salary: '',
      office: '',
      area: '',
      position: '',
      grade: '',
      working_type: '',
      start_date: '',
      employee_type: '',
      manager_id: '',
      manager_name: '',
      salary_contract_id: '',
      working_contract_id: '',
      working_place_id: '',
    },
  },
  addWorkingHistoryVisible: false,
  addRelativeDialogVisible: false,
  addEducationDialogVisible: false,
  screenLoadingAvatar: false,
  imageUrl: '',
  employeeRole: '',
  employeeNameSalaryHistory: '',
  employeeNameSalaryStructure: '',
  loadingOnSearchEmployee: false,
  dateRangeHoliday: '',
  enableEditCalendar: false,
  personalListSelected: 0,
  listPersonalId: [],
  listEmployeeAutocomplete: [],
})
