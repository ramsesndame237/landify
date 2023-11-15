import axios from '@/libs/axios'
import moment from 'moment'

export const snakeToTitle = s => s.replace(/^_*(.)|_+(.)/g, (a, c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`))

export const getYearFormDateString = date => date?.split('-')[0]

export const getDocumentLink = document => `${axios.defaults.baseURL || process.env.VUE_APP_DOCUMENT_URL || 'https://api.dev-zelos.de'}/document/download/${document.document_id}`

export const getSignImageLink = document => `${axios.defaults.baseURL || process.env.VUE_APP_DOCUMENT_URL}/documents-sign/image/${document.document_id}`

export const getStampedDocumentLink = document => `${axios.defaults.baseURL || process.env.VUE_APP_DOCUMENT_URL}/document/download/stamp/${document.document_id}`
export const getStampedDocumentPreviewLink = document => `${axios.defaults.baseURL || process.env.VUE_APP_DOCUMENT_URL || 'https://api.dev-zelos.de'}/documents/preview/stamp/${document.document_id}`
export const getDocumentLinkPreview = document => `${axios.defaults.baseURL || process.env.VUE_APP_DOCUMENT_URL || 'https://api.dev-zelos.de'}/documents/preview/${document.document_id}`
export const getDocumentLinkPreviewWithId = document_id => `${axios.defaults.baseURL || process.env.VUE_APP_DOCUMENT_URL || 'https://api.dev-zelos.de'}/documents/preview/${document_id}`

export const clone = obj => JSON.parse(JSON.stringify(obj))

export const getDateFormat = (time = false) => {
  const { lang } = window.$vue.$store.state.app
  if (lang === 'de') {
    return time ? 'DD.MM.YYYY HH:mm' : 'DD.MM.YYYY'
  }
  if (lang === 'en') {
    return time ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'
  }
  return time ? 'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY'
}

export const formatDate = (date, time = false) => {
  if (!date) return ''
  return moment(date).format(getDateFormat(time))
}

export const formatDateForHistory = date => {
  if (!date) return ''
  const mDate = moment(date)
  let format = getDateFormat(true)
  if (mDate.isSame(moment(), 'day')) {
    format = 'HH:mm'
  }
  return mDate.format(format)
}
