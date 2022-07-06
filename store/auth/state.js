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
  country: 'vn',
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
