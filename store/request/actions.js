import { Message } from 'element-ui'
import { ERequestStatus, ERequestType } from '~/constants/enums'

export default {
  async getListRequestSend({ rootState, commit }, page) {
    try {
      const data = { employeeId: rootState.auth.id, page }
      let res = await this.$repository.request.getListRequestSend(data)
      await commit('setTotalPageRequestListSend', res.total)
      res = res.applicationsRequestResponseList
      for (let i = 0; i < res.length; i++) {
        res[i].create_date = new Date(res[i].create_date).toLocaleDateString(
          'vi-VN'
        )
        res[i].duration = new Date(res[i].duration).toLocaleDateString('vi-VN')
      }
      await commit('setRequestListSend', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListRequestReceive({ rootState, commit }, page) {
    try {
      const data = { employeeId: rootState.auth.id, page }
      let res = await this.$repository.request.getListRequestReceive(data)
      await commit('setTotalPageRequestListReceive', res.total)
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

  async getListRequestType({ commit, rootState }) {
    try {
      const res = await this.$repository.request.getListRequestType(
        rootState.auth.id
      )
      commit('setListRequestType', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async currentChangePageSend({ dispatch }, page) {
    await dispatch('getListRequestSend', page)
  },

  async currentChangePageReceive({ dispatch }, page) {
    await dispatch('getListRequestReceive', page)
  },

  async handleClickTab({ dispatch, commit }, tab) {
    await commit('setRequestListSelected', 0)
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

  async getDetailSendRequest({ commit }, requestId) {
    try {
      const res = await this.$repository.request.getDetailSendRequest(requestId)
      commit('setRequestSendDetail', res.applicationsRequestResponseList[0])
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getDetailReceiveRequest({ commit }, requestId) {
    try {
      const res = await this.$repository.request.getDetailReceiveRequest(
        requestId
      )
      commit('setRequestReceiveDetail', res.applicationsRequestResponseList[0])
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async onChangeDateRangeSend({ rootState, commit }, value) {
    const data = {
      employeeId: rootState.auth.id,
      page: 1,
      dateRange: value.dateRange,
      requestTypeId: ERequestType[value.requestTypeSearch],
      requestStatusSearch: ERequestStatus[value.requestStatusSearch],
    }
    try {
      let res = await this.$repository.request.getListRequestSendOnFilter(data)
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

  async onChangeDateRangeReceive({ rootState, commit }, value) {
    const data = {
      employeeId: rootState.auth.id,
      page: 1,
      dateRange: value.dateRange,
      requestTypeId: ERequestType[value.requestTypeSearch],
      requestStatusSearch: ERequestStatus[value.requestStatusSearch],
    }
    try {
      let res = await this.$repository.request.getListRequestReceiveOnFilter(
        data
      )
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

  async getListRequestStatus({ commit }) {
    try {
      const res = await this.$repository.request.getListRequestStatus()
      commit('setListRequestStatus', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async createRequest({ commit, state }, requestType) {
    const res = await this.$repository.request.getListRequestName(
      requestType[0]
    )
    await commit('setListRequestName', res)
    await commit('setCurrentRequestTypeId', requestType[0])
    if (requestType[1] === 'Advance') {
      await commit('setRequestAdvanceDialogVisible', true)
    } else if (requestType[1] === 'Behaviour') {
      await commit('setRequestBehaviourDialogVisible', true)
    } else if (requestType[1] === 'Company Asset') {
      await commit('setRequestCompanyAssetDialogVisible', true)
    } else if (requestType[1] === 'Integrity') {
      await commit('setRequestIntegrityDialogVisible', true)
    } else if (requestType[1] === 'Nomination') {
      await commit('setRequestNominationDialogVisible', true)
    } else if (requestType[1] === 'Paid Leave') {
      await commit('setRequestPaidLeaveDialogVisible', true)
    } else if (requestType[1] === 'Tax Enrollment') {
      await commit('setRequestTax EnrollmentDialogVisible', true)
    } else if (requestType[1] === 'Working Schedule') {
      await commit('setRequestWorkingScheduleDialogVisible', true)
    }
  },

  async createRequestTimekeeping({ rootState, state, commit, dispatch }, form) {
    try {
      const data = {
        createEmployeeId: rootState.auth.id,
        requestTypeId: state.currentRequestTypeId,
        requestNameId: state.currentRequestNameId,
        description: form.requestDescription,
        employeeId: rootState.auth.id,
        employeeName: rootState.auth.name,
        date: form.requestDate,
      }
      const res = await this.$repository.request.createRequestTimekeeping(data)
      if (res.code === 202) {
        await dispatch('getListRequestSend', 1)
        await commit('setRequestWorkingScheduleDialogVisible', false)
        await commit('setFullscreenLoading', false)
        Message.success('Gửi yêu cầu thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
