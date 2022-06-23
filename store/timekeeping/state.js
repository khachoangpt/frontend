const now = new Date()
const month = now.getMonth()
const year = now.getFullYear()
// const day = now.getDate()

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
})
