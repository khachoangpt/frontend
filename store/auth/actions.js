import { Message } from 'element-ui'
import { saveToken, destroyToken } from '~/helper/jwt'

export default {
  async login({ commit }, data) {
    try {
      const res = await this.$repository.user.login(data)
      saveToken(res.accessToken)
      commit('setId', res.id)
      commit('setEmail', res.email)
      commit('setRoles', res.roles)
      commit('setTokenType', res.tokenType)
      commit('setAccessToken', res.accessToken)
      this.$router.push(this.localePath('/'))
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async forgot({ commit }, data) {
    try {
      const res = await this.$repository.user.forgot(data.email)
      if (res.code === 201) {
        Message.success('Password was change. Check your email, please.')
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  async getEmployeeInfo({commit}, data) {
    const res = await this.$repository.user.getEmployeeDetail(data)
    await commit('auth/setName', res.full_name, { root: true })
    await commit('auth/setAvatar', res.avatar, { root: true })
    await commit('auth/setGrade', res.grade, { root: true })
  },

  async changePassword({ commit }, data) {
    try {
      const res = await this.$repository.user.changePassword(data)
      if (res.code === 201) {
        Message.success('Password changed successfully.')
        destroyToken()
        this.$router.push(this.localePath('/login'))
      }
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },

  logout() {
    destroyToken()
    this.$router.push(this.localePath('/login'))
  },
}
