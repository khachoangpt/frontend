import { make } from 'vuex-pathify'
export const state = () => ({
  generalDataChart: {},
  leaveCompanyReasonChart: [],
  paidLeaveReasonChart: [],
})
export const mutations = {
  ...make.mutations(state),
}
export const actions = {
  async getGeneralDataChart({ commit }) {
    const res = await this.$repository.synthetic.getGeneralDataChart()
    for (let i = 0; i < res.seniorityList.length; i++) {
      if (res.seniorityList[i].label === '<1') {
        res.seniorityList[i].label = res.seniorityList[i].label + ' year'
      } else {
        res.seniorityList[i].label = res.seniorityList[i].label + ' years'
      }
    }
    return commit('SET_GENERAL_DATA_CHART', res)
  },

  async getLeaveCompanyReasonChart({ commit }, year) {
    return commit(
      'SET_LEAVE_COMPANY_REASON_CHART',
      await this.$repository.synthetic.getLeaveCompanyReasonChart(year)
    )
  },

  async getPaidLeaveReasonChart({ commit }, { year, employeeId }) {
    return commit(
      'SET_PAID_LEAVE_REASON_CHART',
      await this.$repository.synthetic.getPaidLeaveReasonChart(year, employeeId)
    )
  },
}
export const getters = {
  ...make.getters(state),
}
