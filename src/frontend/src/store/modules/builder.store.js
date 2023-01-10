import { ITEMS_INPUT_DATA, MAX_INGREDIENTS_NUMBER } from "@/common/constants";
import { countSum } from "@/common/helpers";

import {
  FETCH_DOUGH,
  FETCH_SIZES,
  FETCH_SAUCES,
  FETCH_INGREDIENTS,
  FETCH_MISC,
  UPDATE_DOUGH_VALUE,
  UPDATE_SAUCE_VALUE,
  UPDATE_SIZE_VALUE,
  UPDATE_NAME,
  DECREASE_INGREDIENT_COUNT,
  INCREASE_INGREDIENT_COUNT,
  SET_INGREDIENT_COUNT,
  ITEM_DROP,
  SET_EDITING_PIZZA,
  CLEAR_BUILDER_PROPERTIES
} from "@/store/mutation-types";

export const setupState = () => ({
  dough: [],
  sizes: [],
  sauces: [],
  ingredients: [],
  misc: [],
  selectedIngredients: {},
  currentDough: ITEMS_INPUT_DATA.DOUGH.DEFAULT_RADIO_CHECK,
  currentSauce: ITEMS_INPUT_DATA.SAUCE.DEFAULT_RADIO_CHECK,
  currentSize: ITEMS_INPUT_DATA.SIZE.DEFAULT_RADIO_CHECK,
  pizzaName: "",
  editingPizza: null,
});

const getters = {
  totalPizzaPrice(state) {
    const multiplier = state.sizes.find(it => it.name === state.currentSize).multiplier;
    const doughPrice = state.dough.find(it => it.name === state.currentDough).price;
    const saucePrice = state.sauces.find(it => it.name === state.currentSauce).price;
    const ingredientsPrice = countSum(Object.values(state.selectedIngredients));

    return multiplier * (doughPrice + saucePrice + ingredientsPrice);
  },
};

const actions = {
  async init({ dispatch }) {
    dispatch("fetchDough");
    dispatch("fetchSizes");
    dispatch("fetchSauces");
    dispatch("fetchIngredients");
    dispatch("fetchMisc");
  },

  async fetchDough({ commit }) {
    const dough = await this.$api.dough.query();

    commit(FETCH_DOUGH, dough);
  },
  async fetchSizes({ commit }) {
    const sizes = await this.$api.sizes.query();

    commit(FETCH_SIZES, sizes);
  },
  async fetchSauces({ commit }) {
    const sauces = await this.$api.sauces.query();

    commit(FETCH_SAUCES, sauces);
  },
  async fetchIngredients({ commit }) {
    const ingredients = await this.$api.ingredients.query();

    commit(FETCH_INGREDIENTS, ingredients);
  },
  async fetchMisc({ commit }) {
    const misc = await this.$api.misc.query();

    commit(FETCH_MISC, misc);
  },
};

const mutations = {
  [FETCH_DOUGH](state, items) {
    state.dough = items;
  },
  [FETCH_SIZES](state, items) {
    state.sizes = items;
  },
  [FETCH_SAUCES](state, items) {
    state.sauces = items;
  },
  [FETCH_INGREDIENTS](state, items) {
    state.ingredients = items;
  },
  [FETCH_MISC](state, items) {
    state.misc = items;
  },
  [UPDATE_DOUGH_VALUE](state, value) {
    state.currentDough = value;
  },
  [UPDATE_SAUCE_VALUE](state, value) {
    state.currentSauce = value;
  },
  [UPDATE_SIZE_VALUE](state, value) {
    state.currentSize = value;
  },
  [UPDATE_NAME](state, name) {
    state.pizzaName = name;
  },
  [DECREASE_INGREDIENT_COUNT](state, ingredient) {
    const selectedIngredients = { ...state.selectedIngredients };
    const ingredientName = ingredient.name;
    const count = --selectedIngredients[ingredientName].amount;

    if (count === 0) {
      delete selectedIngredients[ingredientName];
    } else {
      ingredient.amount = count;
      selectedIngredients[ingredientName] = ingredient;
    }

    state.selectedIngredients = { ...selectedIngredients };
  },
  [INCREASE_INGREDIENT_COUNT](state, ingredient) {
    const selectedIngredients = { ...state.selectedIngredients };
    const ingredientName = ingredient.name;

    if (selectedIngredients[ingredientName]) {
      selectedIngredients[ingredientName].amount++;
    } else {
      selectedIngredients[ingredientName] = ingredient;
      selectedIngredients[ingredientName].amount = 1;
    }

    state.selectedIngredients = { ...selectedIngredients };
  },
  [SET_INGREDIENT_COUNT](state, { count, item }) {
    const selectedIngredients = { ...state.selectedIngredients };
    const ingredientName = item.name;

    if (count > MAX_INGREDIENTS_NUMBER) {
      count = MAX_INGREDIENTS_NUMBER;
    }

    if (count !== 0) {
      selectedIngredients[ingredientName] = state.ingredients.find(it => it.name === ingredientName);
      selectedIngredients[ingredientName].amount = count;
    } else {
      delete selectedIngredients[ingredientName];
    }

    state.selectedIngredients = { ...selectedIngredients };
  },
  [ITEM_DROP](state, item) {
    const ingredients = { ...state.selectedIngredients };

    if (ingredients[item.name]) {
      if (ingredients[item.name].amount !== MAX_INGREDIENTS_NUMBER) {
        ingredients[item.name].amount++;
      }
    } else {
      ingredients[item.name] = {
        ...item,
        amount: 1,
      };
    }

    state.selectedIngredients = ingredients;
  },
  [SET_EDITING_PIZZA](state, status) {
    state.editingPizza = status;
  },
  [CLEAR_BUILDER_PROPERTIES](state) {
    state.selectedIngredients = {};
    state.currentDough = ITEMS_INPUT_DATA.DOUGH.DEFAULT_RADIO_CHECK;
    state.currentSauce = ITEMS_INPUT_DATA.SAUCE.DEFAULT_RADIO_CHECK;
    state.currentSize = ITEMS_INPUT_DATA.SIZE.DEFAULT_RADIO_CHECK;
    state.pizzaName = "";
  },
};

export default {
  namespaced: true,
  state: setupState(),
  getters,
  mutations,
  actions,
};
