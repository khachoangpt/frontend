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

  async getEmployeeTimekeepingList({ rootState, commit }, value) {
    try {
      const data = {
        employeeId: value.employeeId,
        startDate: value.date.startDate,
        endDate: value.date.endDate,
      }
      let res = await this.$repository.timekeeping.getEmployeeTimekeepingList(
        data
      )
      await commit(
        'setSelectedEmployeeName',
        res.timekeepingResponsesList[0].full_name
      )
      if (res.timekeepingResponsesList.length === 0) {
        res = []
      } else {
        res = res.timekeepingResponsesList[0].timekeepingResponses
      }
      const response = []
      for (let i = 0; i < res.length; i++) {
        const timekeepingStatus = []
        const types = []
        const classes = []
        for (let j = 0; j < res[i].timekeeping_status.length; j++) {
          timekeepingStatus.push(
            res[i].timekeeping_status[j].timekeeping_status === 'late'
              ? 'late'
              : res[i].timekeeping_status[j].timekeeping_status === 'soon'
              ? 'soon'
              : res[i].timekeeping_status[j].timekeeping_status === 'off'
              ? 'off'
              : res[i].timekeeping_status[j].timekeeping_status === 'PL'
              ? 'PL'
              : ''
          )
          types.push(
            res[i].timekeeping_status[j].timekeeping_status === 'late'
              ? 'danger'
              : res[i].timekeeping_status[j].timekeeping_status === 'soon'
              ? 'warning'
              : res[i].timekeeping_status[j].timekeeping_status === 'off'
              ? 'info'
              : res[i].timekeeping_status[j].timekeeping_status === 'PL'
              ? 'success'
              : ''
          )
          classes.push(
            res[i].timekeeping_status[j].timekeeping_status === 'normal'
              ? 'el-icon-finished custom-calendar__status-finished'
              : res[i].timekeeping_status[j].timekeeping_status === 'haft'
              ? 'el-icon-sunrise-1 custom-calendar__status-half'
              : res[i].timekeeping_status[j].timekeeping_status === 'holiday'
              ? 'el-icon-date custom-calendar__status-holiday'
              : res[i].timekeeping_status[j].timekeeping_status === 'overtime'
              ? 'el-icon-moon custom-calendar__status-overnight'
              : ''
          )
        }
        const attribute = {
          key: i,
          customData: {
            checkIn: res[i].first_check_in,
            checkOut: res[i].last_check_out,
            status: timekeepingStatus,
            type: types,
            class: classes,
          },
          dates: new Date(res[i].current_date),
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
            (res[i].timekeepingResponses[j].first_check_in
              ? res[i].timekeepingResponses[j].first_check_in
              : '') +
            '</span><br/><span>--</span><br/><span class="checkout-color">' +
            (res[i].timekeepingResponses[j].last_check_out
              ? res[i].timekeepingResponses[j].last_check_out
              : '') +
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

  async getDaysInMonth({ commit, state }, data) {
    commit('setColumns', [
      {
        label: 'Nhân viên',
        field: 'full_name',
        width: '150px',
      },
      {
        label: 'Mã',
        field: 'employee_id',
        width: '50px',
      },
    ])
    const date = new Date(data.year, data.month - 1, 1)
    const days = [
      {
        label: 'Nhân viên',
        field: 'full_name',
        width: '150px',
      },
      {
        label: 'Mã',
        field: 'employee_id',
        width: '50px',
      },
    ]
    while (date.getMonth() === data.month - 1) {
      const day = {
        label: date.getDate() + '/' + (date.getMonth() + 1),
        field: date.getDate().toString(),
        width: '50px',
        sortable: false,
        thClass: 'table-header-center',
        tdClass: 'day-status',
        html: true,
      }
      days.push(day)
      date.setDate(date.getDate() + 1)
    }
    await commit('setColumns', days)
    return days
  },

  async onChangeMonth({ dispatch, state, commit }) {
    dispatch('getDaysInMonth', {
      month: state.monthSearch.getMonth() + 1,
      year: state.monthSearch.getFullYear(),
    })
    const timeRange = {
      startDate: Date.parse(
        new Date(
          state.monthSearch.getFullYear(),
          state.monthSearch.getMonth(),
          1
        )
      ),
      endDate: Date.parse(
        new Date(
          state.monthSearch.getFullYear(),
          state.monthSearch.getMonth() + 1,
          0
        )
      ),
    }
    await commit('setSelectedTimeRange', timeRange)
    await dispatch('getAllTimeKeeping', [state.selectedTimeRange, 1])
  },

  async checkIn({ commit }) {
    await commit('setIsCheckIn', false)
    Message.success(this.$i18n.t('timekeeping.message.checkInSuccess'))
  },

  async checkOut({ commit }) {
    await commit('setIsCheckIn', true)
    Message.success(this.$i18n.t('timekeeping.message.checkOutSuccess'))
  },
}
