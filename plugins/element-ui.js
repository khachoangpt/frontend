import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale'

export default ({app}) => {
    Vue.use(Element, { locale })
    locale.i18n((key, value) => app.i18n.t(key, value))
}