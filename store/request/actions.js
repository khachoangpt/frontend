import { Message } from 'element-ui'

export default {
  async getListRequestSend({ commit }, page) {
    try {
      let res = await this.$repository.request.getListRequestSend(page)
      res = res.applicationsRequestResponseList
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
      let res = await this.$repository.request.getListRequestReceive(page)
      res = res.applicationsRequestResponseList
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

  async getListRequestType({ commit }) {
    try {
      const res = await this.$repository.request.getListRequestType()
      commit('setListRequestType', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async currentChangePageSend(state, page) {
    await this.getListRequestSend(page)
  },

  async currentChangePageReceive(state, page) {
    await this.getListRequestReceive(page)
  },

  async handleClickTab({ dispatch }, tab) {
    if (tab.name === 'first') {
      await dispatch('getListRequestSend', 1)
    } else if (tab.name === 'second') {
      await dispatch('getListRequestReceive', 1)
    }
  },

  async exportRequest({ state }) {
    try {
      let res = await this.$repository.timekeeping.exportRequest(
        state.listEmployeeId
      )
      if (!res.match(/^data:text\/csv/i)) {
        res = 'data:text/csv;charset=utf-8,' + res
      }

      const data1 = encodeURI(res)

      const link = document.createElement('a')
      link.setAttribute('href', data1)
      link.setAttribute('download', 'request')
      link.click()
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
