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
    state.additionInfo[0].address = address
  },

  updateAdditionPlaceOfOrigin(state, placeOfOrigin) {
    state.additionInfo[0].place_of_origin = placeOfOrigin
  },

  updateAdditionPlaceOfResidence(state, placeOfResidence) {
    state.additionInfo[0].place_of_residence = placeOfResidence
  },

  updateAdditionCardId(state, cardId) {
    state.additionInfo[0].card_id = cardId
  },

  updateAdditionProvideDate(state, provideDate) {
    state.additionInfo[0].provideDate = provideDate
  },

  updateAdditionProvidePlace(state, providePlace) {
    state.additionInfo[0].providePlace = providePlace
  },

  updateAdditionNationality(state, nationality) {
    state.additionInfo[0].nationality = nationality
  },

  updateAdditionPersonalEmail(state, personalEmail) {
    state.additionInfo[0].personal_email = personalEmail
  },

  updateAdditionPhoneNumber(state, phoneNumber) {
    state.additionInfo[0].phone_number = phoneNumber
  },

  updateAdditionNickname(state, nickname) {
    state.additionInfo[0].nick_name = nickname
  },

  updateAdditionFacebook(state, facebook) {
    state.additionInfo[0].facebook = facebook
  },

  updateBankAccountName(state, accountName) {
    state.bankInfo[0].account_name = accountName
  },

  updateBankNameBank(state, nameBank) {
    state.bankInfo[0].name_bank = nameBank
  },

  updateBankAddress(state, address) {
    state.bankInfo[0].address = address
  },

  updateBankAccountNumber(state, accountNumber) {
    state.bankInfo[0].account_number = accountNumber
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
    state.taxList[0].tax_code = data
  },

  updateInsuranceId(state, data) {
    state.taxList[0].insurance_id = data
  },

  updateInsuranceName(state, data) {
    state.taxList[0].insurance_name = data
  },

  updateTaxAddress(state, data) {
    state.taxList[0].address = data
  },

  updatePersonnelFullName(state, data) {
    state.personnelDetail[0].full_name = data
  },
  updatePersonnelEmployeeId(state, data) {
    state.personnelDetail[0].employee_id = data
  },
  updatePersonnelStartDate(state, data) {
    state.personnelDetail[0].start_date = data
  },
  updatePersonnelWorkingStatus(state, data) {
    state.personnelDetail[0].working_status = data
  },
  updatePersonnelContractUrl(state, data) {
    state.personnelDetail[0].contract_url = data
  },
  updatePersonnelPhoneNumber(state, data) {
    state.personnelDetail[0].phone_number = data
  },
  updatePersonnelGrade(state, data) {
    state.personnelDetail[0].grade = data
  },
  updatePersonnelBirthDate(state, data) {
    state.personnelDetail[0].birth_date = data
  },
  updatePersonnelCompanyEmail(state, data) {
    state.personnelDetail[0].company_email = data
  },
  updatePersonnelGender(state, data) {
    state.personnelDetail[0].gender = data
  },
  updatePersonnelMaritalStatus(state, data) {
    state.personnelDetail[0].marital_status = data
  },
  updatePersonnelOfficeName(state, data) {
    state.personnelDetail[0].office_name = data
  },
  updatePersonnelWorkingName(state, data) {
    state.personnelDetail[0].working_name = data
  },
  updatePersonnelPositionName(state, data) {
    state.personnelDetail[0].position_name = data
  },
  updatePersonnelAreaName(state, data) {
    state.personnelDetail[0].area_name = data
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
}
