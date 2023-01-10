<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <RadioButton
          :items="sauces"
          :itemMap="sauceMap"
          :itemName="ITEMS_INPUT_DATA.SAUCE.ITEM_NAME"
          :containerMessage="ITEMS_INPUT_DATA.SAUCE.CONTAINER_MESSAGE"
          :value="currentSauce"
          :inputChangeHandler="updateSauceValue"
        />

        <IngredientsFilling />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import RadioButton from "@/common/components/RadioButton.vue";
import IngredientsFilling from "@/modules/builder/components/BuilderIngredientsFillingSelector.vue";

import { sauceMap, ITEMS_INPUT_DATA } from "@/common/constants";

import { UPDATE_SAUCE_VALUE } from "@/store/mutation-types";

export default {
  name: "IngredientsSelector",
  components: {
    RadioButton,
    IngredientsFilling,
  },
  data() {
    return {
      sauceMap,
      ITEMS_INPUT_DATA,
    };
  },
  computed: {
    ...mapState("Builder", ["sauces"]),
    ...mapState("Builder", ["currentSauce"]),
  },
  methods: {
    ...mapMutations("Builder", {
      updateSauceValue: UPDATE_SAUCE_VALUE,
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
