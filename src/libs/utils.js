export const snakeToTitle = s =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ` ${d.toUpperCase()}`)

export const test = true

export const getYearFormDateString = date => date?.split('-')[0]

export const getDocumentLink = document => {
  const baseURL = 'https://contabo.lx42.de/8001'
  return `${baseURL}/document/download/${document.document_id}`
}
