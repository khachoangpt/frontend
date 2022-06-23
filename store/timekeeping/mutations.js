export default {
  setSelectedTimeRange(state, selectedTimeRange) {
    state.selectedTimeRange = selectedTimeRange
  },

  setListEmployeeTimekeeping(state, listEmployeeTimekeeping) {
    state.listEmployeeTimekeeping = listEmployeeTimekeeping
  },

  setTimekeepingInDay(state, timekeepingInDay) {
    state.timekeepingInDay = timekeepingInDay
  },

  setAllTimeKeeping(state, allTimeKeeping) {
    state.allTimeKeeping = allTimeKeeping
  },

  setListEmployeeId(state, listEmployeeId) {
    state.listEmployeeId = listEmployeeId
  },

  setListOfficeFilter(state, listOfficeFilter) {
    state.listOfficeFilter = listOfficeFilter
  },

  setListAreaFilter(state, listAreaFilter) {
    state.listAreaFilter = listAreaFilter
  },

  setTotalPage(state, totalPage) {
    state.totalPage = totalPage
  },
}
