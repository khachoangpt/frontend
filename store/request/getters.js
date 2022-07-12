export default {
  requestTableHeader: (state) => state.requestTableHeader,
  requestListSend: (state) => state.requestListSend,
  totalPageRequestListSend: (state) => state.totalPageRequestListSend,
  requestListReceive: (state) => state.requestListReceive,
  totalPageRequestListReceive: (state) => state.totalPageRequestListReceive,
  listRequestType: (state) => state.listRequestType,
  activeTable: (state) => state.activeTable,
  requestListSelected: (state) => state.requestListSelected,
  requestSendDetail: (state) => state.requestSendDetail,
  requestReceiveDetail: (state) => state.requestReceiveDetail,
  listRequestStatus: (state) => state.listRequestStatus,
  requestAdvanceDialogVisible: (state) => state.requestAdvanceDialogVisible,
  requestBehaviourDialogVisible: (state) => state.requestBehaviourDialogVisible,
  requestCompanyAssetDialogVisible: (state) =>
    state.requestCompanyAssetDialogVisible,
  requestIntegrityDialogVisible: (state) => state.requestIntegrityDialogVisible,
  requestNominationDialogVisible: (state) =>
    state.requestNominationDialogVisible,
  requestPaidLeaveDialogVisible: (state) => state.requestPaidLeaveDialogVisible,
  requestTaxEnrollmentDialogVisible: (state) =>
    state.requestTaxEnrollmentDialogVisible,
  requestWorkingScheduleDialogVisible: (state) =>
    state.requestWorkingScheduleDialogVisible,
  listRequestName: (state) => state.listRequestName,
  currentRequestTypeId: (state) => state.currentRequestTypeId,
  currentRequestNameId: (state) => state.currentRequestNameId,
  fullscreenLoading: (state) => state.fullscreenLoading,
  dateRangeFilter: (state) => state.dateRangeFilter,
  requestTypeFilter: (state) => state.requestTypeFilter,
  requestStatusFilter: (state) => state.requestStatusFilter,
}
