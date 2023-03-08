import axios from "@/libs/axios";

export const snakeToTitle = s =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ` ${d.toUpperCase()}`)

export const test = true

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
