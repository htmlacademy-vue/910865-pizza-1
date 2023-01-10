import { createResources } from "@/common/helpers";

import JwtService from "@/services/jwt.service";

export default function(store) {
  store.$jwt = JwtService;
  store.$api = createResources();
}
