import { ErrorType } from '~/constants'

import userRepository from '~/services/api/user'
import timekeepingRepository from '~/services/api/timekeeping'
import requestRepository from '~/services/api/request'
import policyRepository from '~/services/api/policy'
import salaryRepository from '~/services/api/salary'
import syntheticRepository  from '~/services/api/synthetic'

const createRepository = ({ app, $axios, redirect, $config }) => {
  $axios.onError((error) => {
    if (!error.response) {
      return
    }

    const code = error.response.status

    switch (code) {
      case ErrorType.Unprocessable:
        Promise.reject(error.response.data.errors)
        break
      case ErrorType.Unauthorized:
        app?.store?.dispatch('auth/logout')
        break
      case ErrorType.Forbidden:
        app?.router?.back()
        break
      case ErrorType.NotFound:
        break
      default:
        break
    }
  })

  return {
    user: userRepository($config.environment, { $axios }),
    timekeeping: timekeepingRepository($config.environment, { $axios }),
    request: requestRepository($config.environment, { $axios }),
    policy: policyRepository($config.environment, { $axios }),
    salary: salaryRepository($config.environment, { $axios }),
    synthetic: syntheticRepository($config.environment, { $axios }),

  }
}

export default createRepository
