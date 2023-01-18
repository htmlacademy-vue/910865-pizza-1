import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
    meta: {
      layout: "AppLayoutSidebar",
      middlewares: [auth],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "AppLayoutEmpty",
      middlewares: [isLoggedIn],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      layout: "AppLayoutSidebar",
      middlewares: [auth],
    },
  },
];
