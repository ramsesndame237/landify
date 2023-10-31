import Alert from './components/icons/Alert.vue'

export function toastError($toast) {
  $toast.error('Error when loading data. Reload the page can fix the issue.', {
    icon: <Alert />,
    toastClassName: 'toast-override',
  })
}

export const _ = {}
