export default () => ({
  personnelList: '',
  columns: [
    {
      label: 'Nhân sự',
      field: 'full_name',
      width: '150px',
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
      field: 'work_status',
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
      label: 'Công việc',
      field: 'job',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Phòng ban',
      field: 'office',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Khu vực',
      field: 'area',
      width: '150px',
      thClass: 'table-header-center',
    },
    {
      label: 'Hợp đồng',
      field: 'contract',
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
      label: 'Ngày vào làm',
      field: 'start_date',
      width: '150px',
      thClass: 'table-header-center',
    },
  ],
  workingStatus: [
    {
      value: 'Đang làm việc',
      label: 'Đang làm việc',
      width: '150px',
    },
    {
      value: 'Không đi làm',
      label: 'Không đi làm',
      width: '150px',
    },
  ],
})
