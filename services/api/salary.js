import makeFactoryClass from '../class_factory'
import BaseClass from './base_class'
import { getToken } from '~/helper/jwt'
import { PageLimit } from '~/constants/index'

class Policy extends BaseClass {}

class UserMock extends Policy {}
// api
class UserApi extends Policy {
  getListSalary(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/get_all_salary_monthly?orderBy=employeeId:desc&paging=offset:' +
        (data.page - 1) +
        ',limit:' +
        PageLimit +
        '&filter=startDate:AEQ' +
        data.startDate +
        ',endDate:AEQ' +
        data.endDate,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getSalaryDetail(data) {
    const accessToken = getToken()
    return this.$axios.$get('/api/get_salary_monthly_detail?salaryId=' + data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  exportSalary(data) {
    const accessToken = getToken()
    return this.$axios.$post('/api/download_csv_salary_monthly', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }
}

export default makeFactoryClass(UserMock, UserApi)
