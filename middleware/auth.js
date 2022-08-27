import jwtDecode from 'jwt-decode'
import { getToken } from '~/helper/jwt'

export default function ({ app, store, redirect, i18n }) {
  if (!getToken()) {
    return redirect('/login')
  } else {
    const decoded = jwtDecode(getToken())
    const timeExp = new Date(decoded.exp) * 1000
    if (timeExp > Date.parse(new Date())) {
      store.commit('auth/setId', decoded.User_Data.id)
      store.commit('auth/setEmail', decoded.User_Data.email)
      store.commit('auth/setRoles', decoded.User_Data.authorities)
      store.commit('auth/setFullName', decoded.User_Data.fullName)
      if (
        !decoded.User_Data.authorities.find(
          (role) => role.authority === 'ROLE_ADMIN'
        )
      ) {
        store.dispatch('auth/getEmployeeInfo', decoded.User_Data.id)
      }
      store.commit(
        'auth/setCountry',
        i18n.locale === 'vi' ? 'vn' : i18n.locale === 'en' ? 'us' : 'us'
      )
    } else {
      return redirect('/login')
    }
  }
}
