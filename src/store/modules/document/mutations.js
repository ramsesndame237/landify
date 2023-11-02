import documentState from "@/store/modules/document/state";

const mutationsDocument = {
  SET_TYPE_DOCUMENT:(stateDocument = documentState,documentTypes) => {
    stateDocument.documenttype = documentTypes
  }
}

export default mutationsDocument
