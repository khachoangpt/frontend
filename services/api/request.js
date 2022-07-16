import makeFactoryClass from '../class_factory'
import BaseClass from './base_class'
import { getToken } from '~/helper/jwt'

class Request extends BaseClass {
  login() {
    throw new Error('not implement')
  }

  forgot() {
    throw new Error('not implement')
  }
}

class UserMock extends Request {}
// api
class UserApi extends Request {
  getListRequestSend(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/list_all_application_request_send?filter=employeeId:AEQ' +
        data.employeeId +
        '&paging=offset:' +
        (data.page - 1) +
        ',limit:5',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getListRequestSendOnFilter(data) {
    const accessToken = getToken()
    let url = '/api/list_all_application_request_send?filter='
    if (data.dateRange.length > 0) {
      url += 'createDate:ABT' + data.dateRange[0] + '-' + data.dateRange[1]
    }
    if (data.requestTypeId !== '' && data.dateRange.length > 0) {
      url += ',requestType:AEQ' + data.requestTypeId
    } else if (data.requestTypeId !== '' && data.dateRange.length <= 0) {
      url += 'requestType:AEQ' + data.requestTypeId
    }
    if (data.requestStatusSearch !== '' && data.requestTypeId !== '') {
      url += ',requestStatus:AEQ' + data.requestStatusSearch
    } else if (data.requestStatusSearch !== '' && data.dateRange.length > 0) {
      url += ',requestStatus:AEQ' + data.requestStatusSearch
    } else if (data.requestStatusSearch !== '' && data.dateRange.length <= 0) {
      url += 'requestStatus:AEQ' + data.requestStatusSearch
    }
    return this.$axios.$get(
      url + '&paging=offset:' + (data.page - 1) + ',limit:5',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getListRequestReceive(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/list_all_application_request_receive?' +
        'paging=offset:' +
        (data.page - 1) +
        ',limit:5',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getListRequestReceiveOnFilter(data) {
    const accessToken = getToken()
    let url = '/api/list_all_application_request_receive?filter='
    if (data.dateRange.length > 0) {
      url += 'createDate:ABT' + data.dateRange[0] + '-' + data.dateRange[1]
    }
    if (data.requestTypeId !== '' && data.dateRange.length > 0) {
      url += ',requestType:AEQ' + data.requestTypeId
    } else if (data.requestTypeId !== '' && data.dateRange.length <= 0) {
      url += 'requestType:AEQ' + data.requestTypeId
    }
    if (data.requestStatusSearch !== '' && data.requestTypeId !== '') {
      url += ',requestStatus:AEQ' + data.requestStatusSearch
    } else if (data.requestStatusSearch !== '' && data.dateRange.length > 0) {
      url += ',requestStatus:AEQ' + data.requestStatusSearch
    } else if (data.requestStatusSearch !== '' && data.dateRange.length <= 0) {
      url += 'requestStatus:AEQ' + data.requestStatusSearch
    }
    return this.$axios.$get(
      url + '&paging=offset:' + (data.page - 1) + ',limit:5',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getListRequestType(data) {
    const accessToken = getToken()
    return this.$axios.$get('/api/get_all_request_type?employeeId=' + data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getListRequestStatus() {
    const accessToken = getToken()
    return this.$axios.$get('/api/get_all_request_status', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  getDetailSendRequest(requestId) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/list_all_application_request_send?filter=requestId:AEQ' + requestId,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getDetailReceiveRequest(requestId) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/list_all_application_request_receive?filter=requestId:AEQ' +
        requestId,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getListRequestName(requestType) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/get_all_request_name_by_id?requestTypeID=' + requestType,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  createRequest(data) {
    const accessToken = getToken()
    return this.$axios.$post('/api/create_request', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  updateRejectRequest(data) {
    const accessToken = getToken()
    return this.$axios.$post(
      '/api/update_reject_application_request?requestId=' + data,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  updateApproveRequest(data) {
    const accessToken = getToken()
    return this.$axios.$post(
      '/api/update_approve_application_request?requestId=' + data,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  exportRequestSend(data) {
    const accessToken = getToken()
    return this.$axios.$post('/api/download_csv_request_send', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }

  exportRequestReceive(data) {
    const accessToken = getToken()
    return this.$axios.$post('/api/download_csv_request_receive', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }
}

export default makeFactoryClass(UserMock, UserApi)
