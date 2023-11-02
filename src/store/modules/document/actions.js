import DocumentServiceMock from "@/services/mocks/DocumentService.mock";
import mutationsDocument from "@/store/modules/document/mutations";
const actionsDocuments = {
  async fetchGetAllDocumentsTicket({ commit }) {
alert('nous somme bien dans le fetchgetall')
    await DocumentServiceMock.get_all_type_document().then((response) => {
      commit('SET_TYPE_DOCUMENT', response.data)
    }).catch(error => {
      console.log(error)
    })

  }

}

export default actionsDocuments
