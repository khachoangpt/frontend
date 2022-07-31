import { format } from 'date-fns'
import makeFactoryClass from '../class_factory'
import BaseClass from './base_class'
import { getToken } from '~/helper/jwt'
import { PageLimit } from '~/constants/index'

const accessToken = getToken()

class Policy extends BaseClass {}

class UserMock extends Policy {}
// api
class UserApi extends Policy {
  getListSalary(data) {
    const accessToken = getToken()
    let url =
      '/api/get_all_management_salary_monthly?filter=startDate:AEQ' +
      data.startDate +
      ',endDate:AEQ' +
      data.endDate
    if (data.salaryStatus !== '') {
      url = url + ',salaryStatus:AEQ' + data.salaryStatus
    }
    if (data.employeeId !== '') {
      url = url + ',employeeId:AEQ' + data.employeeId
    }
    url = url + '&paging=offset:' + (data.page - 1) + ',limit:' + PageLimit
    return this.$axios.$get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getListPersonalSalary(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/get_all_personal_salary_monthly?filter=startDate:AGE' +
        data.startDate +
        ',endDate:ALE' +
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
    return this.$axios.$put('/api/update_deduction_salary', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  deleteDeduction(data) {
    const accessToken = getToken()
    return this.$axios.$delete(
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
    return this.$axios.$put('/api/update_advance_salary', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  deleteAdvance(data) {
    const accessToken = getToken()
    return this.$axios.$delete('/api/delete_advance_salary?advanceId=' + data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  editBonus(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/update_bonus_salary', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  deleteBonus(data) {
    const accessToken = getToken()
    return this.$axios.$delete(
      '/api/delete_bonus_salary?bonusId=' + data,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  approveSalary(data) {
    const accessToken = getToken()
    return this.$axios.$put(
      '/api/update_approve_salary_monthly?salaryMonthlyId=' + data,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  rejectSalary(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/update_reject_salary_monthly', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  checkSalary(data) {
    const accessToken = getToken()
    return this.$axios.$put('/api/update_checked_salary_monthly', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getHistorySalary(type, date, employeeId) {
    const dateFormat = format(new Date(date || new Date()), 'yyyy-MM-dd')
    return this.$axios.$get(
        `/api/get_salary_history_chart?type=${type}&date=${dateFormat}&employeeId=${employeeId}`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }
    )
}

getSalaryStructure(date, employeeId) {
    const dateFormat = format(new Date(date || new Date()), 'yyyy-MM-dd')
    return this.$axios.$get(
        `api/get_salary_structure_chart?date=${dateFormat}&employeeId=${employeeId}`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }
    )
}

getOrganizational() {
    return this.$axios.$get(
        'https://www.hronline.tk/hrm/api/get_organizational',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }
    )
}

getEmployeeById() {
    return this.$axios.$get(
        '/api/get_employee_by_manager',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }
    )
}
}



export default makeFactoryClass(UserMock, UserApi)
