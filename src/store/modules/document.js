import { getUserData } from '@/auth/utils'
import DocumentServiceMock from "@/services/mocks/DocumentService.mock";

export default {
  namespaced: true,
  state: {
    documents: [],
    documenttype: [],
    subdocumenttype: []
  },
  getters: {
    getAllDocumentType: (state) => state.documenttype
  },
  mutations: {
    SET_TYPE_DOCUMENT: (state, documentTypes) => {
      console.log("this is the state of the value of send", documentTypes)
      state.documenttype = documentTypes
    }
  },
  actions: {
    async fetchGetAllDocumentsTicket({ commit }) {
      await DocumentServiceMock.get_all_type_document().then(async (response) => {
        return response.json()
      }).then((data) =>{
        commit('SET_TYPE_DOCUMENT', data)
      }).catch(error => {
        console.log(error)
      })

    }
  },

}
