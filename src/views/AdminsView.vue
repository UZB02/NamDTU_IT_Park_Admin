<template>
  <section class="h-screen" style="padding: 0px 15px">
    <div
      class="container flex flex-col items-center justify-center gap-3"
      style="padding: 15px 0"
    >
      <div class="main w-full flex flex-col items-center justify-center gap-3">
        <div
        class="top w-full flex items-center justify-between"
        style="padding: 0 10px"
      >
        <div class="left text-xl md:text-[24px] text-slate-400 flex items-center justify-center gap-3">
          <h1 @click="router.push('/')" class="text-xl md:text-[28px] text-green-500 font-bold cursor-pointer">Home</h1> /
          <h1 class="text-xl md:text-[24px] text-slate-400 font-bold">Admins</h1>
        </div>
        <div class="right flex items-center justify-center gap-3">
           <Button
            @click="router.push('/admins/add')"
            label="Add Admin"
            severity="success"
            size="small"
          />
          <i @click="coursORTable()"
            class="pi cursor-pointer transition-all hover:scale-105 pi-th-large"
          ></i>
          <i @click="coursORTable()"
            class="pi cursor-pointer transition-all hover:scale-105 pi-table"
          ></i>
        </div>
      </div>
      <div class="bottom grid grid-cols-1 w-full gap-3">
        <div class="w-full" :class="cardORtable ? 'hidden' : ''">
         <AdminCard></AdminCard>
        </div>
        <div :class="cardORtable ? '' : 'hidden'">
          <TableComponent></TableComponent>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import router from "@/router";

import AdminCard from "@/components/AdminCard/AdminCard.vue";
import TableComponent from '../components/AdminCard/AdminTable.vue'
const cardORtable=ref(false)

function coursORTable(){
  cardORtable.value =!cardORtable.value
}

</script>

<style scoped>
#toast {
  width: 80%;
}

@media screen and (min-width: 768px) {
  #toast {
    width: 400px;
  }
}
</style>
