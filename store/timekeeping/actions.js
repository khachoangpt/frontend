import { Message } from 'element-ui'

export default {
  async exportTimekeeping({ state }) {
    try {
      let res = await this.$repository.timekeeping.exportTimekeeping(
        state.listEmployeeId
      )
      if (!res.match(/^data:text\/csv/i)) {
        res = 'data:text/csv;charset=utf-8,' + res
      }

      const data1 = encodeURI(res)

      const link = document.createElement('a')
      link.setAttribute('href', data1)
      link.setAttribute('download', 'timekeeping')
      link.click()
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getEmployeeTimekeepingList({ rootState, commit }, selectedTimeRange) {
    try {
      const data = {
        employeeId: rootState.auth.id,
        startDate: selectedTimeRange.startDate,
        endDate: selectedTimeRange.endDate,
      }
      let res = await this.$repository.timekeeping.getEmployeeTimekeepingList(
        data
      )
      res = res.timekeepingResponsesList
      const response = []
      for (let i = 0; i < res[0].timekeepingResponses.length; i++) {
        const attribute = {
          key: i,
          customData: {
            checkIn: res[0].timekeepingResponses[i].first_check_in,
            checkOut: res[0].timekeepingResponses[i].last_check_out,
            status:
              res[0].timekeepingResponses[i].timekeeping_status === 'late'
                ? 'late'
                : res[0].timekeepingResponses[i].timekeeping_status === 'soon'
                ? 'soon'
                : res[0].timekeepingResponses[i].timekeeping_status === 'off'
                ? 'off'
                : res[0].timekeepingResponses[i].timekeeping_status === 'PL'
                ? 'PL'
                : '',
            type:
              res[0].timekeepingResponses[i].timekeeping_status === 'late'
                ? 'danger'
                : res[0].timekeepingResponses[i].timekeeping_status === 'soon'
                ? 'warning'
                : res[0].timekeepingResponses[i].timekeeping_status === 'off'
                ? 'info'
                : res[0].timekeepingResponses[i].timekeeping_status === 'PL'
                ? 'success'
                : '',
            class:
              res[0].timekeepingResponses[i].timekeeping_status === 'normal'
                ? 'el-icon-finished custom-calendar__status-finished'
                : res[0].timekeepingResponses[i].timekeeping_status === 'haft'
                ? 'el-icon-sunrise-1 custom-calendar__status-half'
                : res[0].timekeepingResponses[i].timekeeping_status ===
                  'holiday'
                ? 'el-icon-date custom-calendar__status-holiday'
                : res[0].timekeepingResponses[i].timekeeping_status ===
                  'overtime'
                ? 'el-icon-moon custom-calendar__status-overnight'
                : '',
          },
          dates: new Date(res[0].timekeepingResponses[i].current_date),
        }
        response.push(attribute)
      }
      await commit('setListEmployeeTimekeeping', response)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getDetailTimekeeping({ rootState, commit }, selectedDate) {
    try {
      const data = {
        employeeId: rootState.auth.id,
        date: selectedDate,
      }
      const res = await this.$repository.timekeeping.getDetailTimekeeping(data)
      if (res.total_working_time !== null) {
        const totalWorkingTime = res.total_working_time + ''
        const time = totalWorkingTime.split('.')
        res.total_working_time = time[0] + ' giờ ' + time[1] + ' phút'
      }
      await commit('setTimekeepingInDay', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getAllTimeKeeping({ commit, state }, selectedTimeRange) {
    try {
      const data = {
        startDate: selectedTimeRange[0].startDate,
        endDate: selectedTimeRange[0].endDate,
        filterOffice: state.listOfficeFilter,
        filterArea: state.listAreaFilter,
        page: selectedTimeRange[1],
      }
      let res = await this.$repository.timekeeping.getAllTimeKeeping(data)
      await commit('setTotalPage', res.total)
      res = res.timekeepingResponsesList
      const response = []
      for (let i = 0; i < res.length; i++) {
        const dayList = {}
        dayList.full_name = res[i].full_name
        dayList.employee_id = res[i].employee_id
        for (let j = 0; j < res[i].timekeepingResponses.length; j++) {
          const day = new Date(
            res[i].timekeepingResponses[j].current_date
          ).getDate()
          dayList[day] =
            '<span class="checkin-color">' +
            res[i].timekeepingResponses[j].first_check_in +
            '</span><br/><span>--</span><br/><span class="checkout-color">' +
            res[i].timekeepingResponses[j].last_check_out +
            '</span>'
        }
        response.push(dayList)
      }
      await commit('setAllTimeKeeping', response)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListOffice({ commit }) {
    try {
      const res = await this.$repository.user.getListOffice()
      commit('user/setListOffice', res, { root: true })
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListArea({ commit }) {
    try {
      const res = await this.$repository.user.getListArea()
      commit('user/setListArea', res, { root: true })
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
