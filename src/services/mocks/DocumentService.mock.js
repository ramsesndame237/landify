import { http } from "@/libs/axios";
import { DocumentUrls } from "@/services/api/urls";

class DocumentServiceMock {
  static  get_all_type_document = () => {
   return http.get(DocumentUrls.GET_All_TYPE_DOCUMENT)
  }

}

export default DocumentServiceMock
