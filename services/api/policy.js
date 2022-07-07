import makeFactoryClass from '../class_factory'
import BaseClass from './base_class'
import { getToken } from '~/helper/jwt'
import { PageLimit } from '~/constants/index'

class Policy extends BaseClass {}

class UserMock extends Policy {}
// api
class UserApi extends Policy {
  getListPolicyByCategory(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/get_list_policy?filter=categoryID:AEQ' +
        data.categoryId +
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

  getDetailPolicy(data) {
    const accessToken = getToken()
    return this.$axios.$get(
      '/api/get_list_policy?filter=policyID:AEQ' +
        data.policyId +
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
}

export default makeFactoryClass(UserMock, UserApi)
