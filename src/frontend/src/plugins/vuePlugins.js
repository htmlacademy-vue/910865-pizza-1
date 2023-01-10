import Vue from "vue";

import { createResources } from "@/common/helpers";

import JwtService from "@/services/jwt.service";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JwtService,
        $api: () => createResources(),
      },
    });
  },
};

Vue.use(plugins);
