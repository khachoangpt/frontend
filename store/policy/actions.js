import { Message } from 'element-ui'

export default {
  async getListPolicyByCategory({ commit }, categoryId) {
    try {
      const data = {
        categoryId,
        page: 1,
      }
      const res = await this.$repository.policy.getListPolicyByCategory(data)
      const policyList = res.policyResponseList
      for (let i = 0; i < policyList.length; i++) {
        if (policyList[i].policy_status === true) {
          policyList[i].policy_status = 'Active'
        } else {
          policyList[i].policy_status = 'Deactivate'
        }
      }
      await commit('setPolicyList', policyList)
      await commit('setTotalPage', res.total)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getDetailPolicy({ commit }, policyId) {
    try {
      const data = {
        policyId,
        page: 1,
      }
      const res = await this.$repository.policy.getDetailPolicy(data)
      await commit('setPolicyDetail', res.policyResponseList)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
