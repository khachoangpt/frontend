import makeFactoryClass from '../class_factory'
import BaseClass from './base_class'
import { getToken } from '~/helper/jwt'
import { PageLimit } from '~/constants/index'

class User extends BaseClass {
  login() {
    throw new Error('not implement')
  }

  forgot() {
    throw new Error('not implement')
  }
}

// mock
class UserMock extends User {}

// api
class UserApi extends User {
  login(data) {
    return this.$axios.$post('/api/login', data)
  }

  forgot(data) {
    return this.$axios.$post('/api/forgot_password?email=' + data)
  }

  changePassword(data) {
    return this.$axios.$put('/api/change_password', data)
  }

  getPersonnelList(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/get_all_employee?filter=fullName:ALK' +
        data.searchText +
        '&paging=offset:' +
        (data.page - 1) +
        ',limit:' +
        PageLimit,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  addEmployee(data) {
    const accessToken = getToken()
    return this.$axios.$post('/api/add_employee', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getEmployeeDetail(employeeId) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/employee/detail/main?employeeID=' + employeeId,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getListGrade(data) {
    const accessToken = getToken()
    return this.$axios.$get('/api/list_grade/' + data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getListPositions() {
    const accessToken = getToken()
    return this.$axios.$get('/api/list_job', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getListOffice() {
    const accessToken = getToken()
    return this.$axios.$get('/api/list_office', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getListArea() {
    const accessToken = getToken()
    return this.$axios.$get('/api/list_area', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getEmployeeTypes() {
    const accessToken = getToken()
    return this.$axios.$get('/api/list_employee_type', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getWorkingTypes() {
    const accessToken = getToken()
    return this.$axios.$get('/api/list_working_type', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getTaxList(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/employee/detail/tax_and_insurance?employeeID=' + data,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getBankInfo(data) {
    const accessToken = getToken()
    return this.$axios.$get('/api/employee/detail/bank?employeeID=' + data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getAdditionInfo(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/employee/detail/add_info?employeeID=' + data,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getWorkingHistory(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/employee/detail/working_history?employeeID=' + data,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getRelativeInfo(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/employee/detail/relative?employeeID=' + data,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getEducationInfo(data) {
    const accessToken = getToken()
    return this.$axios.$get('/api/employee/detail/edu?employeeID=' + data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  editBankInfo(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/employee/detail/bank/update', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  updateMainInfo(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/employee/detail/main/update', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  updateTaxInfo(data) {
    const accessToken = getToken()
    return this.$axios.$put(
      '/api/employee/detail/tax_and_insurance/update',
      data,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  updateWorkingHistory(data) {
    const accessToken = getToken()
    return this.$axios.$put(
      '/api/employee/detail/working_history/update',
      data,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  updateRelativeInfo(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/employee/detail/relative/update', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  updateEducationInfo(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/employee/detail/education/update', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getListRoleType() {
    const accessToken = getToken()
    return this.$axios.$get('/api/list_role_type', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  searchManager(data) {
    const accessToken = getToken()
    return this.$axios.$get('/api/list_manager?name=' + data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getEmployeeByManager() {
    const accessToken = getToken()
    return this.$axios.$get('/api/get_employee_by_manager', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getManagerOfArea() {
    const accessToken = getToken()
    return this.$axios.$get('/api/get_list_manager_higher_of_area', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getManagerLowerOfArea() {
    const accessToken = getToken()
    return this.$axios.$get('/api/get_list_manager_lower_of_area', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getHoliday(data) {
    const accessToken = getToken()
    return this.$axios.$get('/api/get_all_holiday?year=' + data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getWorkingInfo(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/employee/detail/working_info?employeeID=' + data,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  updateAvatar(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/employee/detail/update_avatar', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getRoleByEmployee(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/employee/detail/get_role_by_employeeid?employeeId=' + data,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  confirmEditWorkingInfo(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/employee/detail/update_working_info', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  confirmEditAdditionalInfo(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/employee/detail/add_info/update', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  updateRole(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/employee/detail/update_role', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  addEmployeeByExcel(data) {
    const formData = new FormData()
    formData.append('file', data)
    const accessToken = getToken()
    return this.$axios.$post('/api/import_excel_employee', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  insertHoliday(data) {
    const accessToken = getToken()
    return this.$axios.$post('/api/insert_holiday', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }
}

export default makeFactoryClass(UserMock, UserApi)
