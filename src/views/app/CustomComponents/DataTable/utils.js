// import Alert from './components/icons/Alert.vue'

export function toastError($toast) {
  $toast.error('Error when loading data. Reload the page can fix the issue.', {
    // icon: <Alert />,
    toastClassName: 'toast-override',
  })
}

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const  jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
export const _ = {}
