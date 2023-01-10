<template>
  <div class="content__result">
    <p>Итого: {{ totalPizzaPrice }} ₽</p>

    <button
      type="button"
      class="button"
      :disabled="disabled"
      @click="submitButtonClickHandler"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import {
  ADD_TO_CART,
  UPDATE_EXISTING_PIZZA,
  CLEAR_BUILDER_PROPERTIES,
  SET_EDITING_PIZZA
} from "@/store/mutation-types";

import { uniqueId } from "lodash";

export default {
  name: "PriceCounter",
  computed: {
    ...mapState("Builder", ["currentDough", "currentSize", "currentSauce", "selectedIngredients", "pizzaName", "editingPizza"]),
    ...mapState("Cart", ["cart"]),
    ...mapGetters("Builder", ["totalPizzaPrice"]),

    disabled() {
      return this.totalPizzaPrice === 0 || (Object.keys(this.selectedIngredients).length === 0 || this.pizzaName.length === 0);
    },
  },
  methods: {
    ...mapMutations("Builder", {
      setEditingPizza: SET_EDITING_PIZZA,
      clearBuilderProperties: CLEAR_BUILDER_PROPERTIES,
    }),
    ...mapMutations("Cart", {
      addToCart: ADD_TO_CART,
      updateExistingPizza: UPDATE_EXISTING_PIZZA,
    }),

    submitButtonClickHandler() {
      const newCartItem = {
        dough: this.currentDough,
        size: this.currentSize,
        sauce: this.currentSauce,
        ingredients: this.selectedIngredients,
        name: this.pizzaName,
        price: this.totalPizzaPrice,
        amount: 1,
        id: this.editingPizza ? this.editingPizza.id : parseInt(uniqueId()),
      };

      if (this.editingPizza) {
        const oldItemData = this.cart.find(it => it.id === this.editingPizza.id);

        this.updateExistingPizza({
          ...newCartItem,
          amount: oldItemData.amount,
        });
        this.setEditingPizza(null);
      } else {
        this.addToCart(newCartItem);
      }

      this.clearBuilderProperties();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
