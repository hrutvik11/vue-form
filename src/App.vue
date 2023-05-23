<script setup>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="flex flex-row w-full h-full p-4 gap-6">
    <div
      class="h-full w-1/6 bg-primary-color rounded-[20px] shadow-[0_5px_11px_0px_rgba(0,0,0,0.30)]"
    >
      <Sidebar />
    </div>
    <div class="flex-1"><RouterView /></div>
  </div>
</template>

<style scoped></style>
