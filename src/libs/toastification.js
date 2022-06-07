import Vue from 'vue'
import Toast from 'vue-toastification'

// Toast Notification Component Styles
import '@core/scss/vue/libs/toastification.scss'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

/**
 * NOTE: If you are using other transition them make sure to import it in `src/@core/scss/vue/libs/notification.scss` from it's source
 */
Vue.use(Toast, {
  hideProgressBar: true,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
})

Vue.prototype.$errorToast = function (title) {
  this.$toast({
    component: ToastificationContent,
    props: {
      title: title || this.$t('general.error'),
      icon: 'XOctagonIcon',
      variant: 'danger',
    },
  })
}
