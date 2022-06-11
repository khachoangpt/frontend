import jwtDecode from 'jwt-decode'
import { getToken } from '~/helper/jwt'

export default function ({ app, store }) {
  if (!getToken()) {
    app.router.push('/login')
  } else {
    const decoded = jwtDecode(getToken())
    const timeExp = new Date(decoded.exp)
    if (new Date() > timeExp) {
      store.commit('auth/setId', decoded.User_Data.id)
      store.commit('auth/setEmail', decoded.User_Data.email)
      store.commit('auth/setRoles', decoded.User_Data.authorities)
    } else {
      app.router.push('/login')
    }
  }
}
