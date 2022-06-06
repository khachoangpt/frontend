import { ErrorType } from '~/constants'

import userRepository from '~/services/api/user'

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
  }
}

export default createRepository
