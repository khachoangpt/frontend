import { Message } from 'element-ui'
import { format } from 'date-fns'
// import { EOvertime } from '~/constants/enums'

export default {
  async onChangeMonth({ dispatch, state, commit }) {
    const startDate = format(state.monthSearch, 'yyyy-MM-dd')
    const endDate = new Date(
      state.monthSearch.getFullYear(),
      state.monthSearch.getMonth() + 1,
      0
    )
    const timeRange = {
      startDate,
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
      await commit('setIsEnoughLevelApprove', res.is_enough_level)
      await commit('setSalaryList', res.salaryMonthlyResponses)
      await commit('setTotalPage', res.total)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListPersonalSalary({ commit, state }) {
    try {
      const salaryHistoryList = []
      const data = {
        startDate: Date.parse(state.yearSearch[0]),
        endDate: Date.parse(state.yearSearch[1]),
      }
      const res = await this.$repository.salary.getListPersonalSalary(data)
      for (let i = 0; i < res.salaryMonthlyResponses.length; i++) {
        const date = new Date(
          Date.parse(res.salaryMonthlyResponses[i].startDate)
        )
        res.salaryMonthlyResponses[i].month =
          date.getMonth() + 1 < 10
            ? String(date.getFullYear()) + '-0' + String(date.getMonth() + 1)
            : String(date.getFullYear()) + '-' + String(date.getMonth() + 1)
        salaryHistoryList.push(res.salaryMonthlyResponses[i])
      }
      await commit('setTotalPage', res.total)
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

  async exportSalary({ state }, payload) {
    console.log(state.listSalaryId[0])
    try {
      let res = []
      if (payload[0] === 'second') {
        if (payload[1] === 'excel') {
          await this.$repository.salary
            .exportSalary([state.listSalaryId, payload[1]])
            .then((response) => {
              const url = URL.createObjectURL(new Blob([response]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute(
                'download',
                'salary ' +
                  format(new Date(), 'dd-MM-yyyy') +
                  ' ' +
                  new Date().getHours() +
                  new Date().getMinutes() +
                  new Date().getSeconds() +
                  '.xlsx'
              )
              document.body.appendChild(link)
              link.click()
            })
        } else {
          res = await this.$repository.salary.exportSalary([
            state.listSalaryId,
            payload[1],
          ])
          if (!res.match(/^data:text\/csv/i)) {
            res = 'data:text/csv;charset=utf-8,' + res
          }
          const data = encodeURI(res)

          const link = document.createElement('a')
          link.setAttribute('href', data)
          link.setAttribute(
            'download',
            'salary ' +
              format(new Date(), 'dd-MM-yyyy') +
              ' ' +
              new Date().getHours() +
              new Date().getMinutes() +
              new Date().getSeconds()
          )
          link.click()
        }
      } else if (payload[0] === 'first') {
        if (payload[1] === 'excel') {
          await this.$repository.salary
            .exportSalaryPersonnel([state.listSalaryId, payload[1]])
            .then((response) => {
              const url = URL.createObjectURL(new Blob([response]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute(
                'download',
                'salary ' +
                  format(new Date(), 'dd-MM-yyyy') +
                  ' ' +
                  new Date().getHours() +
                  new Date().getMinutes() +
                  new Date().getSeconds() +
                  '.xlsx'
              )
              document.body.appendChild(link)
              link.click()
            })
        } else {
          res = await this.$repository.salary.exportSalaryPersonnel([
            state.listSalaryId,
            payload[1],
          ])
          if (!res.match(/^data:text\/csv/i)) {
            res = 'data:text/csv;charset=utf-8,' + res
          }
          const data = encodeURI(res)

          const link = document.createElement('a')
          link.setAttribute('href', data)
          link.setAttribute(
            'download',
            'salary ' +
              format(new Date(), 'dd-MM-yyyy') +
              ' ' +
              new Date().getHours() +
              new Date().getMinutes() +
              new Date().getSeconds()
          )
          link.click()
        }
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async editDeduction({ commit, dispatch, state }, data) {
    try {
      const deductionTypeId = state.listDeductionType.find(
        (type) => type.deduction_type_name === data.deductionTypeId
      ).deduction_type_id
      data.deductionTypeId = deductionTypeId
      const res = await this.$repository.salary.editDeduction(data)
      if (res.code === 201) {
        await dispatch('getSalaryDetail', state.salaryDetail.salary_monthly_id)
        await commit('setEditDeductionDialogVisible', false)
        await Message.success(this.$i18n.t('message.editDeductionSuccess'))
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
        Message.success(this.$i18n.t('message.removeDeductionSuccess'))
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
        await Message.success(this.$i18n.t('message.editAdvanceSuccess'))
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
        Message.success(this.$i18n.t('message.removeAdvanceSuccess'))
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async editBonus({ commit, dispatch, state }, data) {
    try {
      const bonusTypeId = state.listBonusType.find(
        (type) => type.bonus_type_name === data.bonusTypeId
      ).bonus_type_id
      data.bonusTypeId = bonusTypeId
      const res = await this.$repository.salary.editBonus(data)
      if (res.code === 201) {
        await dispatch('getSalaryDetail', state.salaryDetail.salary_monthly_id)
        await commit('setEditBonusDialogVisible', false)
        await Message.success(this.$i18n.t('message.editBonusSuccess'))
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
        Message.success(this.$i18n.t('message.removeBonusSuccess'))
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
      await dispatch('getSalaryDetail', state.listSalaryId[0])
      await dispatch('getListSalary', 1)
      Message.success(this.$i18n.t('message.approvePayrollSuccess'))
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
      await dispatch('getSalaryDetail', state.listSalaryId[0])
      await dispatch('getListSalary', 1)
      Message.success(this.$i18n.t('message.rejectPayrollSuccess'))
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
      await dispatch('getSalaryDetail', state.listSalaryId[0])
      await commit('setCheckDialogVisible', false)
      await dispatch('getListSalary', 1)
      Message.success(this.$i18n.t('message.forwardPayrollSuccess'))
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

  async getManagerLowerOfArea({ commit, state }) {
    try {
      const result = []
      const res = await this.$repository.user.getManagerLowerOfArea()
      for (let i = 0; i < res.length; i++) {
        result.push({ value: res[i].name + ' (' + res[i].employeeID + ')' })
      }
      await commit('user/setListManager', result, { root: true })
      await commit('setListManagerLowerOfArea', result)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getHistorySalary({ commit }, { type, date, employeeId }) {
    const salaryHistory = await this.$repository.salary.getHistorySalary(
      type,
      date,
      employeeId
    )
    await commit('setHistorySalary', salaryHistory)
    return salaryHistory
  },
  async getSalaryStructure({ commit }, { date, employeeId }) {
    const salaryStructure = await this.$repository.salary.getSalaryStructure(
      date,
      employeeId
    )
    await commit('setSalaryStructure', salaryStructure)
    return salaryStructure
  },
  async getOrganizational({ commit }) {
    return await commit(
      'setOrganizational',
      await this.$repository.salary.getOrganizational()
    )
  },
  async getEmployeeById({ commit }) {
    return await commit(
      'setEmployeeById',
      await this.$repository.salary.getEmployeeById()
    )
  },

  async getListDeductionType({ commit }) {
    try {
      const res = await this.$repository.salary.getListDeductionType()
      await commit('setListDeductionType', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListBonusType({ commit }) {
    try {
      const res = await this.$repository.salary.getListBonusType()
      await commit('setListBonusType', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async reGeneratePayroll({ commit }, data) {
    try {
      const res = await this.$repository.salary.reGeneratePayroll(data)
      if (res.code === 201) {
        Message.success(this.$i18n.t('message.reGenerateSuccess'))
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async currentChangeSalary({ dispatch }, data) {
    await dispatch('getListSalary', data)
  },
}
