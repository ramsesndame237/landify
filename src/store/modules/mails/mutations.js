import states from '@/store/modules/mails/states'

const mutations = {
  SET_TOGGLE_VIEW_ROW: (stateMail = states, value) => {
    stateMail.show_data_column = value
  },
}

export default mutations
