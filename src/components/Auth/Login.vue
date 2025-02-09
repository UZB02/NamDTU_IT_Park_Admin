<template>
  <div class="flex w-full flex-col md:flex-row">
    <Toast id="toast"></Toast>
    <div
      class="w-full md:w-5/12 flex flex-col items-center justify-center gap-3 py-5"
    >
      <div class="flex w-[90%] md:w-full flex-col gap-2">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="email" />
      </div>
      <div class="flex w-[90%] md:w-full flex-col gap-2">
        <label for="password">Password</label>
        <InputText id="password" type="password" v-model="password" />
      </div>
      <div class="flex w-[90%] md:w-full">
        <button
          @click="login"
          style="padding: 8px 0;"
          class="w-full cursor-pointer flex items-center justify-center bg-green-500/90 rounded mx-auto"
          :disabled="isLoading"
        >
          <h1
            class="text-white font-medium text-center text-xl"
            :class="isLoading? 'hidden' : 'block'"
          >
          Login
          </h1>
          <ProgressSpinner
            :style="isLoading ? `width: 30px; height: 28px` : `display: none;`"
            strokeWidth="8"
            fill="transparent"
            animationDuration=".5s"
            aria-label="Custom ProgressSpinner"
          />
        </button>
      </div>
    </div>
    <div class="w-full md:w-2/12">
      <Divider
        layout="vertical"
        class="!hidden md:!flex bg-slate-800"
      ></Divider>
      <Divider layout="horizontal" class="!flex md:!hidden" align="center"
        ><b>OR</b></Divider
      >
    </div>
    <div class="w-full md:w-5/12 flex items-center justify-center py-5">
      <Button
        label="Sign Up"
        icon="pi pi-user-plus"
        severity="success"
        class="w-full max-w-[17.35rem] mx-auto"
      ></Button>
    </div>
  </div>
</template>

<script setup>
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

import ProgressSpinner from "primevue/progressspinner";

const toast = useToast();

const email = ref("");
const password = ref("");
const isLoading = ref(false);

function login() {
  isLoading.value = true;
  axios
    .post("/api/login", { email: email.value, password: password.value })
    .then((res) => {
      if (res.status == 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("adminID" , res.data.user._id)
        toast.add({
          severity: "success",
          summary: "Muvoffaqiyatli",
          detail: "Xush Kelibsiz",
          life: 3000,
        });
        isLoading.value = false;
        router.push("/");
        console.log(res);
      }
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Xatolik",
        detail: `${error.response.data.message}`,
        life: 3000,
      });
      isLoading.value = false;
      console.log(error.response.data.message);
    });
  // console.log(email.value, password.value);
}
</script>

<style>
label {
  color: white;
}
#toast {
  width: 80%;
}

@media screen and (min-width: 768px) {
  #toast {
    width: 400px;
  }
}
</style>
