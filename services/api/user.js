import makeFactoryClass from '../class_factory'
import BaseClass from './base_class'
import { getToken } from '~/helper/jwt'

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

  getPersonnelList() {
    const accessToken = getToken()
    return this.$axios.$get('/api/get_all_employee?paging=offset:0,limit:999', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
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

  getListGrade() {
    return this.$axios.$get('/api/list_job')
  }

  getListOffice() {
    return this.$axios.$get('/api/list_office')
  }

  getListArea() {
    return this.$axios.$get('/api/list_area')
  }

  getEmployeeTypes() {
    return this.$axios.$get('/api/list_employee_type')
  }

  getWorkingTypes() {
    return this.$axios.$get('/api/list_working_type')
  }
}

export default makeFactoryClass(UserMock, UserApi)
