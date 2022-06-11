export default {
  setPersonnelList(state, personnelList) {
    state.personnelList = personnelList
  },

  setPersonnelDetail(state, personnelDetail) {
    state.personnelDetail = personnelDetail
  },

  setColumns(state, columns) {
    state.columns = columns
  },

  setWorkingStatus(state, workingStatus) {
    state.workingStatus = workingStatus
  },

  setGenderList(state, genderList) {
    state.genderList = genderList
  },

  setRoles(state, roles) {
    state.roles = roles
  },

  setCenterDialogVisible(state, centerDialogVisible) {
    state.centerDialogVisible = centerDialogVisible
  },

  setWorkingTypes(state, workingTypes) {
    state.workingTypes = workingTypes
  },

  setListGrade(state, listGrade) {
    state.listGrade = listGrade
  },

  setListOffice(state, listOffice) {
    state.listOffice = listOffice
  },

  setListArea(state, listArea) {
    state.listArea = listArea
  },

  setEmployeeTypes(state, employeeTypes) {
    state.employeeTypes = employeeTypes
  },

  setTaxList(state, taxList) {
    state.taxList = taxList
  },

  setBankInfo(state, bankInfo) {
    state.bankInfo = bankInfo
  },

  setAdditionInfo(state, additionInfo) {
    state.additionInfo = additionInfo
  },

  setWorkingHistory(state, workingHistory) {
    state.workingHistory = workingHistory
  },

  setRelativeInfo(state, relativeInfo) {
    state.relativeInfo = relativeInfo
  },

  setEducationInfo(state, educationInfo) {
    state.educationInfo = educationInfo
  },

  updateAddress(state, address) {
    state.additionInfo[0].address = address
  },
}
