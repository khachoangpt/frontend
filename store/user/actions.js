import { Message } from 'element-ui'

export default {
  async getPersonnelList({ commit }) {
    const res = await this.$repository.user.getPersonnelList()
    commit('setPersonnelList', res)
  },

  async addEmployee({ commit }, data) {
    try {
      const res = await this.$repository.user.addEmployee(data)
      if(res.code === 201) {
        Message.success('Thêm nhân viên mới thành công.')
        this.getPersonnelList()
        commit('setCenterDialogVisible', true)
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
