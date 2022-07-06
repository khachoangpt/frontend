import { Message } from 'element-ui'

export default {
  async getListPolicyByCategory({ commit }, categoryId) {
    try {
      const data = {
        categoryId,
        page: 1,
      }
      const res = await this.$repository.policy.getListPolicyByCategory(data)
      commit('setPolicyList', res.policyResponseList)
      commit('setTotalPage', res.total)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
