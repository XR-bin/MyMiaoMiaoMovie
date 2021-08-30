// 定义 “全局”状态的对象
const state = {
  cityName: window.localStorage.getItem('cityName') || '北京',
  cityId: window.localStorage.getItem('cityId') || 1
}

// 集中修改状态，可以被监控，能及时发现谁出问题，通过devtools工具的时光旅行功能
const mutations = {
  CITY_INFO(state, payload) {
    state.cityName = payload.cityName
    state.cityId = payload.cityId
  }
}

// 专门处理异步
const actions = {

}

export default {
  namespaced: true,    // 允许命名空间
  state,
  mutations,
  actions
}
