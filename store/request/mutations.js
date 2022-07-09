export default {
  setRequestTableHeader(state, requestTableHeader) {
    state.requestTableHeader = requestTableHeader
  },

  setRequestListSend(state, requestListSend) {
    state.requestListSend = requestListSend
  },

  setTotalPageRequestListSend(state, totalPageRequestListSend) {
    state.totalPageRequestListSend = totalPageRequestListSend
  },

  setRequestListReceive(state, requestListReceive) {
    state.requestListReceive = requestListReceive
  },

  setTotalPageRequestListReceive(state, totalPageRequestListReceive) {
    state.totalPageRequestListReceive = totalPageRequestListReceive
  },

  setListRequestType(state, listRequestType) {
    state.listRequestType = listRequestType
  },

  setActiveTable(state, activeTable) {
    state.activeTable = activeTable
  },

  setRequestListSelected(state, requestListSelected) {
    state.requestListSelected = requestListSelected
  },

  setRequestOvertimeDialogVisible(state, requestOvertimeDialogVisible) {
    state.requestOvertimeDialogVisible = requestOvertimeDialogVisible
  },

  setRequestSendDetail(state, requestSendDetail) {
    state.requestSendDetail = requestSendDetail
  },

  setRequestReceiveDetail(state, requestReceiveDetail) {
    state.requestReceiveDetail = requestReceiveDetail
  },
}
