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
          <div class="left text-lg md:text-[24px] text-slate-400 flex items-center justify-center gap-3">
            <h1 @click="router.push('/')" class="text-xl md:text-[28px] text-green-500 font-bold cursor-pointer">Home</h1> /
            <h1 class="text-lg md:text-[24px] text-slate-400 font-bold">Admins</h1>
          </div>
          <div class="right flex items-center justify-center gap-3">
            <Button
              @click="router.push('/admins/add')"
              label="Add Admin"
              severity="success"
              size="small"
            />
            <i @click="cardORTable()" class="pi cursor-pointer transition-all hover:scale-105 pi-th-large"></i>
            <i @click="cardORTable()" class="pi cursor-pointer transition-all hover:scale-105 pi-table"></i>
          </div>
        </div>
        <div class="bottom grid grid-cols-1 w-full gap-3">
          <div class="w-full" :class="cardORtable ? 'hidden' : ''">
            <AdminCard />
          </div>
          <div :class="cardORtable ? '' : 'hidden'">
            <TableComponent :admins="admins" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import router from "@/router";
import axios from "axios"; //❗ E'tibor bering, axios import qilinmagan edi

import AdminCard from "@/components/AdminCard/AdminCard.vue";
import TableComponent from "@/components/AdminCard/AdminTable.vue";

const cardORtable = ref(false);
const admins = ref([]); // Adminlar ro‘yxati

function cardORTable() {
  cardORtable.value = !cardORtable.value;
  getAdmins()
}

async function getAdmins() {
  try {
    const response = await axios.get("/api/admin");
    admins.value = response.data;
    console.log("Adminlar:", admins.value);
  } catch (err) {
    console.error("Xatolik:", err);
  }
}

onMounted(getAdmins);
</script>
