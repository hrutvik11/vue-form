import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import TransactionsView from "../views/TransactionsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/transactions",
      name: "transactions",
      component: () => import("../views/TransactionsView.vue"),
    },
    {
      path: "/monster",
      name: "monster",
      component: () => import("../views/MonsterView.vue"),
    },
  ],
});

export default router;
