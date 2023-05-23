<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      navRoutes: [
        {
          path: "/",
          title: "Home",
          slug: "home",
        },

        {
          path: "/transactions",
          title: "Transactions",
          slug: "transactions",
        },
        {
          path: "/monster",
          title: "Monster",
          slug: "monster",
        },
        {
          path: "/jobapp",
          title: "Job App",
          slug: "jobapp",
        },
      ],
    };
  },
  methods: {
    onRouteClick: function (path) {
      this.$router.push(path);
    },
    currentRouteName(routeSlug) {
      if (this.$route.name) {
        return routeSlug === this.$route.name;
      }
    },
  },
};
</script>

<template>
  <div class="mt-5 text-white">
    <div class="py-4 ml-10">
      <p class="text-[26px] tracking-[5px] font-mono">Evolve</p>
    </div>
    <div class="flex flex-col ml-5">
      <div
        v-for="route of navRoutes"
        class="p-5 routeWrapper mb-2 w-full hover:bg-white hover:text-black text-[16px] transition-[background] duration-200 ease-in-out rounded-l-full"
        :class="this.currentRouteName(route.slug) ? 'bg-white text-black' : ' '"
        @click="(event) => onRouteClick(route.path)"
      >
        <RouterLink :to="route.path">{{ route.title }}</RouterLink>
      </div>
    </div>
  </div>
</template>
