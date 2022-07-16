const now = new Date()
const month = now.getMonth()
const year = now.getFullYear()

export default () => ({
  monthSearch: new Date(),
  selectedTimeRange: {
    startDate: Date.parse(new Date(year, month, 1)),
    endDate: Date.parse(new Date(year, month + 1, 0)),
  },
})
