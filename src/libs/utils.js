export const snakeToTitle = s =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ` ${d.toUpperCase()}`)

export const test = true

export const getYearFormDateString = date => date?.split('-')[0]
