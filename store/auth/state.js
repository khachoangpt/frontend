export default () => ({
  id: '',
  email: '',
  name: '',
  avatar: '',
  grade: '',
  roles: [],
  tokenType: '',
  accessToken: '',
  isRememberMe: false,
  country: 'us',
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
  isCollapse: false,
})
