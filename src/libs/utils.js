import axios from '@/libs/axios'
import moment from 'moment'

export const snakeToTitle = s => s.replace(/^_*(.)|_+(.)/g, (a, c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`))

export const getYearFormDateString = date => date?.split('-')[0]

export const getDocumentLink = document => `${axios.defaults.baseURL || process.env.VUE_APP_DOCUMENT_URL || 'https://api.dev-zelos.de'}/document/download/${document.document_id}`
export const getDocumentLinkWithId = document_id => `${axios.defaults.baseURL || process.env.VUE_APP_DOCUMENT_URL || 'https://api.dev-zelos.de'}/document/download/${document_id}`

export const getSignImageLink = document => `${axios.defaults.baseURL || process.env.VUE_APP_DOCUMENT_URL || 'https://api.dev-zelos.de'}/documents-sign/image/${document.document_id}`

export const getStampedDocumentLink = document => `${axios.defaults.baseURL || process.env.VUE_APP_DOCUMENT_URL || 'https://api.dev-zelos.de'}/document/download/stamp/${document.document_id}`
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

export function cloneCanvas(oldCanvas) {
  // create a new canvas
  const newCanvas = document.createElement('canvas')
  const context = newCanvas.getContext('2d')

  // set dimensions
  newCanvas.width = oldCanvas.width
  newCanvas.height = oldCanvas.height

  // apply the old canvas to the new one
  context.drawImage(oldCanvas, 0, 0)

  // return the new canvas
  return newCanvas
}

export function nodeIndex(el) {
  return [...el.parentNode.children].indexOf(el)
}

export function isValidIBANNumber(input) {
  return !!/^AL\d{10}[0-9A-Z]{16}$|^AD\d{10}[0-9A-Z]{12}$|^AT\d{18}$|^BH\d{2}[A-Z]{4}[0-9A-Z]{14}$|^BE\d{14}$|^BA\d{18}$|^BG\d{2}[A-Z]{4}\d{6}[0-9A-Z]{8}$|^HR\d{19}$|^CY\d{10}[0-9A-Z]{16}$|^CZ\d{22}$|^DK\d{16}$|^FO\d{16}$|^GL\d{16}$|^DO\d{2}[0-9A-Z]{4}\d{20}$|^EE\d{18}$|^FI\d{16}$|^FR\d{12}[0-9A-Z]{11}\d{2}$|^GE\d{2}[A-Z]{2}\d{16}$|^DE\d{20}$|^GI\d{2}[A-Z]{4}[0-9A-Z]{15}$|^GR\d{9}[0-9A-Z]{16}$|^HU\d{26}$|^IS\d{24}$|^IE\d{2}[A-Z]{4}\d{14}$|^IL\d{21}$|^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^[A-Z]{2}\d{5}[0-9A-Z]{13}$|^KW\d{2}[A-Z]{4}22!$|^LV\d{2}[A-Z]{4}[0-9A-Z]{13}$|^LB\d{6}[0-9A-Z]{20}$|^LI\d{7}[0-9A-Z]{12}$|^LT\d{18}$|^LU\d{5}[0-9A-Z]{13}$|^MK\d{5}[0-9A-Z]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[0-9A-Z]{18}$|^MR13\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{12}[0-9A-Z]{11}\d{2}$|^ME\d{20}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{13}$|^PL\d{10}[0-9A-Z]{,16}n$|^PT\d{23}$|^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$|^SM\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^SA\d{4}[0-9A-Z]{18}$|^RS\d{20}$|^SK\d{22}$|^SI\d{17}$|^ES\d{22}$|^SE\d{22}$|^CH\d{7}[0-9A-Z]{12}$|^TN59\d{20}$|^TR\d{7}[0-9A-Z]{17}$|^AE\d{21}$|^GB\d{2}[A-Z]{4}\d{14}/.exec(input)
}

export const taxRegex = new RegExp(`^((AT)?U[0-9]{8}|(BE)?0[0-9]{9}|(BG)?[0-9]{9,10}|(CY)?[0-9]{8}L|
(CZ)?[0-9]{8,10}|(DE)?[0-9]{9}|(DK)?[0-9]{8}|(EE)?[0-9]{9}|
(EL|GR)?[0-9]{9}|(ES)?[0-9A-Z][0-9]{7}[0-9A-Z]|(FI)?[0-9]{8}|
(FR)?[0-9A-Z]{2}[0-9]{9}|(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|
(HU)?[0-9]{8}|(IE)?[0-9]S[0-9]{5}L|(IT)?[0-9]{11}|
(LT)?([0-9]{9}|[0-9]{12})|(LU)?[0-9]{8}|(LV)?[0-9]{11}|(MT)?[0-9]{8}|
(NL)?[0-9]{9}B[0-9]{2}|(PL)?[0-9]{10}|(PT)?[0-9]{9}|(RO)?[0-9]{2,10}|
(SE)?[0-9]{12}|(SI)?[0-9]{8}|(SK)?[0-9]{10})$`)

export const websiteRegex = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/

export const comercialRegistryNoRegex = /^(HRA|HRB)?\s?(\d+(?: \d+)*)(?: B)?/
