import Vue from "vue";
import Vuex from "vuex";

import VuexPlugins from '@/plugins/vuexPlugins';

import modules from "@/store/modules";
import { RESET_STORE } from "@/store/mutation-types";
import { setupState as resetBuilderState } from "@/store/modules/builder.store";
import { setupState as resetCartState } from "@/store/modules/cart.store";
import { resetState as resetOrdersState } from "@/store/modules/orders.store";

Vue.use(Vuex);

const resetState = prevState => ({
  "Builder": resetBuilderState(),
  "Cart": resetCartState(),
  "Orders": resetOrdersState(prevState),
});

const mutations = {
  [RESET_STORE](state) {
    Object.assign(state, resetState(state));
  },
};

export default new Vuex.Store({
  mutations,
  modules,
  plugins: [VuexPlugins],
});
