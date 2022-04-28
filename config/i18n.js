import en from '../locales/en.js'
import vi from '../locales/vi.js'

export const i18n = {
  locales: [
    {
      code: 'vi',
      iso: 'vi-VN',
      name: 'Tiếng Việt',
    },
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
    },
  ],
  defaultLocale: 'vi',
  vueI18n: {
    fallbackLocale: 'vi',
    messages: { vi, en },
  },
}