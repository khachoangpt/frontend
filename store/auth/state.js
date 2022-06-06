export default () => ({
  id: '',
  email: '',
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
