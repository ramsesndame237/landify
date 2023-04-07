import axios from "@/libs/axios";
import moment from 'moment'

export const snakeToTitle = s =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ` ${d.toUpperCase()}`)

export const getYearFormDateString = date => date?.split('-')[0]

export const getDocumentLink = document => {
  return `${axios.defaults.baseURL}/document/download/${document.document_id}`
}

export const getSignImageLink = document => {
  return `${axios.defaults.baseURL}/documents-sign/image/${document.document_id}`
}

export const getStampedDocumentLink = document => {
  return `${axios.defaults.baseURL}/document/download/stamp/${document.document_id}`
}

export const getDateFormat = (time = false) => {
  const lang = window.$vue.$store.state.app.lang
  if (lang === 'de') {
    return time ? 'DD.MM.YYYY HH:mm:ss' : 'd.m.Y'
  }
  if (lang === 'en') {
    return time ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  return time ? 'DD-MM-YYYY HH:mm:ss' : 'DD-MM-YYYY'
}

export const formatDate = (date, time = false) => {
  if (!date) return ''
  return moment(date).format(getDateFormat(time))
}
