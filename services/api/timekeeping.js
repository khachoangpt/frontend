import makeFactoryClass from '../class_factory'
import BaseClass from './base_class'
import { getToken } from '~/helper/jwt'

class TimeKeeping extends BaseClass {
  login() {
    throw new Error('not implement')
  }

  forgot() {
    throw new Error('not implement')
  }
}

// mock
class UserMock extends TimeKeeping {}
// api
class UserApi extends TimeKeeping {
  exportTimekeeping(data) {
    const accessToken = getToken()
    return this.$axios.$post('/api/download_csv_timekeeping', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getEmployeeTimekeepingList(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/list_all_timekeeping?filter=employeeId:AEQ' +
        data.employeeId +
        ',date:ABT' +
        data.startDate +
        '-' +
        data.endDate,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getDetailTimekeeping(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/list_detail_timekeeping?employeeID=' +
        data.employeeId +
        '&date=' +
        data.date,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getAllTimeKeeping(data) {
    let officeFilter = ''
    let areaFilter = ''
    for (let i = 0; i < data.filterOffice.length; i++) {
      officeFilter += ',office:AEQ' + data.filterOffice[i]
    }
    for (let i = 0; i < data.filterArea.length; i++) {
      areaFilter += ',area:AEQ' + data.filterArea[i]
    }
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/list_all_timekeeping?filter=date:ABT' +
        data.startDate +
        '-' +
        data.endDate +
        officeFilter +
        areaFilter +
        '&paging=offset:' +
        (data.page - 1) +
        ',limit:2',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }
}

export default makeFactoryClass(UserMock, UserApi)
