import { Message } from 'element-ui'
// import { EOvertime } from '~/constants/enums'

export default {
  async onChangeMonth({ dispatch, state, commit }) {
    const startDate = new Date(
      state.monthSearch.getFullYear(),
      state.monthSearch.getMonth() + 1,
      1
    )
    const endDate = new Date(
      state.monthSearch.getFullYear(),
      state.monthSearch.getMonth() + 1,
      0
    )
    const timeRange = {
      startDate:
        startDate.getFullYear() +
        '-' +
        (startDate.getMonth() < 10
          ? '0' + startDate.getMonth()
          : startDate.getMonth()) +
        '-' +
        (startDate.getDate() < 10
          ? '0' + startDate.getDate()
          : startDate.getDate()),
      endDate:
        endDate.getFullYear() +
        '-' +
        (endDate.getMonth() + 1 < 10
          ? '0' + (endDate.getMonth() + 1)
          : endDate.getMonth() + 1) +
        '-' +
        (endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate()),
    }
    await commit('setSelectedTimeRange', timeRange)
    await dispatch('getListSalary', 1)
  },

  onRowDoubleClick({ commit }, data) {
    try {
      this.$router.push(this.localePath('/salary/' + data.row.salaryMonthlyId))
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListSalary({ commit, state }, page) {
    try {
      const data = {
        page,
        startDate: state.selectedTimeRange.startDate,
        endDate: state.selectedTimeRange.endDate,
      }
      const res = await this.$repository.salary.getListSalary(data)
      await commit('setSalaryList', res.salaryMonthlyResponses)
      await commit('setTotalPage', res.total)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
  async getSalaryDetail({ commit, state }, data) {
    try {
      const res = await this.$repository.salary.getSalaryDetail(data)
      const employee = await this.$repository.user.getEmployeeDetail(
        res.employee_id
      )
      await commit('user/setPersonnelDetail', employee, { root: true })
      await commit('setSalaryDetail', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
