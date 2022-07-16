// import { Message } from 'element-ui'

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
}
