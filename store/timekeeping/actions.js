import { Message } from 'element-ui'
import { format } from 'date-fns'

export default {
  async exportTimekeeping({ state }, data) {
    try {
      if (data === 'excel') {
        await this.$repository.timekeeping
          .exportTimekeeping([state.listEmployeeId, data])
          .then((response) => {
            const url = URL.createObjectURL(new Blob([response]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute(
              'download',
              'timekeeping ' +
                format(new Date(), 'dd-MM-yyyy') +
                ' ' +
                new Date().getHours() +
                new Date().getMinutes() +
                new Date().getSeconds() +
                '.xlsx'
            )
            document.body.appendChild(link)
            link.click()
          })
      } else {
        let res = await this.$repository.timekeeping.exportTimekeeping([
          state.listEmployeeId,
          data,
        ])
        if (!res.match(/^data:text\/csv/i)) {
          res = 'data:text/csv;charset=utf-8,' + res
        }

        const data1 = encodeURI(res)

        const link = document.createElement('a')
        link.setAttribute('href', data1)
        link.setAttribute(
          'download',
          'timekeeping ' +
            format(new Date(), 'dd-MM-yyyy') +
            ' ' +
            new Date().getHours() +
            new Date().getMinutes() +
            new Date().getSeconds()
        )
        link.click()
      }
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

  async getListTimekeepingPersonnel({ rootState, commit }, value) {
    try {
      const data = {
        employeeId: value.employeeId,
        startDate: value.date.startDate,
        endDate: value.date.endDate,
      }
      let res = await this.$repository.timekeeping.getListTimekeepingPersonnel(
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
      if (res !== '') {
        const totalWorkingTime = res.total_working_time + ''
        const time = totalWorkingTime.split('.')
        if (res.total_working_time !== null) {
          res.total_working_time =
            time[0] +
            ' ' +
            this.$i18n.t('timekeeping.dialog.hour') +
            ' ' +
            time[1] +
            ' ' +
            this.$i18n.t('timekeeping.dialog.minute')
        } else {
          res.total_working_time =
            '0 ' + this.$i18n.t('timekeeping.dialog.hour')
        }
        await commit('setTimekeepingInDay', res)
      }
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
        label: this.$i18n.t('workingData.employee'),
        field: 'full_name',
        width: '150px',
      },
      {
        label: this.$i18n.t('workingData.id'),
        field: 'employee_id',
        width: '50px',
      },
    ])
    const date = new Date(data.year, data.month - 1, 1)
    const days = [
      {
        label: this.$i18n.t('workingData.employee'),
        field: 'full_name',
        width: '150px',
      },
      {
        label: this.$i18n.t('workingData.id'),
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
        tdClass:
          date.getDay() === 6 || date.getDay() === 0
            ? 'day-status-weekend'
            : 'day-status',
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

  async checkIn({ commit, dispatch, rootState }) {
    try {
      const res = await this.$repository.timekeeping.checkInCheckOut()
      if (res.code === 201) {
        const date = {
          startDate: Date.parse(
            new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          ),
          endDate: Date.parse(
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          ),
        }
        await dispatch('getEmployeeTimekeepingList', {
          date,
          employeeId: rootState.auth.id,
        })
        await commit('setIsCheckIn', false)
        Message.success(this.$i18n.t('timekeeping.message.checkInSuccess'))
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async checkOut({ commit, dispatch, rootState }) {
    try {
      const res = await this.$repository.timekeeping.checkInCheckOut()
      if (res.code === 201) {
        const date = {
          startDate: Date.parse(
            new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          ),
          endDate: Date.parse(
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          ),
        }
        await dispatch('getEmployeeTimekeepingList', {
          date,
          employeeId: rootState.auth.id,
        })
        await commit('setIsCheckIn', true)
        Message.success(this.$i18n.t('timekeeping.message.checkOutSuccess'))
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
