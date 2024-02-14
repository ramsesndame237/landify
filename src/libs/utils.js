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

function mod97(string) {
  let checksum = string.slice(0, 2); let
    fragment
  for (let offset = 2; offset < string.length; offset += 7) {
    fragment = String(checksum) + string.substring(offset, offset + 7)
    checksum = parseInt(fragment, 10) % 97
  }
  return checksum
}

/*
 * Returns 1 if the IBAN is valid
 * Returns FALSE if the IBAN's length is not as should be (for CY the IBAN Should be 28 chars long starting with CY )
 * Returns any other number (checksum) when the IBAN is invalid (check digits do not match)
 */
export function isValidIBANNumber(input) {
  const CODE_LENGTHS = {
    AD: 24,
    AE: 23,
    AL: 28,
    AT: 20,
    AZ: 28,
    BA: 20,
    BE: 16,
    BG: 22,
    BH: 22,
    BR: 29,
    CH: 21,
    CR: 21,
    CY: 28,
    CZ: 24,
    DE: 22,
    DK: 18,
    DO: 28,
    EE: 20,
    ES: 24,
    LC: 30,
    FI: 18,
    FO: 18,
    FR: 27,
    GB: 22,
    GI: 23,
    GL: 18,
    GR: 27,
    GT: 28,
    HR: 21,
    HU: 28,
    IE: 22,
    IL: 23,
    IS: 26,
    IT: 27,
    JO: 30,
    KW: 30,
    KZ: 20,
    LB: 28,
    LI: 21,
    LT: 20,
    LU: 20,
    LV: 21,
    MC: 27,
    MD: 24,
    ME: 22,
    MK: 19,
    MR: 27,
    MT: 31,
    MU: 30,
    NL: 18,
    NO: 15,
    PK: 24,
    PL: 28,
    PS: 29,
    PT: 25,
    QA: 29,
    RO: 24,
    RS: 22,
    SA: 24,
    SE: 24,
    SI: 19,
    SK: 24,
    SM: 27,
    TN: 24,
    TR: 26,
  }
  const iban = String(input).toUpperCase().replace(/[^A-Z0-9]/g, '') // keep only alphanumeric characters
  const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/) // match and capture (1) the country code, (2) the check digits, and (3) the rest
  // check syntax and length
  if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
    return false
  }
  // rearrange country code and check digits, and convert chars to ints
  const digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, letter => letter.charCodeAt(0) - 55)
  // final check
  return mod97(digits) === 1
}
