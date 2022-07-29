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
      '/api/get_all_management_salary_monthly?orderBy=employeeId:desc&paging=offset:' +
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
    return this.$axios.$post(
      '/api/download_csv_management_salary_monthly',
      data,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  editDeduction(data) {
    const accessToken = getToken()
    return this.$axios.$post('/api/update_deduction_salary', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  deleteDeduction(data) {
    const accessToken = getToken()
    return this.$axios.$post(
      '/api/delete_deduction_salary?deductionId=' + data,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  editAdvance(data) {
    const accessToken = getToken()
    return this.$axios.$post('/api/update_advance_salary', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  deleteAdvance(data) {
    const accessToken = getToken()
    return this.$axios.$post(
      '/api/delete_advance_salary?advanceId=' + data,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  editBonus(data) {
    const accessToken = getToken()
    return this.$axios.$post('/api/update_bonus_salary', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  deleteBonus(data) {
    const accessToken = getToken()
    return this.$axios.$post(
      '/api/delete_bonus_salary?bonusId=' + data,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }
}

export default makeFactoryClass(UserMock, UserApi)
