import { SIDEBAR_MENU } from "@/common/constants";

import {
  CHANGE_SHOW_MODAL_STATUS,
  DECREASE_MISC_COUNT,
  INCREASE_MISC_COUNT,
  SET_MISC_COUNT,
  SET_EDITING_ADDRESS,
  ADD_ORDER_MISC,
  DELETE_ORDER,
  ADD_NEW_ORDER,
  ADD_NEW_ADDRESS,
  EDIT_ADDRESS,
  DELETE_ADDRESS,
  CHANGE_ACTIVE_SIDEBAR_MENU
} from "@/store/mutation-types";

export const resetState = state => ({
  selectedMisc: {},
  showModal: false,
  editingAddress: -1,
  activeSidebarMenu: state["Orders"].activeSidebarMenu,
  userAddresses: state["Orders"].userAddresses,
  userOrders: state["Orders"].userOrders,
});

export const setupState = () => ({
  selectedMisc: {},
  showModal: false,
  editingAddress: -1,
  activeSidebarMenu: SIDEBAR_MENU.USER_DATA.LABEL,
  userAddresses: [
    {
      id: 1,
      name: "Адрес №1. Тест",
      street: "Невский пр.",
      house: "22",
      apartment: "46",
      comment: "Позвоните, пожалуйста, от проходной",
    },
    {
      id: 2,
      name: "Адрес №1",
      street: "Невский пр.",
      house: "22",
      apartment: "46",
      comment: "Позвоните, пожалуйста, от проходной",
    },
  ],
  userOrders: [
    {
      id: 1,
      orderNumber: 11199929,
      pizzas: [
        {
          name: "Капричоза",
          dough: "Тонкое",
          size: "30 см",
          sauce: "Томатный",
          ingredients: {
            "Грибы": {
              id: 1,
              name: "Грибы",
              image: "/public/img/filling/mushrooms.svg",
              price: 33,
              amount: 1,
            },
            "Лук": {
              id: 7,
              name: "Лук",
              image: "/public/img/filling/onion.svg",
              price: 21,
              amount: 1,
            },
            "Ветчина": {
              id: 4,
              name: "Ветчина",
              image: "/public/img/filling/ham.svg",
              price: 42,
              amount: 1,
            },
            "Пармезан": {
              id: 14,
              name: "Пармезан",
              image: "/public/img/filling/parmesan.svg",
              price: 35,
              amount: 1,
            },
            "Ананас": {
              id: 5,
              name: "Ананас",
              image: "/public/img/filling/ananas.svg",
              price: 25,
              amount: 1,
            },
            "Бекон": {
              id: 6,
              name: "Бекон",
              image: "/public/img/filling/bacon.svg",
              price: 42,
              amount: 1,
            },
            "Блю чиз": {
              id: 15,
              name: "Блю чиз",
              image: "/public/img/filling/blue_cheese.svg",
              price: 50,
              amount: 1,
            },
          },
          amount: 1,
          price: 782,
        },
        {
          name: "Моя любимая",
          dough: "Тонкое",
          size: "30 см",
          sauce: "Томатный",
          ingredients: {
            "Грибы": {
              id: 1,
              name: "Грибы",
              image: "/public/img/filling/mushrooms.svg",
              price: 33,
              amount: 1,
            },
            "Лук": {
              id: 7,
              name: "Лук",
              image: "/public/img/filling/onion.svg",
              price: 21,
              amount: 1,
            },
            "Ветчина": {
              id: 4,
              name: "Ветчина",
              image: "/public/img/filling/ham.svg",
              price: 42,
              amount: 1,
            },
            "Пармезан": {
              id: 14,
              name: "Пармезан",
              image: "/public/img/filling/parmesan.svg",
              price: 35,
              amount: 1,
            },
            "Ананас": {
              id: 5,
              name: "Ананас",
              image: "/public/img/filling/ananas.svg",
              price: 25,
              amount: 1,
            },
          },
          amount: 2,
          price: 782,
        },
      ],
      additionals: [
        {
          name: "Coca-Cola 0,5 литра",
          price: 56,
          image: "/public/img/cola.svg",
          amount: 1,
        },
        {
          name: "Острый соус",
          price: 10,
          image: "/public/img/sauce.svg",
          amount: 1,
        },
        {
          name: "Картошка из печи",
          price: 170,
          image: "/public/img/potato.svg",
          amount: 1,
        },
      ],
      orderPrice: 1564,
    },
    {
      id: 2,
      orderNumber: 11199929,
      pizzas: [
        {
          name: "Капричоза",
          dough: "Тонкое",
          size: "30 см",
          sauce: "Томатный",
          ingredients: {
            "Грибы": {
              id: 1,
              name: "Грибы",
              image: "/public/img/filling/mushrooms.svg",
              price: 33,
              amount: 1,
            },
            "Лук": {
              id: 7,
              name: "Лук",
              image: "/public/img/filling/onion.svg",
              price: 21,
              amount: 1,
            },
            "Ветчина": {
              id: 4,
              name: "Ветчина",
              image: "/public/img/filling/ham.svg",
              price: 42,
              amount: 1,
            },
            "Пармезан": {
              id: 14,
              name: "Пармезан",
              image: "/public/img/filling/parmesan.svg",
              price: 35,
              amount: 1,
            },
            "Ананас": {
              id: 5,
              name: "Ананас",
              image: "/public/img/filling/ananas.svg",
              price: 25,
              amount: 1,
            },
            "Бекон": {
              id: 6,
              name: "Бекон",
              image: "/public/img/filling/bacon.svg",
              price: 42,
              amount: 1,
            },
            "Блю чиз": {
              id: 15,
              name: "Блю чиз",
              image: "/public/img/filling/blue_cheese.svg",
              price: 50,
              amount: 1,
            },
          },
          amount: 1,
          price: 782,
        },
        {
          name: "Моя любимая",
          dough: "Тонкое",
          size: "30 см",
          sauce: "Томатный",
          ingredients: {
            "Грибы": {
              id: 1,
              name: "Грибы",
              image: "/public/img/filling/mushrooms.svg",
              price: 33,
              amount: 1,
            },
            "Лук": {
              id: 7,
              name: "Лук",
              image: "/public/img/filling/onion.svg",
              price: 21,
              amount: 1,
            },
            "Ветчина": {
              id: 4,
              name: "Ветчина",
              image: "/public/img/filling/ham.svg",
              price: 42,
              amount: 1,
            },
            "Пармезан": {
              id: 14,
              name: "Пармезан",
              image: "/public/img/filling/parmesan.svg",
              price: 35,
              amount: 1,
            },
            "Ананас": {
              id: 5,
              name: "Ананас",
              image: "/public/img/filling/ananas.svg",
              price: 25,
              amount: 1,
            },
          },
          amount: 2,
          price: 782,
        },
      ],
      additionals: [
        {
          name: "Coca-Cola 0,5 литра",
          price: 56,
          image: "/public/img/cola.svg",
          amount: 1,
        },
        {
          name: "Острый соус",
          price: 10,
          image: "/public/img/sauce.svg",
          amount: 1,
        },
        {
          name: "Картошка из печи",
          price: 170,
          image: "/public/img/potato.svg",
          amount: 1,
        },
      ],
      orderPrice: 1564,
    },
  ],
});

