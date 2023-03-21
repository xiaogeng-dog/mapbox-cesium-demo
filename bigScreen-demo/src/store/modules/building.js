const building = {
  namespaced: true,
  state: {
    position: {
      lat: 31.38464,
      lng: 120.98074
    },
    mapVisible: false
  },
  mutations: {
    setPosition (state, position) {
      state.position = {
        lng: position.lng,
        lat: position.lat
      }
    },
    setMapVisible (state, isShow) {
      state.mapVisible = isShow
    }
  }
}

export default building
