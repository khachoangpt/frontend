

const getToken = () => {
  return window.localStorage.getItem('ACCESS_TOKEN')
}

const saveToken = (token) => {
  window.localStorage.setItem('ACCESS_TOKEN', token)
}

const destroyToken = () => {
  window.localStorage.removeItem('ACCESS_TOKEN')
}

export { getToken, saveToken, destroyToken }
