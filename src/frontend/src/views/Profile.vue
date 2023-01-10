<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <OrderUserInfo />

    <OrderAddress
      v-for="address in userAddresses"
      :key="address.id"
      :id="address.id"
      :name="address.name"
      :street="address.street"
      :house="address.house"
      :apartment="address.apartment"
      :comment="address.comment"
      :inputChangeHandler="inputChangeHandler"
      :submitButtonClickHandler="submitButtonClickHandler"
      :editButtonClickHandler="editButtonClickHandler"
      :deleteAddressButtonClickHandler="deleteAddressButtonClickHandler"
    />

    <div
      v-if="!isAddNewAddress"
      class="layout__button"
    >
      <button
        type="button"
        class="button button--border"
        @click="addNewAddressButtonClickHandler"
      >
        Добавить новый адрес
      </button>
    </div>

    <OrderAddress
      v-else
      :isAddNewAddress="isAddNewAddress"
      :id="newAddressId"
      :name="name"
      :street="street"
      :house="house"
      :apartment="apartment"
      :comment="comment"
      :inputChangeHandler="inputChangeHandler"
      :submitButtonClickHandler="submitButtonClickHandler"
      :editButtonClickHandler="editButtonClickHandler"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import OrderUserInfo from "@/modules/orders/components/OrderUserInfo.vue";
import OrderAddress from "@/modules/orders/components/OrderAddress.vue";

import { addressProperySeparator } from "@/common/constants";

import {
  ADD_NEW_ADDRESS,
  EDIT_ADDRESS,
  SET_EDITING_ADDRESS,
  DELETE_ADDRESS
} from "@/store/mutation-types";

import { uniqueId } from "lodash";

export default {
  name: "Profile",
  components: {
    OrderUserInfo,
    OrderAddress,
  },
  data() {
    return {
      isAddNewAddress: false,
      newAddressId: parseInt(uniqueId()),
      name: "",
      street: "",
      house: "",
      apartment: "",
      comment: "",
    };
  },
  computed: {
    ...mapState("Orders", ["userAddresses"]),
  },
  methods: {
    ...mapMutations("Orders", {
      addNewAddress: ADD_NEW_ADDRESS,
      editAddress: EDIT_ADDRESS,
      setEditingAddress: SET_EDITING_ADDRESS,
      deleteAddress: DELETE_ADDRESS,
    }),

    resetInputData() {
      this.name = "";
      this.street = "";
      this.house = "";
      this.apartment = "";
      this.comment = "";
    },
    addNewAddressButtonClickHandler() {
      this.resetInputData();
      this.isAddNewAddress = true;
      this.setEditingAddress(-1);
    },
    inputChangeHandler(e, field) {
      const property = field.split(addressProperySeparator)[1];

      this[property] = e.target.value;
    },
    editButtonClickHandler(id) {
      const { name, street, house, apartment, comment } = this.userAddresses.find(it => it.id === id);

      this.isAddNewAddress = false;
      this.setEditingAddress(id);
      this.name = name;
      this.street = street;
      this.house = house;
      this.apartment = apartment;
      this.comment = comment;
      this.id = id;
    },
    submitButtonClickHandler() {
      const addressData = {
        id: this.id,
        name: this.name,
        street: this.street,
        house: this.house,
        apartment: this.apartment,
        comment: this.comment,
      };

      if (this.isAddNewAddress) {
        const newAddress = {
          ...addressData,
          id: parseInt(uniqueId()),
        };

        this.addNewAddress(newAddress);
        this.isAddNewAddress = false;
      } else {
        this.editAddress(addressData);
        this.setEditingAddress(-1);
      }

      this.resetInputData();
    },
    deleteAddressButtonClickHandler() {
      this.deleteAddress(this.id);
    },
  },
  beforeCreate() {
    if (!this.$store.state["Auth"].isAuthenticated) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
