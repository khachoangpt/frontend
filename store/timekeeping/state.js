const now = new Date()
const month = now.getMonth()
const year = now.getFullYear()

export default () => ({
  selectedTimeRange: {
    startDate: Date.parse(new Date(year, month, 1)),
    endDate: Date.parse(new Date(year, month + 1, 0)),
  },
  selectedEmployeeName: '',
  listEmployeeTimekeeping: [],
  timekeepingInDay: '',
  allTimeKeeping: '',
  listEmployeeId: [],
  listOfficeFilter: [],
  listAreaFilter: [],
  totalPage: 1,
  workingDataList: [],
  columns: [],
  monthSearch: new Date(),
  isCheckIn: true,
})
