// import Alert from './components/icons/Alert.vue'

import axiosIns from '@/libs/axios'
import BrowserId from 'browser-id'

export function toastError($toast) {
  $toast.error('Error when loading data. Reload the page can fix the issue.', {
    // icon: <Alert />,
    toastClassName: 'toast-override',
  })
}

export const parseJwt = token => {
  if (token) {
    const base64Url = token?.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''))

    return JSON.parse(jsonPayload)
  }
}
export const checkAndverficationJwt = (time) => {
  const currentToken = localStorage.getItem('accessToken')
  const currentRefreshToken = localStorage.getItem('refreshToken')
  console.log("this is the the toke",currentToken)
  const TIME_LIMIT_EXPIRIED = 20 * 60 * 1000
  if (currentToken && parseJwt(currentToken)?.iat + TIME_LIMIT_EXPIRIED <= Math.round(Date.now() / 1000)) {
    axiosIns.post('/auth/refresh/token', {
      user_browser_hash: BrowserId(),
      user_refresh_token: currentRefreshToken,
    }).then(response => {
      localStorage.setItem('accessToken', response.data.user_token)
      localStorage.setItem('refreshToken', response.data.user_refresh_token)
    }).catch(error => console.error(error))
  }
}
export const _ = {}
