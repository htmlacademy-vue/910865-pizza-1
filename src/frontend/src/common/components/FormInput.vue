<template>
  <label
    class="input"
    :class="labelClass"
  >
    <span :class="spanClass">{{ text }}</span>

    <input
      ref="input"
      v-if="!slotProvided"
      :type="inputType"
      :name="inputName"
      :placeholder="placeholder"
      :required="required"
      :value="value"
      :disabled="disabled"
      @change="(e) => inputChangeHandler(e, inputName)"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    text: {
      type: String,
      required: true,
    },
    labelClass: {
      type: String,
      default: "",
    },
    spanClass: {
      type: String,
      default: "",
    },
    inputType: {
      type: String,
      default: "",
    },
    inputName: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputChangeHandler: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    slotProvided() {
      return Object.keys(this.$slots).length;
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="text"]:disabled {
  background-color: #cecece;
}
</style>
