// Lire le fichier excel

// Librairies: node-xlsx

// Un fonction par table

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://contabo.lx42.de/8001/',
  timeout: 30000,
  headers: { Authorization: 'Bearer johndoe@example.com' },
})

const api = data => axiosIns.post('/api/', { a: data })

async function importPartner(data) {
  // create partner company
  const entity = {
    partnercompany_name: data[0],
    partncompany_shortname: data[0],
  }

  const response = await api({
    entity: 'partnercompany',
    action: 'create',
    data: [entity],
  })

  const id = response.data.data.data[0][0]['partnercompany_id']

  // create address, partnercompany_address_rel

  // create contactdetail, relation,

  // create companydetail, relation

}
