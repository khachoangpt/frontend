import { Message } from 'element-ui'

export default {
  async getPersonnelList({ commit }) {
    const res = await this.$repository.user.getPersonnelList()
    commit('setPersonnelList', res)
  },

  async addEmployee({ commit }, data) {
    try {
      const res = await this.$repository.user.addEmployee(data)
      if (res.code === 201) {
        Message.success('Thêm nhân viên mới thành công.')
        const res = await this.$repository.user.getPersonnelList()
        commit('setPersonnelList', res)
        commit('setCenterDialogVisible', false)
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async onRowDoubleClick({ commit }, data) {
    try {
      const employeeId = data.row.employee_id
      const res = await this.$repository.user.getEmployeeDetail(employeeId)
      commit('setPersonnelDetail', res)
      this.$router.push(this.localePath('/personnel/' + employeeId))
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getPersonnelDetail({ commit }, employeeId) {
    const res = await this.$repository.user.getEmployeeDetail(employeeId)
    await commit('setPersonnelDetail', res)
  },

  async getListGrade({ commit }, data) {
    const res = await this.$repository.user.getListGrade()
    await commit('setListGrade', res)
  },

  async getListOffice({ commit }, data) {
    const res = await this.$repository.user.getListOffice()
    await commit('setListOffice', res)
  },

  async getListArea({ commit }, data) {
    const res = await this.$repository.user.getListArea()
    await commit('setListArea', res)
  },

  async getEmployeeTypes({ commit }, data) {
    const res = await this.$repository.user.getEmployeeTypes()
    await commit('setEmployeeTypes', res)
  },

  async getWorkingTypes({ commit }, data) {
    const res = await this.$repository.user.getWorkingTypes()
    await commit('setWorkingTypes', res)
  },

  async getTaxList({ commit }, data) {
    const res = await this.$repository.user.getTaxList(data)
    await commit('setTaxList', res)
  },

  async getBankInfo({ commit }, data) {
    const res = await this.$repository.user.getBankInfo(data)
    await commit('setBankInfo', res)
  },

  async getAdditionInfo({ commit }, data) {
    const res = await this.$repository.user.getAdditionInfo(data)
    await commit('setAdditionInfo', res)
  },

  async getWorkingHistory({ commit }, data) {
    const res = await this.$repository.user.getWorkingHistory(data)
    await commit('setWorkingHistory', res)
  },

  async getRelativeInfo({ commit }, data) {
    const res = await this.$repository.user.getRelativeInfo(data)
    await commit('setRelativeInfo', res)
  },

  async getEducationInfo({ commit }, data) {
    const res = await this.$repository.user.getEducationInfo(data)
    await commit('setEducationInfo', res)
  },
}
