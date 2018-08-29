import Vue from 'vue'
import Vuex from 'vuex'
import { apiClient } from 'frontend/lib/ApiClient'
import getStorePlugins from './plugins'

Vue.use(Vuex)

const initialState = {
  locale: 'en-US',
  mobile: false,
  authToken: null,
  backgroundImage: null,
  hangar: [],
  currentUser: null,
  citizen: null,
  lastRoute: null,
  previousRoute: null,
  version: null,
  online: true,
  tradeHubPrices: {},
  tradeHubPricesID: null,
  filters: {},
  hangarDetails: false,
  hangarFleetchart: false,
  hangarFleetchartScale: 1,
  hangarPublicFleetchart: false,
  hangarPublicFleetchartScale: 1,
  hangarFilterVisible: true,
  navbarCollapsed: true,
  overlayVisible: false,
  modelDetails: false,
  modelFilterVisible: true,
}

const store = new Vuex.Store({
  state: initialState,
  getters: {
    isAuthenticated(state) {
      return state.authToken !== null
    },
    mobile(state) {
      return state.mobile
    },
    hangar(state) {
      return state.hangar
    },
    currentUser(state) {
      return state.currentUser
    },
    citizen(state) {
      return state.citizen
    },
    previousRoute(state) {
      return state.previousRoute
    },
    tradeHubPrices(state) {
      return state.tradeHubPrices
    },
    tradeHubPricesID(state) {
      return state.tradeHubPricesID
    },
    hangarDetails(state) {
      return state.hangarDetails
    },
    hangarFleetchart(state) {
      return state.hangarFleetchart
    },
    hangarPublicFleetchart(state) {
      return state.hangarPublicFleetchart
    },
    hangarFilterVisible(state) {
      return state.hangarFilterVisible
    },
    navbarCollapsed(state) {
      return state.navbarCollapsed
    },
    overlayVisible(state) {
      return state.overlayVisible
    },
    modelDetails(state) {
      return state.modelDetails
    },
    modelFilterVisible(state) {
      return state.modelFilterVisible
    },
  },
  actions: {
    async logout(context) {
      context.commit('setAuthToken', null)
      context.commit('setHangar', [])
      context.commit('setCurrentUser', null)
      context.commit('setCitizen', null)

      try {
        await apiClient.destroy('sessions')
      } catch (_error) {
        // ignoring logout error
      }
    },
    login(context, authToken) {
      context.commit('setAuthToken', authToken)
    },
    renewToken(context, token) {
      context.commit('setAuthToken', token)
    },
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    reset(state) {
      Object.assign(state, initialState)
    },
    resetTradeHubPrices(state) {
      state.tradeHubPrices = initialState.tradeHubPrices
      state.tradeHubPricesID = initialState.tradeHubPricesID
    },
    setStoreVersion(state, payload) {
      state.version = payload
    },
    setLocale(state, locale) {
      state.locale = locale
    },
    setMobile(state, payload) {
      state.mobile = payload
    },
    setOnlineStatus(state, payload) {
      state.online = payload
    },
    setAuthToken(state, payload) {
      state.authToken = payload
    },
    logout(state) {
      state.authToken = null
      state.hangar = []
      state.currentUser = null
      state.citizen = null
    },
    setCurrentUser(state, payload) {
      state.currentUser = Object.assign({}, state.currentUser, payload)
    },
    resetCitizen(state) {
      state.citizen = null
    },
    setCitizen(state, payload) {
      state.citizen = Object.assign({}, state.citizen, payload)
    },
    setBackgroundImage(state, payload) {
      state.backgroundImage = payload
    },
    setHangar(state, payload) {
      state.hangar = payload
    },
    addToHangar(state, payload) {
      state.hangar.push(payload)
    },
    removeFromHangar(state, payload) {
      state.hangar.splice(state.hangar.indexOf(payload), 1)
    },
    setLastRoute(state, payload) {
      state.lastRoute = Object.assign({}, state.lastRoute, payload)
    },
    setPreviousRoute(state, payload) {
      state.previousRoute = Object.assign({}, state.previousRoute, payload)
    },
    setTradeHubPrices(state, payload) {
      state.tradeHubPrices = payload
    },
    setTradeHubPricesID(state, payload) {
      state.tradeHubPricesID = payload
    },
    setFilters(state, payload) {
      state.filters = Object.assign({}, state.filters, payload)
    },
    toggleHangarDetails(state) {
      state.hangarDetails = !state.hangarDetails
    },
    toggleHangarFleetchart(state) {
      state.hangarFleetchart = !state.hangarFleetchart
    },
    toggleHangarPublicFleetchart(state) {
      state.hangarPublicFleetchart = !state.hangarPublicFleetchart
    },
    toggleHangarFilter(state) {
      state.hangarFilterVisible = !state.hangarFilterVisible
    },
    setHangarFleetchartScale(state, payload) {
      state.hangarFleetchartScale = payload
    },
    setHangarPublicFleetchartScale(state, payload) {
      state.hangarPublicFleetchartScale = payload
    },
    toggleNavbar(state) {
      state.navbarCollapsed = !state.navbarCollapsed
    },
    showOverlay(state) {
      state.overlayVisible = true
    },
    hideOverlay(state) {
      state.overlayVisible = false
    },
    closeNavbar(state) {
      state.navbarCollapsed = true
    },
    toggleModelDetails(state) {
      state.modelDetails = !state.modelDetails
    },
    toggleModelFilter(state) {
      state.modelFilterVisible = !state.modelFilterVisible
    },
  },
  /* eslint-enable no-param-reassign */
  plugins: getStorePlugins(),
})

export default store
