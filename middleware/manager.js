import jwtDecode from 'jwt-decode'
import { getToken } from '~/helper/jwt'

export default function ({ app, store, redirect }) {
  if (!getToken()) {
    return redirect('/login')
  } else {
    const decoded = jwtDecode(getToken())
    const roleList = decoded.User_Data.authorities
    if (roleList.find((role) => role.authority !== 'ROLE_MANAGER')) {
      return redirect('/')
    }
  }
}
