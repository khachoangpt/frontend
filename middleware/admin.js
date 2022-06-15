import jwtDecode from 'jwt-decode'
import { getToken } from '~/helper/jwt'

export default function ({ app, store }) {
  if (!getToken()) {
    app.router.push('/login')
  } else {
    const decoded = jwtDecode(getToken())
    const roleList = decoded.User_Data.authorities
    if(roleList.find(role => role.authority !== 'ROLE_ADMIN')) {
      app.router.push('/')
    }
  }
}
