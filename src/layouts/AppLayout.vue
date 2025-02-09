<template>
      <header class="shadow sticky top-0 z-10 bg-white">
    <nav>
      <div class="container">
        <Nav />
      </div>
    </nav>
  </header>
  <RouterView></RouterView>
</template>
<script setup>
import Nav from "../components/Nav/Main.vue";
import { RouterView } from "vue-router";


</script>
<style scoped></style>
