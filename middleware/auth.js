import jwtDecode from 'jwt-decode'
import { getToken } from '~/helper/jwt'

export default function ({ app, store }) {
  if (!getToken()) {
    app.router.push('/login')
  } else {
    const decoded = jwtDecode(getToken())
    store.commit('auth/setId', decoded.data.sub)
    store.commit('auth/setEmail', decoded.data.email)
    store.commit('auth/setRoles', decoded.data.authorities)
  }
}
