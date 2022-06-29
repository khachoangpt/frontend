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
  getListRequestSend(page) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/list_all_application_request_send?paging=offset:' +
        (page - 1) +
        ',limit:5',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getListRequestReceive(page) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/list_all_application_request_receive?paging=offset:' +
        (page - 1) +
        ',limit:5',
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    )
  }

  getListRequestType() {
    const accessToken = getToken()
    return this.$axios.$get('/api/get_all_request_type', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
  }
}

export default makeFactoryClass(UserMock, UserApi)
