import { CHANGE_AUTH_STATUS, SET_USER } from "@/store/mutation-types";

export const setupState = () => ({
  user: null,
  isAuthenticated: false,
});

const actions = {
  async login({ dispatch }, credentials) {
    const { token } = await this.$api.auth.login(credentials);

    this.$jwt.saveToken(token);
    this.$api.auth.setAuthHeader();
    dispatch("getMe");
  },
  async logout({ commit }, sendRequest = true) {
    if (sendRequest) {
      await this.$api.auth.logout();
    }

    this.$jwt.destroyToken();
    this.$api.auth.setAuthHeader();
    commit(CHANGE_AUTH_STATUS, false);
    commit(SET_USER, null);
  },
  async getMe({ commit, dispatch }) {
    try {
      const data = await this.$api.auth.getMe();

      commit(CHANGE_AUTH_STATUS, true);
      commit(SET_USER, data);
    } catch {
      dispatch("logout", false);
    }
  },
};

const mutations = {
  [CHANGE_AUTH_STATUS](state, status) {
    state.isAuthenticated = status;
  },
  [SET_USER](state, userData) {
    state.user = userData;
  },
};

export default {
  namespaced: true,
  state: setupState(),
  mutations,
  actions,
};
