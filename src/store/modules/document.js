import { getUserData } from '@/auth/utils'
import DocumentServiceMock from "@/services/mocks/DocumentService.mock";

export default {
  namespaced: true,
  state: {
    documents: [],
    documenttype: [],
    subdocumenttype: [],
    previewDocument:""
  },
  getters: {
    getAllDocumentType: (state) => state.documenttype
  },
  mutations: {
    SET_TYPE_DOCUMENT: (state, documentTypes) => {
      console.log("this is the state of the value of send", JSON.parse(JSON.stringify(documentTypes)))
      // documentTypes.map((element) =>{
      //   state.documenttype.push(element.toRaw())
      // })
      state.documenttype = JSON.parse(JSON.stringify(documentTypes))
    }
  },
  actions: {
    async fetchGetAllDocumentsTicket({ commit }) {
      await DocumentServiceMock.get_all_type_document().then(async (response) => {
        return response.json()
      }).then((data) =>{
        commit('document/SET_TYPE_DOCUMENT', data,{root:true})
      }).catch(error => {
        console.log(error)
      })

    },

  },

}
