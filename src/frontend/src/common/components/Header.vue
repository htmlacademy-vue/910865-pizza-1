<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink
        to="/"
        class="logo"
      >
        <AppLogo />
      </RouterLink>
    </div>

    <div class="header__cart">
      <RouterLink to="/cart">{{ totalOrderPrice }} ₽</RouterLink>
    </div>

    <div
      v-if="!isAuthenticated"
      class="header__user"
    >
      <RouterLink
        to="/login"
        class="header__login"
      >
        <span>Войти</span>
      </RouterLink>
    </div>

    <div
      v-else
      class="header__user"
    >
      <RouterLink
        to="/profile"
        @click.native="profileIconClickHandler"
      >
        <picture>
          <source
            type="image/webp"
            :srcset="imageWithExtensionLink(user.avatar, '.webp') + ' 1x,' + imageWithExtensionLink(user.avatar, '@2x.webp') + ' 2x'"
          >
          <img
            :src="user.avatar"
            :srcset="imageWithExtensionLink(user.avatar, '@2x.jpg')"
            :alt="user.name"
            width="32"
            height="32"
          >
        </picture>
        <span>{{ user.name }}</span>
      </RouterLink>
      <a
        href="#"
        class="header__logout"
        @click.prevent
        @click="$logout"
      >
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import AppLogo from "@/common/components/AppLogo.vue";

import { logout } from "@/common/mixins";
import { SIDEBAR_MENU } from "@/common/constants"

import { CHANGE_ACTIVE_SIDEBAR_MENU } from "@/store/mutation-types";

export default {
  name: "Header",
  components: {
    AppLogo,
  },
  mixins: [logout],
  computed: {
    ...mapState("Auth", ["user", "isAuthenticated"]),
    ...mapGetters("Cart", ["totalOrderPrice"]),
    ...mapGetters(["imageWithExtensionLink"]),
  },
  methods: {
    ...mapMutations("Orders", {
      changeActiveSidebarMenu: CHANGE_ACTIVE_SIDEBAR_MENU,
    }),

    profileIconClickHandler() {
      this.changeActiveSidebarMenu(SIDEBAR_MENU.USER_DATA.LABEL);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
