import { Message } from 'element-ui'
import { format } from 'date-fns'

export default {
  async getPersonnelList({ commit }, data) {
    const res = await this.$repository.user.getPersonnelList(data)
    await commit('setTotalPage', res.total)
    await commit('setPersonnelList', res)
  },

  async addEmployee({ commit, state }, data) {
    try {
      const regexEmpId = /\((.+)\)/i
      const value = JSON.parse(JSON.stringify(data))
      value.managerId = value.managerId.match(regexEmpId)[1]
      value.birthDate = format(new Date(value.birthDate), 'yyyy-MM-dd')
      value.startDate = format(new Date(value.startDate), 'yyyy-MM-dd')
      value.endDate = format(new Date(value.endDate), 'yyyy-MM-dd')
      const res = await this.$repository.user.addEmployee(value)
      if (res.code === 201) {
        Message.success('Thêm nhân viên mới thành công.')
        const res = await this.$repository.user.getPersonnelList({
          searchText: state.searchText,
          page: 1,
        })
        await commit('setPersonnelList', res)
        await commit('setFullscreenLoading', false)
        this.$router.push(this.localePath('/personnel'))
      }
    } catch (error) {
      await commit('setFullscreenLoading', false)
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
    try {
      const res = await this.$repository.user.getEmployeeDetail(employeeId)
      if (res.working_status === 'Active') {
        res.working_status = true
      } else if (res.working_status === 'Deactivate') {
        res.working_status = false
      }
      await commit('setPersonnelDetail', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListGrade({ commit }, data) {
    const res = await this.$repository.user.getListGrade(data)
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
    if (res.length === 1 && res[0].working_history_id === null) {
      await commit('setWorkingHistory', [])
    } else {
      await commit('setWorkingHistory', res)
    }
  },

  async getRelativeInfo({ commit }, data) {
    const res = await this.$repository.user.getRelativeInfo(data)
    if (res.length === 1 && res[0].relative_id === null) {
      await commit('setRelativeInfo', [])
    } else {
      await commit('setRelativeInfo', res)
    }
  },

  async getEducationInfo({ commit }, data) {
    const res = await this.$repository.user.getEducationInfo(data)
    if (res.length === 1 && res[0].education_id === null) {
      await commit('setEducationInfo', [])
    } else {
      await commit('setEducationInfo', res)
    }
  },

  async editBankInfo({ commit, state }, data) {
    try {
      const bankInfoUpdate = {
        id: state.bankInfo.bank_id === null ? null : state.bankInfo.bank_id,
        nameBank: state.bankInfo.name_bank,
        address: state.bankInfo.address,
        accountNumber: state.bankInfo.account_number,
        accountName: state.bankInfo.account_name,
        employeeId: state.personnelDetail.employee_id,
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

  async updateMainInfo({ commit, state }) {
    try {
      const mainInfo = {
        employee_id: state.personnelDetail.employee_id,
        company_email: state.personnelDetail.company_email,
        full_name: state.personnelDetail.full_name,
        gender: state.personnelDetail.gender,
        phone_number: state.personnelDetail.phone_number,
        birth_date: state.personnelDetail.birth_date,
        marital_status: state.personnelDetail.marital_status,
        working_status:
          state.personnelDetail.working_status === 'Active' ||
          state.personnelDetail.working_status === true
            ? 1
            : 0,
        working_contract_id: state.personnelDetail.working_contract_id,
        start_date: state.personnelDetail.start_date,
        end_date: state.personnelDetail.end_date,
        contract_url: state.personnelDetail.contract_url,
        area_id: state.listArea.find(
          (area) => area.name === state.personnelDetail.area_name
        ).area_id,
        office_id: state.listOffice.find(
          (office) => office.name === state.personnelDetail.office_name
        ).office_id,
        job_id: state.listPositions.find(
          (position) =>
            position.position === state.personnelDetail.position_name
        ).job_id,
        grade_id: state.listGrade.find(
          (grade) => grade.name === state.personnelDetail.grade
        ).grade_id,
      }
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
        taxCode: state.taxList.tax_code,
        insuranceId: state.taxList.insurance_id,
        employeeId: state.personnelDetail.employee_id,
        insuranceName: state.taxList.insurance_name,
        insuranceAddress: state.taxList.address,
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
        employeeId: state.personnelDetail.employee_id,
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
          state.personnelDetail.employee_id
        )
        await commit('setWorkingHistory', res)
        await commit('setIsEditLine', '')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async addWorkingHistory({ commit, state }, data) {
    try {
      const workingHistory = {
        employeeId: state.personnelDetail.employee_id,
        companyName: data.company,
        position: data.position,
        startDate: format(data.date[0], 'yyyy-MM-dd'),
        endDate: format(data.date[1], 'yyyy-MM-dd'),
      }
      const res = await this.$repository.user.updateWorkingHistory(
        workingHistory
      )
      if (res.code === 202) {
        Message.success('Thêm lịch sử làm việc thành công.')
        const res = await this.$repository.user.getWorkingHistory(
          state.personnelDetail.employee_id
        )
        await commit('setWorkingHistory', res)
        await commit('setIsEditLine', '')
        await commit('setAddWorkingHistoryVisible', false)
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async updateRelativeInfo({ commit, state }, index) {
    try {
      const relativeInfo = {
        id: state.relativeInfo[index].relative_id,
        parentName: state.relativeInfo[index].parent_name,
        birthDate: state.relativeInfo[index].birth_date,
        relativeTypeId: state.relativeInfo[index].type_id,
        status: state.relativeInfo[index].status,
        contact: state.relativeInfo[index].contact,
        employeeId: state.personnelDetail.employee_id,
      }
      const res = await this.$repository.user.updateRelativeInfo(relativeInfo)
      if (res.code === 202) {
        Message.success('Thay đổi thông tin thành công.')
        const res = await this.$repository.user.getRelativeInfo(
          state.personnelDetail.employee_id
        )
        await commit('setRelativeInfo', res)
        await commit('setIsEditLineRelative', '')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async addRelativeInfo({ commit, state }, data) {},

  async updateEducationInfo({ commit, state }, index) {
    try {
      const educationInfo = {
        id: state.educationInfo[index].education_id,
        nameSchool: state.educationInfo[index].name_school,
        startDate: state.educationInfo[index].start_date,
        endDate: state.educationInfo[index].end_date,
        certificate: state.educationInfo[index].certificate,
        status: state.educationInfo[index].status,
        employeeId: state.personnelDetail.employee_id,
      }
      const res = await this.$repository.user.updateEducationInfo(educationInfo)
      if (res.code === 202) {
        Message.success('Thay đổi thông tin thành công.')
        const res = await this.$repository.user.getEducationInfo(
          state.personnelDetail.employee_id
        )
        await commit('setEducationInfo', res)
        await commit('setIsEditLineEducation', '')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async addEducationInfo({ commit, state }, data) {
    try {
      const workingHistory = {
        employeeId: state.personnelDetail.employee_id,
        nameSchool: data.school,
        certificate: data.certificate,
        startDate: format(data.date[0], 'yyyy-MM-dd'),
        endDate: format(data.date[1], 'yyyy-MM-dd'),
        status: 'End',
      }
      const res = await this.$repository.user.updateEducationInfo(
        workingHistory
      )
      if (res.code === 202) {
        Message.success('Thêm thông tin học vấn thành công.')
        const res = await this.$repository.user.getEducationInfo(
          state.personnelDetail.employee_id
        )
        await commit('setEducationInfo', res)
        await commit('setIsEditLine', '')
        await commit('setAddEducationDialogVisible', false)
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListRoleType({ commit }) {
    try {
      const res = await this.$repository.user.getListRoleType()
      await commit('setRoles', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async searchManager({ commit }, data) {
    try {
      const result = []
      const res = await this.$repository.user.searchManager(data)
      for (let i = 0; i < res.length; i++) {
        result.push({ value: res[i] })
      }
      await commit('setListManager', result)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async onChangePosition({ commit, dispatch, state }, data) {
    await commit('updateWorkingGrade', '')
    if (!isNaN(data)) {
      await dispatch('getListGrade', data)
    } else {
      const positionId = state.listPositions.find(
        (position) => position.position === data
      ).job_id
      await dispatch('getListGrade', positionId)
    }
  },

  async getEmployeeByManager({ commit }) {
    try {
      const result = []
      const res = await this.$repository.user.getEmployeeByManager()
      for (let i = 0; i < res.length; i++) {
        result.push({ value: res[i].name + ' (' + res[i].employeeID + ')' })
      }
      await commit('salary/setListEmployeeByManager', result, { root: true })
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getHoliday({ commit }, data) {
    try {
      const res = await this.$repository.user.getHoliday(data)
      const result = []
      for (let i = 0; i < res.length; i++) {
        result.push({
          highlight: 'yellow',
          dates: [
            {
              end: res[i].end_date,
              start: res[i].start_date,
            },
          ],
          popover: {
            label: res[i].holiday_name,
          },
          holiday_calender_id: res[i].holiday_calender_id,
        })
      }
      await commit('setListHoliday', result)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getWorkingInfo({ commit }, data) {
    try {
      const res = await this.$repository.user.getWorkingInfo(data)
      await commit('setWorkingInfo', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async updateAvatar({ commit, state, dispatch, rootState }, data) {
    try {
      const value = {
        employeeId: state.personnelDetail.employee_id,
        avatar: data,
      }
      const res = await this.$repository.user.updateAvatar(value)
      if (res.code === 202) {
        await dispatch('getPersonnelDetail', state.personnelDetail.employee_id)
        await dispatch('auth/getEmployeeInfo', rootState.auth.id, {
          root: true,
        })
        await commit('setImageUrl', data)
        await commit('setScreenLoadingAvatar', false)
        Message.success('Đổi avatar thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getRoleByEmployee({ commit }, data) {
    try {
      const res = await this.$repository.user.getRoleByEmployee(data)
      commit('setEmployeeRole', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async confirmEditWorkingInfo({ commit, state, dispatch }, employeeId) {
    try {
      const role = state.roles.find(
        (type) => type.role === state.employeeRole.roleName
      ).type_id
      const data = {
        employeeId,
        baseSalary: state.workingInfo.base_salary,
        finalSalary: state.workingInfo.final_salary,
        area: state.listArea.find(
          (area) => area.name === state.workingInfo.area
        ).area_id,
        office: state.listOffice.find(
          (office) => office.name === state.workingInfo.office
        ).office_id,
        position: state.listPositions.find(
          (position) => position.position === state.workingInfo.position
        ).job_id,
        grade: state.listGrade.find(
          (grade) => grade.name === state.workingInfo.grade
        ).grade_id,
        workingTypeId: state.workingTypes.find(
          (workingType) => workingType.name === state.workingInfo.working_type
        ).type_id,
        startDate: state.workingInfo.start_date,
        managerId: state.workingInfo.manager_id,
        employeeType: state.employeeTypes.find(
          (employeeType) =>
            employeeType.name === state.workingInfo.employee_type
        ).type_id,
        salaryContractId: state.workingInfo.salary_contract_id,
        workingContractId: state.workingInfo.working_contract_id,
        workingPlaceId: state.workingInfo.working_place_id,
      }
      const resRole = await this.$repository.user.updateRole({
        roleId: role,
        employeeId,
      })
      const res = await this.$repository.user.confirmEditWorkingInfo(data)
      if (res.code === 202 && resRole.code === 202) {
        await commit('setIsEditWorkInfo', true)
        await dispatch('getWorkingInfo', employeeId)
        if (state.roles.find((role) => role.authority === 'ROLE_ADMIN')) {
          await dispatch('getRoleByEmployee', employeeId)
        }
        Message.success('Sửa thông tin thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async confirmEditAdditionalInfo({ commit, state, dispatch }, employeeId) {
    try {
      const data = {
        address: state.additionInfo.address,
        place_of_residence: state.additionInfo.place_of_residence,
        place_of_origin: state.additionInfo.place_of_origin,
        nationality: state.additionInfo.nationality,
        card_id: state.additionInfo.card_id,
        provideDate: format(
          new Date(state.additionInfo.provideDate),
          'yyyy-MM-dd'
        ),
        providePlace: state.additionInfo.providePlace,
        personal_email: state.additionInfo.personal_email,
        phone_number: state.additionInfo.phone_number,
        nick_name: state.additionInfo.nick_name,
        facebook: state.additionInfo.facebook,
        employee_id: state.personnelDetail.employee_id,
      }
      console.log(data)
      const res = await this.$repository.user.confirmEditAdditionalInfo(data)
      if (res.code === 202) {
        await commit('setIsEditAdditionInfo', true)
        await dispatch('getAdditionInfo', employeeId)
        Message.success('Sửa thông tin thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async addEmployeeByExcel({ commit }, data) {
    try {
      const res = await this.$repository.user.addEmployeeByExcel(data)
      if (res.code === 201) {
        await commit('setFullscreenLoading', false)
        await this.$router.push(this.localePath('/personnel'))
        Message.success('Thêm nhân viên thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
      await commit('setFullscreenLoading', false)
    }
  },

  async onChangeSearchEmployee({ commit, state }) {
    try {
      await commit('setLoadingOnSearchEmployee', true)
      const res = await this.$repository.user.getPersonnelList({
        searchText: state.searchText,
        page: 1,
      })
      await commit('setTotalPage', res.total)
      await commit('setPersonnelList', res)
      await commit('setLoadingOnSearchEmployee', false)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async insertHoliday({ commit, dispatch, state }, data) {
    console.log(data)
    try {
      const value = {
        holiday_name: data.holidayName,
        start_date: format(data.date, 'yyyy-MM-dd'),
        end_date: format(data.date, 'yyyy-MM-dd'),
      }
      const res = await this.$repository.user.insertHoliday(value)
      if (res.code === 201) {
        await dispatch('getHoliday', new Date().getFullYear())
        Message.success('Set holiday successfully')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
