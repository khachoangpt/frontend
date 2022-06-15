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
    if (res[0].working_status === 'Active') {
      res[0].working_status = true
    } else if (res[0].working_status === 'Deactivate') {
      res[0].working_status = false
    }
    await commit('setPersonnelDetail', res)
  },

  async getListGrade({ commit }, data) {
    const res = await this.$repository.user.getListGrade()
    await commit('setListGrade', res)
  },

  async getListPositions({ commit }, data) {
    const res = await this.$repository.user.getListPositions()
    await commit('setListPositions', res)
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

  async editBankInfo({ commit, state }, data) {
    try {
      const bankInfoUpdate = {
        id: state.bankInfo[0].bank_id,
        nameBank: state.bankInfo[0].name_bank,
        address: state.bankInfo[0].address,
        accountNumber: state.bankInfo[0].account_number,
        accountName: state.bankInfo[0].account_name,
        employeeId: state.personnelDetail[0].employee_id,
      }
      const res = await this.$repository.user.editBankInfo(bankInfoUpdate)
      if (res.code === 202) {
        Message.success('Thay đổi thông tin thành công.')
        await commit('setIsEditBankInfo', true)
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async updateMainInfo({ commit, state }, data) {
    try {
      const mainInfo = {
        employee_id: state.personnelDetail[0].employee_id,
        company_email: state.personnelDetail[0].company_email,
        full_name: state.personnelDetail[0].full_name,
        gender: state.personnelDetail[0].gender,
        phone_number: state.personnelDetail[0].phone_number,
        birth_date: state.personnelDetail[0].birth_date,
        marital_status: state.personnelDetail[0].marital_status,
        working_status: state.personnelDetail[0].working_status,
        avatar: state.personnelDetail[0].avatar,
        working_contract_id: state.personnelDetail[0].working_contract_id,
        company_name: state.personnelDetail[0].company_name,
        start_date: state.personnelDetail[0].start_date,
        contract_url: state.personnelDetail[0].contract_url,
        area_id: state.listArea.find(
          (area) => area.name === state.personnelDetail[0].area_name
        ).area_id,
        office_id: state.listOffice.find(
          (office) => office.name === state.personnelDetail[0].office_name
        ).office_id,
        job_id: state.listPositions.find(
          (position) =>
            position.position === state.personnelDetail[0].position_name
        ).job_id,
        grade_id: state.listGrade.find(
          (grade) => grade.name === state.personnelDetail[0].grade
        ).grade_id,
      }
      console.log(mainInfo)
      const res = await this.$repository.user.updateMainInfo(mainInfo)
      if (res.code === 202) {
        Message.success('Thay đổi thông tin thành công.')
        await commit('setIsEditMainInfo', true)
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async updateTaxInfo({ commit, state }) {
    try {
      const taxInfo = {
        taxCode: state.taxList[0].tax_code,
        insuranceId: state.taxList[0].insurance_id,
        employeeId: state.personnelDetail[0].employee_id,
        insuranceName: state.taxList[0].insurance_name,
        insuranceAddress: state.taxList[0].address,
      }
      const res = await this.$repository.user.updateTaxInfo(taxInfo)
      if (res.code === 202) {
        Message.success('Thay đổi thông tin thành công.')
        await commit('setIsEditTaxInfo', true)
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async updateWorkingHistory({ commit, state }, index) {
    try {
      const workingHistory = {
        id: state.workingHistory[index].working_history_id,
        employeeId: state.personnelDetail[0].employee_id,
        companyName: state.workingHistory[index].company_name,
        position: state.workingHistory[index].position,
        startDate: state.workingHistory[index].start_date,
        endDate: state.workingHistory[index].end_date,
      }
      const res = await this.$repository.user.updateWorkingHistory(
        workingHistory
      )
      if (res.code === 202) {
        Message.success('Thay đổi thông tin thành công.')
        const res = await this.$repository.user.getWorkingHistory(
          state.personnelDetail[0].employee_id
        )
        await commit('setWorkingHistory', res)
        await commit('setIsEditLine', '')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async updateRelativeInfo({ commit, state }, index) {
    try {
      const relativeInfo = {
        id: state.relativeInfo[index].relative_id,
        parentName: state.relativeInfo[0].parent_name,
        birthDate: state.relativeInfo[index].birth_date,
        relativeTypeId: state.relativeInfo[index].type_id,
        status: state.relativeInfo[index].status,
        contact: state.relativeInfo[index].contact,
        employeeId: state.personnelDetail[0].employee_id,
      }
      const res = await this.$repository.user.updateRelativeInfo(relativeInfo)
      if (res.code === 202) {
        Message.success('Thay đổi thông tin thành công.')
        const res = await this.$repository.user.getRelativeInfo(
          state.personnelDetail[0].employee_id
        )
        await commit('setRelativeInfo', res)
        await commit('setIsEditLineRelative', '')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async updateEducationInfo({ commit, state }, index) {
    try {
      const educationInfo = {
        id: state.educationInfo[index].education_id,
        nameSchool: state.educationInfo[0].name_school,
        startDate: state.educationInfo[index].start_date,
        endDate: state.educationInfo[index].end_date,
        certificate: state.educationInfo[index].certificate,
        status: state.educationInfo[index].status,
        employeeId: state.personnelDetail[0].employee_id,
      }
      const res = await this.$repository.user.updateEducationInfo(educationInfo)
      if (res.code === 202) {
        Message.success('Thay đổi thông tin thành công.')
        const res = await this.$repository.user.getEducationInfo(
          state.personnelDetail[0].employee_id
        )
        await commit('setEducationInfo', res)
        await commit('setIsEditLineEducation', '')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
