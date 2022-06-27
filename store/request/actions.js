import { Message } from 'element-ui'

export default {
  async getListRequestSend({ commit }, page) {
    try {
      const res = await this.$repository.request.getListRequestSend(page)
      for (let i = 0; i < res.length; i++) {
        res[i].create_date = new Date(res[i].create_date).toLocaleDateString(
          'vi-VN'
        )
        res[i].duration = new Date(res[i].duration).toLocaleDateString('vi-VN')
      }
      commit('setRequestListSend', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListRequestReceive({ commit }, page) {
    try {
      const res = await this.$repository.request.getListRequestReceive(page)
      for (let i = 0; i < res.length; i++) {
        res[i].create_date = new Date(res[i].create_date).toLocaleDateString(
          'vi-VN'
        )
        res[i].duration = new Date(res[i].duration).toLocaleDateString('vi-VN')
      }
      commit('setRequestListReceive', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
