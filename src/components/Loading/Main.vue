<template>
    <div class="h-[80vh] flex items-center justify-center">
        <div class="loader"></div>
    </div>
</template>
<script setup>
</script>
<style scoped>
    .loader {
  width: fit-content;
  font-size: 40px;
  font-family: system-ui,sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: #0000;
  -webkit-text-stroke: 1px #000;
  background: 
    linear-gradient(-60deg,#0000 45%,#000 0 55%,#0000 0) 
    0/300% 100% no-repeat text;
  animation: l3 2s linear infinite;
}
.loader:before {
  content: "Loading";
}
@keyframes l3 {
  0%{background-position: 100%}
}
</style>