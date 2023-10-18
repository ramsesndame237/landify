import state from '@/store/modules/locations/state'

const mutations = {
  SET_LOCATION: (locationState = state, newLocation) => {
    locationState.locations.push(newLocation)
  },
}

export default mutations
