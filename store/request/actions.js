import { Message } from 'element-ui'
import { format } from 'date-fns'
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
      await commit('setRequestListReceive', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getListRequestType({ commit, rootState }) {
    try {
      const res = await this.$repository.request.getListRequestType(
        rootState.auth.id
      )
      const result = []
      for (let i = 0; i < res.length; i++) {
        if (res[i].request_type_name === 'Tax Enrollment') {
          continue
        }
        if (
          rootState.auth.roles.find(
            (role) =>
              role.authority === 'ROLE_USER' &&
              res[i].request_type_name === 'Nomination'
          )
        ) {
          continue
        }
        result.push(res[i])
      }
      commit('setListRequestType', result)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async currentChangePageSend({ dispatch }, page) {
    await dispatch('onChangeDateRangeSend', page)
  },

  async currentChangePageReceive({ dispatch }, page) {
    await dispatch('onChangeDateRangeReceive', page)
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
      // const regexEmpId = /\[(.+)\]/m
      // const arrayRegex =
      //   res.applicationsRequestResponseList[0].description.match(
      //     regexEmpId
      //   )
      // console.log(arrayRegex)
      commit('setRequestReceiveDetail', res.applicationsRequestResponseList[0])
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async onChangeDateRangeSend({ rootState, commit, state }, page) {
    const data = {
      employeeId: rootState.auth.id,
      page,
      dateRange: state.dateRangeFilter === null ? [] : state.dateRangeFilter,
      requestTypeId: ERequestType[state.requestTypeFilter],
      requestStatusSearch: ERequestStatus[state.requestStatusFilter],
    }
    if (data.dateRange.length > 0) {
      const dateFrom = new Date(data.dateRange[0]).setHours(0, 0, 1)
      const dateTo = new Date(data.dateRange[1]).setHours(23, 59, 59)
      data.dateRange = [dateFrom, dateTo]
    }
    try {
      let res = await this.$repository.request.getListRequestSendOnFilter(data)
      await commit('setTotalPageRequestListSend', res.total)
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

  async onChangeDateRangeReceive({ rootState, commit, state }, page) {
    const data = {
      employeeId: rootState.auth.id,
      page,
      dateRange: state.dateRangeFilter === null ? [] : state.dateRangeFilter,
      requestTypeId: ERequestType[state.requestTypeFilter],
      requestStatusSearch: ERequestStatus[state.requestStatusFilter],
    }
    if (data.dateRange.length > 0) {
      const dateFrom = new Date(data.dateRange[0]).setHours(0, 0, 1)
      const dateTo = new Date(data.dateRange[1]).setHours(23, 59, 59)
      data.dateRange = [dateFrom, dateTo]
    }
    try {
      let res = await this.$repository.request.getListRequestReceiveOnFilter(
        data
      )
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
      await commit('setRequestTaxEnrollmentDialogVisible', true)
    } else if (requestType[1] === 'Working Time') {
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
      const res = await this.$repository.request.createRequest(data)
      if (res.code === 202) {
        await dispatch('getListRequestSend', 1)
        await commit('setRequestWorkingScheduleDialogVisible', false)
        await commit('setFullscreenLoading', false)
        Message.success('Gửi yêu cầu thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
      await commit('setFullscreenLoading', false)
    }
  },

  async createRequestOT({ rootState, state, commit, dispatch }, form) {
    try {
      const data = {
        createEmployeeId: rootState.auth.id,
        requestTypeId: state.currentRequestTypeId,
        requestNameId: state.currentRequestNameId,
        description: form.requestDescription,
        employeeId: rootState.auth.id,
        employeeName: rootState.auth.name,
        startDate:
          form.requestTimeOT[0].getFullYear() +
          '-' +
          (form.requestTimeOT[0].getMonth() + 1 < 10
            ? '0' + (form.requestTimeOT[0].getMonth() + 1)
            : form.requestTimeOT[0].getMonth() + 1) +
          '-' +
          (form.requestTimeOT[0].getDate() < 10
            ? '0' + form.requestTimeOT[0].getDate()
            : form.requestTimeOT[0].getDate()),
        endDate:
          form.requestTimeOT[1].getFullYear() +
          '-' +
          (form.requestTimeOT[1].getMonth() + 1 < 10
            ? '0' + (form.requestTimeOT[1].getMonth() + 1)
            : form.requestTimeOT[1].getMonth() + 1) +
          '-' +
          (form.requestTimeOT[1].getDate() < 10
            ? '0' + form.requestTimeOT[1].getDate()
            : form.requestTimeOT[1].getDate()),
        startTime:
          (form.requestTimeOT[0].getHours() < 10
            ? '0' + form.requestTimeOT[0].getHours()
            : form.requestTimeOT[0].getHours()) +
          ':' +
          (form.requestTimeOT[0].getMinutes() < 10
            ? '0' + form.requestTimeOT[0].getMinutes()
            : form.requestTimeOT[0].getMinutes()),
        endTime:
          (form.requestTimeOT[1].getHours() < 10
            ? '0' + form.requestTimeOT[1].getHours()
            : form.requestTimeOT[1].getHours()) +
          ':' +
          (form.requestTimeOT[1].getMinutes() < 10
            ? '0' + form.requestTimeOT[1].getMinutes()
            : form.requestTimeOT[1].getMinutes()),
      }
      const res = await this.$repository.request.createRequest(data)
      if (res.code === 202) {
        await dispatch('getListRequestSend', 1)
        await commit('setRequestWorkingScheduleDialogVisible', false)
        await commit('setFullscreenLoading', false)
        Message.success('Gửi yêu cầu thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
      await commit('setFullscreenLoading', false)
    }
  },

  async createRequestPaidLeave({ rootState, state, commit, dispatch }, form) {
    try {
      const data = {
        createEmployeeId: rootState.auth.id,
        requestTypeId: state.currentRequestTypeId,
        requestNameId: state.currentRequestNameId,
        description:
          form.requestDescription === ''
            ? 'Description'
            : form.requestDescription,
        startDate:
          form.requestDateRange[0].getFullYear() +
          '-' +
          (form.requestDateRange[0].getMonth() + 1 < 10
            ? '0' + (form.requestDateRange[0].getMonth() + 1)
            : form.requestDateRange[0].getMonth() + 1) +
          '-' +
          (form.requestDateRange[0].getDate() < 10
            ? '0' + form.requestDateRange[0].getDate()
            : form.requestDateRange[0].getDate()),
        endDate:
          form.requestDateRange[1].getFullYear() +
          '-' +
          (form.requestDateRange[1].getMonth() + 1 < 10
            ? '0' + (form.requestDateRange[1].getMonth() + 1)
            : form.requestDateRange[1].getMonth() + 1) +
          '-' +
          (form.requestDateRange[1].getDate() < 10
            ? '0' + form.requestDateRange[1].getDate()
            : form.requestDateRange[1].getDate()),
        reason: state.currentRequestReasonId,
      }
      const res = await this.$repository.request.createRequest(data)
      if (res.code === 202) {
        await dispatch('getListRequestSend', 1)
        await commit('setRequestPaidLeaveDialogVisible', false)
        await commit('setFullscreenLoading', false)
        Message.success('Gửi yêu cầu thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
      await commit('setFullscreenLoading', false)
    }
  },

  async createRequestBonus({ rootState, state, commit, dispatch }, form) {
    try {
      const data = {
        createEmployeeId: rootState.auth.id,
        requestTypeId: state.currentRequestTypeId,
        requestNameId: state.currentRequestNameId,
        description: form.requestDescription,
        employeeId: rootState.auth.id,
        employeeName: rootState.auth.name,
        date:
          form.requestDate.getFullYear() +
          '-' +
          (form.requestDate.getMonth() + 1 < 10
            ? '0' + (form.requestDate.getMonth() + 1)
            : form.requestDate.getMonth() + 1) +
          '-' +
          (form.requestDate.getDate() < 10
            ? '0' + form.requestDate.getDate()
            : form.requestDate.getDate()),
        currentTitle: 'DEV 1',
        currentArea: 'IT',
        currentOffice: 'HaNoi',
        value: form.bonusValue,
      }
      const res = await this.$repository.request.createRequest(data)
      if (res.code === 202) {
        await dispatch('getListRequestSend', 1)
        await commit('setRequestNominationDialogVisible', false)
        await commit('setFullscreenLoading', false)
        Message.success('Gửi yêu cầu thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
      await commit('setFullscreenLoading', false)
    }
  },

  async createRequestSalaryIncrement(
    { rootState, state, commit, dispatch },
    form
  ) {
    try {
      const regexEmp = /(.+)\((.+)\)/i
      const employeeId = form.employeeName.match(regexEmp)[2]
      const employeeName = form.employeeName.match(regexEmp)[1]
      const data = {
        createEmployeeId: rootState.auth.id,
        requestTypeId: String(state.currentRequestTypeId),
        requestNameId: String(state.currentRequestNameId),
        description: form.description,
        employeeId,
        employeeName,
        date: format(form.requestDate, 'yyyy-MM-dd'),
        currentTitle: rootState.user.position,
        currentArea: rootState.user.grade,
        value: String(form.salary),
        type: form.type,
      }
      const res = await this.$repository.request.createRequest(data)
      if (res.code === 202) {
        await dispatch('getListRequestSend', 1)
        await commit('setRequestNominationDialogVisible', false)
        await commit('setFullscreenLoading', false)
        Message.success('Gửi yêu cầu thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
      await commit('setFullscreenLoading', false)
    }
  },

  async createRequestAdvance({ rootState, state, commit, dispatch }, form) {
    try {
      const data = {
        createEmployeeId: rootState.auth.id,
        requestTypeId: state.currentRequestTypeId,
        requestNameId: state.currentRequestNameId,
        description: form.requestDescription,
        employeeId: rootState.auth.id,
        employeeName: rootState.auth.name,
        date:
          form.requestDate.getFullYear() +
          '-' +
          (form.requestDate.getMonth() + 1 < 10
            ? '0' + (form.requestDate.getMonth() + 1)
            : form.requestDate.getMonth() + 1) +
          '-' +
          (form.requestDate.getDate() < 10
            ? '0' + form.requestDate.getDate()
            : form.requestDate.getDate()),
        value: form.requestAdvance,
      }
      const res = await this.$repository.request.createRequest(data)
      if (res.code === 202) {
        await dispatch('getListRequestSend', 1)
        await commit('setRequestAdvanceDialogVisible', false)
        await commit('setFullscreenLoading', false)
        Message.success('Gửi yêu cầu thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
      await commit('setFullscreenLoading', false)
    }
  },

  async createRequestTaxEnrollment(
    { rootState, state, commit, dispatch },
    form
  ) {
    try {
      const data = {
        createEmployeeId: rootState.auth.id,
        requestTypeId: state.currentRequestTypeId,
        requestNameId: state.currentRequestNameId,
        description: form.requestDescription,
        employeeId: rootState.auth.id,
        employeeName: rootState.auth.name,
        taxType: form.checkList,
      }
      const res = await this.$repository.request.createRequest(data)
      if (res.code === 202) {
        await dispatch('getListRequestSend', 1)
        await commit('setRequestTaxEnrollmentDialogVisible', false)
        await commit('setFullscreenLoading', false)
        Message.success('Gửi yêu cầu thành công.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
      await commit('setFullscreenLoading', false)
    }
  },

  async updateRejectRequest({ commit, dispatch }, data) {
    try {
      const res = await this.$repository.request.updateRejectRequest(data)
      if (res.code === 201) {
        await dispatch('getListRequestReceive', 1)
        Message.success('Đã từ chối yêu cầu.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async updateApproveRequest({ commit, dispatch }, data) {
    try {
      const res = await this.$repository.request.updateApproveRequest(data)
      if (res.code === 201) {
        await dispatch('getListRequestReceive', 1)
        Message.success('Đã chấp nhận yêu cầu.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async exportRequestSend({ state }) {
    try {
      let res = await this.$repository.request.exportRequestSend(
        state.listRequestId
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

  async exportRequestReceive({ state }) {
    try {
      let res = await this.$repository.request.exportRequestReceive(
        state.listRequestId
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

  async getPaidLeaveRemaining({ commit }, data) {
    try {
      const res = await this.$repository.request.getPaidLeaveRemaining(data)
      await commit('setDayOffRemaining', res)
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async reviewedRequest({ commit }, data) {
    try {
      const regexEmpId = /\((.+)\)/i
      const employeeId = data.chooseManager.match(regexEmpId)[1]
      const params = {
        applicationRequestId: String(data.selectedRequest),
        requestStatus: 'PENDING',
        approverId: employeeId,
      }
      await this.$repository.request.reviewedRequest(params)
      await commit('setChooseManagerDialogVisible', false)
      await commit('setDetailRequestReceiveVisible', false)
      Message.success('Chuyển tiếp thành công.')
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
