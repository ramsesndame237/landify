import { LocationUrl } from '@/services/api/url'
import axiosIns from '@/libs/axios'

class LocationServices {
 static create_new_location = location => axiosIns.post(LocationUrl.CREATE_NEW_LOCATION, location)
}

export default LocationServices
