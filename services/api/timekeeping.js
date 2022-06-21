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
}

export default makeFactoryClass(UserMock, UserApi)
