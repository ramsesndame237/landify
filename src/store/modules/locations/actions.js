import LocationServices from '@/services/locationServices/locationServices'

const actions = {
  async fetchCreateNewLocation({ commit }, payload) {
    await LocationServices.create_new_location(payload).then(response => {

    })
  },
}
export default actions
