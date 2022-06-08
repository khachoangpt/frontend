import jwtDecode from 'jwt-decode'
import { getToken } from '~/helper/jwt'

export default function ({ app, store }) {
  if (!getToken()) {
    app.router.push('/login')
  } else {
    const decoded = jwtDecode(getToken())
    store.commit('auth/setId', decoded.User_Data.sub)
    store.commit('auth/setEmail', decoded.User_Data.email)
    store.commit('auth/setRoles', decoded.User_Data.authorities)
  }
}
