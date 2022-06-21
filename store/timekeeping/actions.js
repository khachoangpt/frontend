import { Message } from 'element-ui'

export default {
  async exportTimekeeping() {
    try {
      const data = ['huynq100', 'huynqhe141565']
      let res = await this.$repository.timekeeping.exportTimekeeping(data)
      if (!res.match(/^data:text\/csv/i)) {
        res = 'data:text/csv;charset=utf-8,' + res
      }

      const data1 = encodeURI(res)

      const link = document.createElement('a')
      link.setAttribute('href', data1)
      link.setAttribute('download', 'filename')
      link.click()
    } catch (error) {
      Message.error(error.response.data.message)
    }
  },
}
