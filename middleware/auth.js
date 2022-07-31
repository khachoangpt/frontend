import jwtDecode from 'jwt-decode'
import { getToken } from '~/helper/jwt'

export default function ({ app, store, redirect }) {
  if (!getToken()) {
    return redirect('/login')
  } else {
    const decoded = jwtDecode(getToken())
    const timeExp = new Date(decoded.exp) * 1000
    if (timeExp > new Date()) {
      store.commit('auth/setId', decoded.User_Data.id)
      store.commit('auth/setEmail', decoded.User_Data.email)
      store.commit('auth/setRoles', decoded.User_Data.authorities)
      store.dispatch('auth/getEmployeeInfo', decoded.User_Data.id)
    } else {
      return redirect('/login')
    }
  }
}
