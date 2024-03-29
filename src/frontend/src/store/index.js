import Vue from "vue";
import Vuex from "vuex";

import { doughSpellingMap } from "@/common/constants";

import VuexPlugins from '@/plugins/vuexPlugins';

import modules from "@/store/modules";
import {
  RESET_STORE,
  FETCH_ENTITY
} from "@/store/mutation-types";
import { setupState as resetBuilderState } from "@/store/modules/builder.store";
import { setupState as resetCartState } from "@/store/modules/cart.store";
import { resetState as resetOrdersState } from "@/store/modules/orders.store";

Vue.use(Vuex);

const resetState = prevState => ({
  "Builder": resetBuilderState(),
  "Cart": resetCartState(),
  "Orders": resetOrdersState(prevState),
});

const state = {
  dough: [],
  sizes: [],
  sauces: [],
  ingredients: [],
  misc: [],
};

const getters = {
  getEntityById: state => (entity, id) => {
    return state[entity].find(it => it.id === id);
  },
  pizzaPrice: () => (sizeId, doughId, sauceId, ingredients, getter) => {
    const multiplier = getter("sizes", sizeId)?.multiplier;
    const doughPrice = getter("dough", doughId)?.price;
    const saucePrice = getter("sauces", sauceId)?.price;
    const ingredientsPrice = ingredients.reduce((prev, curr) => {
      const ingredientPrice = getter("ingredients", curr.ingredientId)?.price;

      return prev + (ingredientPrice * curr.quantity);
    }, 0);

    return multiplier * (doughPrice + saucePrice + ingredientsPrice);
  },
  countSum: () => (items, itemList) => {
    return items?.reduce((prev, curr) => prev + (curr.quantity * itemList.find(it => it.id === curr.miscId).price), 0) || 0;
  },
  doughText: () => (sizeId, doughId, getter) => {
    const size = getter("sizes", sizeId).name;
    const dough = getter("dough", doughId).name;

    return `${size}, на ${doughSpellingMap[dough]} тесте`;
  },
  ingredientsText: () => (ingredients, ingredientsList) => {
    return `Начинка: ${ ingredients.map(ingredient => {
      return ingredientsList.find(ingredientListItem => {
        return ingredientListItem.id === ingredient.ingredientId
      }).name.toLowerCase()
    }).join(", ")}`;
  },
  sauceText: () => (sauceId, getter) => {
    const sauce = getter("sauces", sauceId).name;

    return `Соус: ${sauce.toLowerCase()}`;
  },
  fullAddress: () => (address) => {
    const { street, building, flat } = address;
    const flatStr = flat.length !== 0 ? `, кв. ${address.flat}` : "";

    return `${street}, д. ${building}` + flatStr;
  },
  formInputSizeClass: () => (additionalSizeClass, size) => {
    return size.length !== 0 ? `${additionalSizeClass}--${size}` : "";
  },
  imageWithExtensionLink: () => (link, extension) => {
    const linkWithoutExtension = link.split(".")[0];

    return `${linkWithoutExtension}${extension}`;
  },
  itemCounter: () => (items, id, propertyName) => {
    const itemIndex = items.findIndex(it => it[propertyName] === id);

    return itemIndex === - 1 ? 0 : items[itemIndex].quantity;
  },
};

const actions = {
  async init({ dispatch, rootState }) {
    dispatch("fetchDough");
    dispatch("fetchSizes");
    dispatch("fetchSauces");
    dispatch("fetchIngredients");
    dispatch("fetchMisc");

    if (rootState["Auth"].isAuthenticated) {
      dispatch("Orders/fetchUserAddresses");
      dispatch("Orders/fetchUserOrders");
    }
  },

  async fetchDough({ commit }) {
    const dough = await this.$api.dough.query();

    commit(FETCH_ENTITY, { entity: dough, name: "dough" });
    commit("Builder/UPDATE_DOUGH_VALUE", dough[0].id);
  },
  async fetchSizes({ commit }) {
    const sizes = await this.$api.sizes.query();

    commit(FETCH_ENTITY, { entity: sizes, name: "sizes" });
    commit("Builder/UPDATE_SIZE_VALUE", sizes[0].id);
  },
  async fetchSauces({ commit }) {
    const sauces = await this.$api.sauces.query();

    commit(FETCH_ENTITY, { entity: sauces, name: "sauces" });
    commit("Builder/UPDATE_SAUCE_VALUE", sauces[0].id);
  },
  async fetchIngredients({ commit }) {
    const ingredients = await this.$api.ingredients.query();

    commit(FETCH_ENTITY, { entity: ingredients, name: "ingredients" });
  },
  async fetchMisc({ commit }) {
    const misc = await this.$api.misc.query();

    commit(FETCH_ENTITY, { entity: misc, name: "misc" });
  },
};

const mutations = {
  [FETCH_ENTITY](state, { entity, name }) {
    state[name] = entity;
  },
  [RESET_STORE](state) {
    Object.assign(state, resetState(state));
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
  plugins: [VuexPlugins],
});
