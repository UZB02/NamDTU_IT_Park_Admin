<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed } from "vue";
import AppLayout from "./layouts/AppLayout.vue";
import { useRoute } from "vue-router";



const route = useRoute();
const layout = computed(() => route.meta.layout || AppLayout);

import { useRouter } from "vue-router";
const router = useRouter();

function checkToken (){
      const token = localStorage.getItem("token");
      console.log(55);
  if (token) {
    console.log("Welcome to");
  } else {
    router.push("/login");
  }
}

checkToken();

</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped>

</style>
