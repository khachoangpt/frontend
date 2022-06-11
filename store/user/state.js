export default () => ({
  personnelList: '',
  personnelDetail: '.',
  taxList: '.',
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
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Email',
      field: 'email',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Trạng thái',
      field: 'working_status',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Số điện thoại',
      field: 'phone',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Giới tính',
      field: 'gender',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Ngày sinh',
      field: 'birth_date',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Phòng ban',
      field: 'office_name',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Khu vực',
      field: 'area_name',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Cấp bậc',
      field: 'grade',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Thâm niên',
      field: 'seniority',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Vị trí',
      field: 'position_name',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Loại nhân sự',
      field: 'working_name',
      width: '150px',
      thClass: 'table-header-center',
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
      label: 'Nam',
    },
    {
      value: 'Female',
      label: 'Nữ',
    },
  ],
  roles: [
    {
      value: 'USER',
      label: 'Nhân viên',
    },
    {
      value: 'MANAGER',
      label: 'Quản lý',
    },
    {
      value: 'ADMIN',
      label: 'Quản trị viên',
    },
  ],
  centerDialogVisible: false,
  workingTypes: [],
  listGrade: [],
  listOffice: [],
  listArea: [],
  employeeTypes: [],
})
