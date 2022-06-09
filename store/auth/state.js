export default () => ({
  id: 'a',
  email: '',
  name: '',
  avatar: '',
  grade: '',
  roles: [],
  tokenType: '',
  accessToken: '',
  isRememberMe: true,
  rules: {
    email: [
      {
        required: true,
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
      },
    ],
  },

})