const mutations = {
  [CHANGE_ACTIVE_SIDEBAR_MENU](state, activeMenu) {
    state.activeSidebarMenu = activeMenu;
  },
  [CHANGE_SHOW_MODAL_STATUS](state, status) {
    state.showModal = status;
  },
  [DECREASE_MISC_COUNT](state, misc) {
    const selectedMisc = { ...state.selectedMisc };

    selectedMisc[misc.name].amount--;

    state.selectedMisc = { ...selectedMisc };
  },
  [INCREASE_MISC_COUNT](state, misc) {
    const selectedMisc = { ...state.selectedMisc };

    if (selectedMisc[misc.name]) {
      selectedMisc[misc.name].amount++;
    } else {
      selectedMisc[misc.name] = misc;
      selectedMisc[misc.name].amount = 1;
    }

    state.selectedMisc = { ...selectedMisc };
  },
  [SET_MISC_COUNT](state, { count, item }) {
    const selectedMisc = { ...state.selectedMisc };
    const miscName = item.name;

    if (count !== 0) {
      selectedMisc[miscName] = this.state["Builder"].misc.find(it => it.name === miscName);
      selectedMisc[miscName].amount = count;
    } else {
      delete selectedMisc[miscName];
    }

    state.selectedMisc = { ...selectedMisc };
  },
  [SET_EDITING_ADDRESS](state, id) {
    state.editingAddress = id;
  },
  [ADD_ORDER_MISC](state, misc) {
    state.selectedMisc = misc;
  },
  [DELETE_ORDER](state, id) {
    state.userOrders = state.userOrders.filter(it => it.id !== id);
  },
  [ADD_NEW_ORDER](state, order) {
    state.userOrders = [...state.userOrders, order];
  },
  [ADD_NEW_ADDRESS](state, address) {
    state.userAddresses = [...state.userAddresses, address];
  },
  [EDIT_ADDRESS](state, address) {
    const userAddresses = [...state.userAddresses];
    const editIndex = userAddresses.findIndex(it => it.id === address.id);

    userAddresses[editIndex] = address;
    state.userAddresses = userAddresses;
  },
  [DELETE_ADDRESS](state, id) {
    state.userAddresses = [...state.userAddresses.filter(it => it.id !== id)];
  },
};

const state = setupState();

export default {
  namespaced: true,
  state,
  mutations,
};
