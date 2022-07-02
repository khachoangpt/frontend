const now = new Date()
const month = now.getMonth()
const year = now.getFullYear()

export default () => ({
  selectedTimeRange: {
    startDate: Date.parse(new Date(year, month, 1)),
    endDate: Date.parse(new Date(year, month + 1, 0)),
  },
  listEmployeeTimekeeping: [],
  timekeepingInDay: '',
  allTimeKeeping: '',
  listEmployeeId: [],
  listOfficeFilter: [],
  listAreaFilter: [],
  totalPage: 1,
  workingDataList: [],
  columns: [
    {
      label: 'Nhân viên',
      field: 'full_name',
      width: '150px',
    },
    {
      label: 'mã',
      field: 'employee_id',
      width: '50px',
    },
  ],
  monthSearch: new Date(),
})
