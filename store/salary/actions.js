import { Message } from 'element-ui'

export default {
  async onChangeMonth({ dispatch, state, commit }) {
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
  },

  async onRowDoubleClick({ commit }, data) {
    try {
      const employeeId = data.row.employee_id
      const res = await this.$repository.user.getEmployeeDetail(employeeId)
      commit('user/setPersonnelDetail', res, { root: true })
      this.$router.push(this.localePath('/salary/' + employeeId))
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
