import { Message } from 'element-ui'
import { saveToken, destroyToken } from '~/helper/jwt'

export default {
  async login({ commit }, data) {
    try {
      const res = await this.$repository.user.login(data)
      await saveToken(res.accessToken)
      await commit('setId', res.id)
      await commit('setEmail', res.email)
      await commit('setRoles', res.roles)
      await commit('setTokenType', res.tokenType)
      await commit('setAccessToken', res.accessToken)
      await this.$router.push(this.localePath('/'))
    } catch (error) {
      if (error.response.data.message === 'password is not valid!') {
        Message.error(this.$i18n.t('login.loginIncorrect'))
      } else if (error.response.data.message === 'Bad credentials') {
        Message.error(this.$i18n.t('login.loginIncorrect'))
      } else {
        Message.error(error.response.data.message)
      }
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

  async getEmployeeInfo({ commit }, data) {
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
