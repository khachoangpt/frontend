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
    console.log(data)
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
}

export default makeFactoryClass(UserMock, UserApi)
