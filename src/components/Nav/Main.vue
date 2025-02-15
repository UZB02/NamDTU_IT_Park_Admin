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
  <Dialog
    v-model:visible="visible"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Update your information.</span
    >
    <div class="flex flex-col gap-2 items-center justify-center">
      <div class="flex flex-col w-full mb-4">
        <label for="username" class="font-semibold w-24">Name</label>
        <InputText
          v-model="editAdminUsername"
          id="username"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col w-full mb-4">
        <label for="lastname" class="font-semibold w-24">Last Name</label>
        <InputText
          v-model="editAdminUserSecondname"
          id="lastname"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col w-full mb-8">
        <label for="email" class="font-semibold w-24">Email</label>
        <InputText
          v-model="editAdminEmail"
          id="email"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex w-full gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          class="w-[50%]"
          @click="visible = false"
        ></Button>
        <Button
          type="button"
          :label="isLoading ? 'Loading...' : 'Edit'"
          @click="updateAdmin()"
          class="w-[50%]"
        ></Button>
      </div>
    </div>
  </Dialog>
  <Toast id="toast"></Toast>
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
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";

import { useToast } from "primevue/usetoast";
const toast = useToast();
const adminID = ref(localStorage.getItem("adminID"));
const router = useRouter();
const admin = ref({});
const visible = ref(false);

const editAdminUsername = ref("");
const editAdminUserSecondname = ref("");
const editAdminEmail = ref("");
const isLoading = ref(false);

function getAdminInfo() {
  axios
    .get(`/api/admin/${adminID.value}`)
    .then((response) => {
      admin.value = response.data;
      editAdminUsername.value = response.data.username;
      editAdminUserSecondname.value = response.data.usersecondname;
      editAdminEmail.value = response.data.email;
      console.log(admin.value);
    })
    .catch((err) => {
      console.log(err);
    });
}

getAdminInfo();

function updateAdmin() {
  isLoading.value = true;
  if (
    !editAdminUsername.value ||
    !editAdminUserSecondname.value ||
    !editAdminEmail.value
  ) {
    isLoading.value = false;
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ma'lumotlarni to'liq kiriting",
      life: 3000,
    });
    return;
  } else {
    axios
      .put(`/api/admin/${adminID.value}`, {
        username: editAdminUsername.value,
        usersecondname: editAdminUserSecondname.value,
        email: editAdminEmail.value,
      })
      .then((response) => {
        if (response.status == 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Admin o'zgartirildi",
            life: 3000,
          });
          console.log(response.data);
          getAdminInfo();
          isLoading.value = false;
          visible.value = false;
        }
        isLoading.value = false;
      })
      .catch((err) => {
        isLoading.value = false;
        console.log(err);
      });
  }
}

const menu = ref();
const items = ref([
  {
    label: "Loading...",
    icon: "pi pi-user",
  },
  {
    label: "Edit",
    icon: "pi pi-user-edit",
    command: () => {
      visible.value = true;
    },
  },
  {
    separator: true,
  },
  {
    label: "Sign Out",
    icon: "pi pi-sign-out",
    command: () => {
      signOut();
    },
  },
]);
watchEffect(() => {
  if (admin.value.username) {
    items.value[0].label = admin.value.username;
  }
});

function signOut() {
  localStorage.removeItem("adminID");
  localStorage.removeItem("token");
  router.push("/login");
}

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
<style scoped></style>
