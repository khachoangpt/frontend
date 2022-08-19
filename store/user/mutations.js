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

  setListPositions(state, listPositions) {
    state.listPositions = listPositions
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

  updateAdditionAddress(state, address) {
    state.additionInfo.address = address
  },

  updateAdditionPlaceOfOrigin(state, placeOfOrigin) {
    state.additionInfo.place_of_origin = placeOfOrigin
  },

  updateAdditionPlaceOfResidence(state, placeOfResidence) {
    state.additionInfo.place_of_residence = placeOfResidence
  },

  updateAdditionCardId(state, cardId) {
    state.additionInfo.card_id = cardId
  },

  updateAdditionProvideDate(state, provideDate) {
    state.additionInfo.provideDate = provideDate
  },

  updateAdditionProvidePlace(state, providePlace) {
    state.additionInfo.providePlace = providePlace
  },

  updateAdditionNationality(state, nationality) {
    state.additionInfo.nationality = nationality
  },

  updateAdditionPersonalEmail(state, personalEmail) {
    state.additionInfo.personal_email = personalEmail
  },

  updateAdditionPhoneNumber(state, phoneNumber) {
    state.additionInfo.phone_number = phoneNumber
  },

  updateAdditionNickname(state, nickname) {
    state.additionInfo.nick_name = nickname
  },

  updateAdditionFacebook(state, facebook) {
    state.additionInfo.facebook = facebook
  },

  updateBankAccountName(state, accountName) {
    state.bankInfo.account_name = accountName
  },

  updateBankNameBank(state, nameBank) {
    state.bankInfo.name_bank = nameBank
  },

  updateBankAddress(state, address) {
    state.bankInfo.address = address
  },

  updateBankAccountNumber(state, accountNumber) {
    state.bankInfo.account_number = accountNumber
  },

  updateEducationNameSchool(state, data) {
    state.educationInfo[data.index].name_school = data.event
  },

  updateEducationDate(state, data) {
    state.educationInfo[data.index].start_date = data.event[0]
    state.educationInfo[data.index].end_date = data.event[1]
  },

  updateEducationCertificate(state, data) {
    state.educationInfo[data.index].certificate = data.event
  },

  updateRelativeParentName(state, data) {
    state.relativeInfo[data.index].parent_name = data.event
  },

  updateRelativeBirthDate(state, data) {
    state.relativeInfo[data.index].birth_date = data.event
  },

  updateRelativeContact(state, data) {
    state.relativeInfo[data.index].contact = data.event
  },

  updateWorkingHistoryCompanyName(state, data) {
    state.workingHistory[data.index].company_name = data.event
  },

  updateWorkingHistoryPosition(state, data) {
    state.workingHistory[data.index].position = data.event
  },

  updateWorkingHistoryDate(state, data) {
    state.workingHistory[data.index].start_date = data.event[0]
    state.workingHistory[data.index].end_date = data.event[1]
  },

  updateTaxCode(state, data) {
    state.taxList.tax_code = data
  },

  updateInsuranceId(state, data) {
    state.taxList.insuranceDtos[data.index].insuranceCode = data.event
  },

  updateInsuranceName(state, data) {
    state.taxList.insurance_name = data
  },

  updateTaxAddress(state, data) {
    state.taxList.insuranceDtos[data.index].address = data.event
  },

  updatePersonnelFullName(state, data) {
    state.personnelDetail.full_name = data
  },
  updatePersonnelEmployeeId(state, data) {
    state.personnelDetail.employee_id = data
  },
  updatePersonnelStartDate(state, data) {
    state.personnelDetail.start_date = data
  },
  updatePersonnelEndDate(state, data) {
    state.personnelDetail.end_date = data
  },
  updatePersonnelWorkingStatus(state, data) {
    state.personnelDetail.working_status = data
  },
  updatePersonnelContractUrl(state, data) {
    state.personnelDetail.contract_url = data
  },
  updatePersonnelPhoneNumber(state, data) {
    state.personnelDetail.phone_number = data
  },
  updatePersonnelGrade(state, data) {
    state.personnelDetail.grade = data
  },
  updatePersonnelBirthDate(state, data) {
    state.personnelDetail.birth_date = data
  },
  updatePersonnelCompanyEmail(state, data) {
    state.personnelDetail.company_email = data
  },
  updatePersonnelGender(state, data) {
    state.personnelDetail.gender = data
  },
  updatePersonnelMaritalStatus(state, data) {
    state.personnelDetail.marital_status = data
  },
  updatePersonnelOfficeName(state, data) {
    state.personnelDetail.office_name = data
  },
  updatePersonnelWorkingName(state, data) {
    state.personnelDetail.working_name = data
  },
  updatePersonnelPositionName(state, data) {
    state.personnelDetail.position_name = data
  },
  updatePersonnelAreaName(state, data) {
    state.personnelDetail.area_name = data
  },
  setIsEditTaxInfo(state, data) {
    state.isEditTaxInfo = data
  },
  setIsEditBankInfo(state, data) {
    state.isEditBankInfo = data
  },
  setIsEditLine(state, data) {
    state.isEditLine = data
  },
  setIsEditLineRelative(state, data) {
    state.isEditLineRelative = data
  },
  setIsEditLineEducation(state, data) {
    state.isEditLineEducation = data
  },
  setIsEditMainInfo(state, data) {
    state.isEditMainInfo = data
  },

  setSearchText(state, searchText) {
    state.searchText = searchText
  },

  setTotalPage(state, totalPage) {
    state.totalPage = totalPage
  },

  setFullscreenLoading(state, fullscreenLoading) {
    state.fullscreenLoading = fullscreenLoading
  },

  setIsEditAdditionInfo(state, isEditAdditionInfo) {
    state.isEditAdditionInfo = isEditAdditionInfo
  },

  setIsEditWorkInfo(state, isEditWorkInfo) {
    state.isEditWorkInfo = isEditWorkInfo
  },

  setListManager(state, listManager) {
    state.listManager = listManager
  },

  setListHoliday(state, listHoliday) {
    state.listHoliday = listHoliday
  },

  setWorkingInfo(state, workingInfo) {
    state.workingInfo = workingInfo
  },

  setAddWorkingHistoryVisible(state, addWorkingHistoryVisible) {
    state.addWorkingHistoryVisible = addWorkingHistoryVisible
  },

  setAddRelativeDialogVisible(state, addRelativeDialogVisible) {
    state.addRelativeDialogVisible = addRelativeDialogVisible
  },

  setAddEducationDialogVisible(state, addEducationDialogVisible) {
    state.addEducationDialogVisible = addEducationDialogVisible
  },

  setScreenLoadingAvatar(state, screenLoadingAvatar) {
    state.screenLoadingAvatar = screenLoadingAvatar
  },

  setImageUrl(state, imageUrl) {
    state.imageUrl = imageUrl
  },

  setEmployeeRole(state, employeeRole) {
    state.employeeRole = employeeRole
  },

  updateWorkingWorkingName(state, data) {
    state.workingInfo.working_type = data
  },

  updateWorkingOfficeName(state, data) {
    state.workingInfo.office = data
  },

  updateWorkingAreaName(state, data) {
    state.workingInfo.area = data
  },

  updateWorkingPositionName(state, data) {
    state.workingInfo.position = data
  },

  updateWorkingGrade(state, data) {
    state.workingInfo.grade = data
  },

  updateWorkingEmployeeType(state, data) {
    state.workingInfo.employee_type = data
  },

  updateWorkingManager(state, data) {
    state.workingInfo.manager_name = data
  },

  handleSelect(state, data) {
    const regexEmp = /(.+)\((.+)\)/i
    const employeeId = data.value.match(regexEmp)[2]
    const employeeName = data.value.match(regexEmp)[1]
    state.workingInfo.manager_name = employeeName
    state.workingInfo.manager_id = employeeId
  },

  updateWorkingRole(state, data) {
    state.employeeRole.roleName = data
  },

  updateWorkingStartDate(state, data) {
    state.workingInfo.start_date = data
  },

  updateWorkingFinalSalary(state, data) {
    state.workingInfo.final_salary = data
  },

  updateWorkingBaseSalary(state, data) {
    state.workingInfo.base_salary = data
  },

  updateEmployeeNameSalaryHistory(state, data) {
    state.employeeNameSalaryHistory = data
  },

  updateEmployeeNameSalaryStructure(state, data) {
    state.employeeNameSalaryStructure = data
  },

  setLoadingOnSearchEmployee(state, loadingOnSearchEmployee) {
    state.loadingOnSearchEmployee = loadingOnSearchEmployee
  },

  setDateRangeHoliday(state, dateRangeHoliday) {
    state.dateRangeHoliday = dateRangeHoliday
  },

  setEnableEditCalendar(state, enableEditCalendar) {
    state.enableEditCalendar = enableEditCalendar
  },
}
