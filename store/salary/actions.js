import { Message } from 'element-ui'
// import { EOvertime } from '~/constants/enums'

export default {
  async onChangeMonth({ dispatch, state, commit }) {
    const startDate = new Date(
      state.monthSearch.getFullYear(),
      state.monthSearch.getMonth() + 1,
      1
    )
    const endDate = new Date(
      state.monthSearch.getFullYear(),
      state.monthSearch.getMonth() + 1,
      0
    )
    const timeRange = {
      startDate:
        startDate.getFullYear() +
        '-' +
        (startDate.getMonth() < 10
          ? '0' + startDate.getMonth()
          : startDate.getMonth()) +
        '-' +
        (startDate.getDate() < 10
          ? '0' + startDate.getDate()
          : startDate.getDate()),
      endDate:
        endDate.getFullYear() +
        '-' +
        (endDate.getMonth() + 1 < 10
          ? '0' + (endDate.getMonth() + 1)
          : endDate.getMonth() + 1) +
        '-' +
        (endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate()),
    }
    await commit('setSelectedTimeRange', timeRange)
    await dispatch('getListSalary', 1)
  },

  async onChangeYear({ dispatch, state, commit }) {
    await dispatch('getListPersonalSalary')
  },

  onRowDoubleClick({ commit }, data) {
    try {
      this.$router.push(this.localePath('/salary/' + data.row.salaryMonthlyId))
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListSalary({ commit, state }, page) {
    try {
      const regexEmpId = /\((.+)\)/i
      let employeeID = ''
      if (
        state.searchEmployeeText !== '' &&
        state.searchEmployeeText !== undefined
      ) {
        employeeID = state.searchEmployeeText.value.match(regexEmpId)[1]
      }
      const data = {
        page,
        startDate: state.selectedTimeRange.startDate,
        endDate: state.selectedTimeRange.endDate,
        salaryStatus: state.searchStatusText,
        employeeId: employeeID,
      }
      const res = await this.$repository.salary.getListSalary(data)
      await commit('setSalaryList', res.salaryMonthlyResponses)
      await commit('setTotalPage', res.total)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListPersonalSalary({ commit, state }) {
    try {
      const salaryHistoryList = []
      for (let i = 1; i <= 12; i++) {
        const month = i < 10 ? '0' + i : i
        const endDate = new Date(
          state.yearSearch.getFullYear(),
          Number(month),
          0
        )
        const data = {
          startDate: state.yearSearch.getFullYear() + '-' + month + '-' + '01',
          endDate:
            endDate.getFullYear() +
            '-' +
            (endDate.getMonth() < 10
              ? '0' + (endDate.getMonth() + 1)
              : endDate.getMonth() + 1) +
            '-' +
            (endDate.getDate() < 10
              ? '0' + endDate.getDate()
              : endDate.getDate()),
        }
        const res = await this.$repository.salary.getListPersonalSalary(data)
        if (res.salaryMonthlyResponses.length > 0) {
          const date = new Date(
            Date.parse(res.salaryMonthlyResponses[0].startDate)
          )
          res.salaryMonthlyResponses[0].month = date.getMonth() + 1
          salaryHistoryList.push(res.salaryMonthlyResponses[0])
        }
      }
      await commit('setSalaryHistoryList', salaryHistoryList)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getSalaryDetail({ commit, state }, data) {
    try {
      const res = await this.$repository.salary.getSalaryDetail(data)
      const employee = await this.$repository.user.getEmployeeDetail(
        res.employee_id
      )
      await commit('user/setPersonnelDetail', employee, { root: true })
      await commit('setSalaryDetail', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async exportSalary({ state }) {
    try {
      let res = await this.$repository.salary.exportSalary(state.listSalaryId)
      if (!res.match(/^data:text\/csv/i)) {
        res = 'data:text/csv;charset=utf-8,' + res
      }
      const data = encodeURI(res)

      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', 'salary')
      link.click()
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async editDeduction({ commit, dispatch, state }, data) {
    try {
      const res = await this.$repository.salary.editDeduction(data)
      if (res.code === 201) {
        await dispatch('getSalaryDetail', state.salaryDetail.salary_monthly_id)
        await commit('setEditDeductionDialogVisible', false)
        await Message.success('Sửa khấu trừ thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async deleteDeduction({ commit, dispatch, state }, data) {
    try {
      const res = await this.$repository.salary.deleteDeduction(data)
      if (res.code === 201) {
        await dispatch('getSalaryDetail', state.salaryDetail.salary_monthly_id)
        Message.success('Xóa khấu trừ thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async editAdvance({ commit, dispatch, state }, data) {
    try {
      const res = await this.$repository.salary.editAdvance(data)
      if (res.code === 201) {
        await dispatch('getSalaryDetail', state.salaryDetail.salary_monthly_id)
        await commit('setEditAdvanceDialogVisible', false)
        await Message.success('Sửa tạm ứng thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async deleteAdvance({ commit, dispatch, state }, data) {
    try {
      const res = await this.$repository.salary.deleteAdvance(data)
      if (res.code === 201) {
        await dispatch('getSalaryDetail', state.salaryDetail.salary_monthly_id)
        Message.success('Xóa tạm ứng thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async editBonus({ commit, dispatch, state }, data) {
    try {
      const res = await this.$repository.salary.editBonus(data)
      if (res.code === 201) {
        await dispatch('getSalaryDetail', state.salaryDetail.salary_monthly_id)
        await commit('setEditBonusDialogVisible', false)
        await Message.success('Sửa tiền thưởng thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async deleteBonus({ commit, dispatch, state }, data) {
    try {
      const res = await this.$repository.salary.deleteBonus(data)
      if (res.code === 201) {
        await dispatch('getSalaryDetail', state.salaryDetail.salary_monthly_id)
        Message.success('Xóa tiền thưởng thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async approveSalary({ commit, state, dispatch }) {
    try {
      for (let i = 0; i < state.listSalaryId.length; i++) {
        await this.$repository.salary.approveSalary(state.listSalaryId[i])
      }
      await dispatch('getListSalary', 1)
      Message.success('Xác nhận lương thành công.')
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async rejectSalary({ commit, state, dispatch }, value) {
    try {
      for (let i = 0; i < state.listSalaryId.length; i++) {
        await this.$repository.salary.rejectSalary({
          salaryMonthlyId: state.listSalaryId[i],
          comment: value,
        })
      }
      await dispatch('getListSalary', 1)
      Message.success('Đã từ chối bảng lương.')
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async checkSalary({ commit, state, dispatch }) {
    try {
      const regexEmpId = /\((.+)\)/i
      let employeeID = ''
      if (
        state.searchManagerText !== '' &&
        state.searchManagerText !== undefined
      ) {
        employeeID = state.searchManagerText.value.match(regexEmpId)[1]
      }
      for (let i = 0; i < state.listSalaryId.length; i++) {
        await this.$repository.salary.checkSalary({
          salaryMonthlyId: state.listSalaryId[i],
          salaryStatus: 'PENDING',
          approverId: employeeID,
        })
      }
      await commit('setCheckDialogVisible', false)
      await dispatch('getListSalary', 1)
      Message.success('Chuyển tiếp bảng lương thành công.')
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getManagerOfArea({ commit, state }) {
    try {
      const result = []
      const res = await this.$repository.user.getManagerOfArea()
      for (let i = 0; i < res.length; i++) {
        result.push({ value: res[i].name + ' (' + res[i].employeeID + ')' })
      }
      await commit('setListManagerOfArea', result)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
