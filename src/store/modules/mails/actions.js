const actions = {
  toggleSomeTableRowsVisibility({commit}, value){
    commit('SET_TOGGLE_VIEW_ROW',value || false)
  }
}

export  default  actions
