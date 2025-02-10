<template>
  <div>
    <Menubar style="border: none">
      <template #start>
        <h1 class="font-bold text-2xl">NamDTU</h1>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Avatar
            @click="toggle"
            class="cursor-pointer"
            image="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user.png"
            shape="circle"
          />
          <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
        </div>
      </template>
    </Menubar>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import "primeicons/primeicons.css";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";
import TieredMenu from "primevue/tieredmenu";

const adminID = ref(localStorage.getItem("adminID"));
const router = useRouter();
const admin = ref({});

function getAdminInfo() {
  axios
    .get(`/api/admin/${adminID.value}`)
    .then((response) => {
      admin.value = response.data;
      console.log(admin.value);
    })
    .catch((err) => {
      console.log(err);
    });
}

getAdminInfo();

const menu = ref();
const items = ref([
  {
    label: "Loading...",
    icon: "pi pi-user",
  },
  {
    label: "Edit",
    icon: "pi pi-user-edit",
  },
  {
    separator: true,
  },
  {
    label: "Sign Out",
    icon: "pi pi-sign-out",
    command: ()=>{
      signOut()
    },
  },
]);
watchEffect(() => {
  if (admin.value.username) {
    items.value[0].label = admin.value.username;
  }
});

function signOut(){
  localStorage.removeItem("adminID");
  localStorage.removeItem("token");
  router.push("/login");
}

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
<style scoped></style>
