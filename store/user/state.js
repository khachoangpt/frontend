export default () => ({
  personnelList: '',
  personnelDetail: '.',
  taxList: [],
  bankInfo: '.',
  additionInfo: '.',
  workingHistory: '.',
  relativeInfo: '.',
  educationInfo: '.',
  columns: [
    {
      label: 'Nhân sự',
      field: 'full_name',
      width: '180px',
      thClass: 'table-header-center',
    },
    {
      label: 'Mã nhân viên',
      field: 'employee_id',
      width: '120px',
      thClass: 'table-header-center',
    },
    {
      label: 'Email',
      field: 'email',
      width: '150px',
      thClass: 'table-header-center',
      sortable: false,
    },
    {
      label: 'Trạng thái',
      field: 'working_status',
      width: '80px',
      thClass: 'table-header-center',
      sortable: false,
    },
    {
      label: 'Số điện thoại',
      field: 'phone',
      width: '130px',
      thClass: 'table-header-center',
      sortable: false,
    },
    {
      label: 'Giới tính',
      field: 'gender',
      width: '80px',
      thClass: 'table-header-center',
      sortable: false,
    },
    {
      label: 'Ngày sinh',
      field: 'birth_date',
      width: '100px',
      thClass: 'table-header-center',
      sortable: false,
    },
    {
      label: 'Phòng ban',
      field: 'office_name',
      width: '150px',
      thClass: 'table-header-center',
      sortable: false,
    },
    {
      label: 'Phòng ban',
      field: 'area_name',
      width: '200px',
      thClass: 'table-header-center',
      sortable: false,
    },
    {
      label: 'Cấp bậc',
      field: 'grade',
      width: '150px',
      thClass: 'table-header-center',
      sortable: false,
    },
    {
      label: 'Thâm niên',
      field: 'seniority',
      width: '150px',
      thClass: 'table-header-center',
      sortable: false,
    },
    {
      label: 'Vị trí',
      field: 'position_name',
      width: '150px',
      thClass: 'table-header-center',
      sortable: false,
    },
    {
      label: 'Loại nhân sự',
      field: 'working_name',
      width: '150px',
      thClass: 'table-header-center',
      sortable: false,
    },
  ],
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
})
