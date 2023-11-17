import { getUserData } from '@/auth/utils'
import DocumentServiceMock from "@/services/mocks/DocumentService.mock";

export default {
  namespaced: true,
  state: {
    documents: [],
    documenttype: [],
    subdocumenttype: [],
    previewDocument:null
  },
  getters: {
    getAllDocumentType: (state) => state.documenttype,
    getPreviewDocument:(state)=>{
      console.log("this is the getAlldocument create", state.previewDocument.document)
    }
  },
  mutations: {
    SET_TYPE_DOCUMENT: (state, documentTypes) => {
      console.log("this is the state of the value of send", JSON.parse(JSON.stringify(documentTypes)))
      // documentTypes.map((element) =>{
      //   state.documenttype.push(element.toRaw())
      // })
      state.documenttype = JSON.parse(JSON.stringify(documentTypes))
    },
    SET_PREVIEW_DOCUMENT:(state,doc)=>{
      state.previewDocument = JSON.parse(JSON.stringify(doc))
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
    async createDocumentPreview({commit},data){
      await commit('document/SET_PREVIEW_DOCUMENT',JSON.parse(JSON.stringify(data)),{root:true})
    }

  },

}
