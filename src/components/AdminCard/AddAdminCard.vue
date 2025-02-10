<template>
  <div class="flex flex-col gap-3">
    <Toast id="toast"></Toast>
    <span class="grid md:grid-cols-2 grid-cols-1 gap-2.5">
      <div class="flex flex-col gap-2">
        <label for="username">Username</label>
        <InputText
          id="username"
          v-model="username"
          aria-describedby="username-help"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="username">Last Name</label>
        <InputText
          id="username"
          v-model="usersecondname"
          aria-describedby="username-help"
        />
      </div>
    </span>
    <span class="grid md:grid-cols-2 grid-cols-1 gap-2.5">
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="email"
          aria-describedby="username-help"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          class="border border-slate-300 outline-0 rounded shadow"
          style="padding: 8px"
        />
      </div>
    </span>
    <span class="grid md:grid-cols-2 grid-cols-1 gap-2.5">
      <Button @click="addAdmin()" :label="isLoading ? 'Loading...' : 'Add'" severity="success" />
      <Button @click="router.push('/admins')" label="Cancel" severity="danger" />
    </span>
  </div>
</template>
<script setup>
import InputText from "primevue/inputtext";
// import Password from 'primevue/password';
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

const username = ref("");
const usersecondname = ref("");
const email = ref("");
const password = ref("");
const isLoading = ref(false);

function addAdmin() {
  isLoading.value = true;
  if (
    usersecondname.value == "" ||
    username.value == "" ||
    email.value == "" ||
    password.value == ""
  ) {
    toast.add({
      severity: "error",
      summary: "Xatolik",
      detail: `Ma'lumotlarni to'liq kiriting!`,
      life: 3000,
    });
    isLoading.value = false;
  } else {
    isLoading.value = true;
    axios
      .post("/api/admin", {
        username: username.value,
        usersecondname: usersecondname.value,
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        isLoading.value = false;
        toast.add({
          severity: "success",
          summary: "Ushbu ma'lumotlar qo'shildi",
          detail: "Admin qo'shildi!",
          life: 3000,
        });
        console.log(response);
        username.value = "";
        usersecondname.value = "";
        email.value = "";
        password.value = "";
        
      })
      .catch((err) => {
        isLoading.value = false;
        toast.add({
          severity: "error",
          summary: "Xatolik",
          detail: "Ma'lumotlarni qo'shishda xatolik yuz berdi!",
          life: 3000,
        });
        console.log(err);
      });
  }
}
</script>
<style scoped>
label {
  color: black;
}
</style>
