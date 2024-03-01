// import Alert from './components/icons/Alert.vue'

import axiosIns from '@/libs/axios'
import BrowserId from 'browser-id'
import moment from 'moment'

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
export const checkAndverficationJwt = time => {
  const currentToken = localStorage.getItem('accessToken')
  const currentRefreshToken = localStorage.getItem('refreshToken')
  console.log('this is the the toke', currentToken)
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

export const formatDate = date => {
  const dateTime = moment(date)
    .toDate()
    .getTime()
  const dayBeginTime = moment()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .toDate()
    .getTime()
  const sevenDayBeforeTime = moment()
    .subtract(7, 'd')
    .toDate()
    .getTime()

  // eslint-disable-next-line no-nested-ternary
  return dateTime < sevenDayBeforeTime ? moment(date, true).format('MMM, DD')
    : dateTime < dayBeginTime
      ? moment(date, true).format('MMM, DD HH:mm A')
      : moment(date).format('LT')
}
