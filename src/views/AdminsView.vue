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
            
          />
          <i
            class="pi cursor-pointer transition-all hover:scale-105 pi-th-large"
          ></i>
          <i
            class="pi cursor-pointer transition-all hover:scale-105 pi-table"
          ></i>
        </div>
      </div>
      <div class="bottom grid md:grid-cols-3 grid-cols-1 gap-3">
        <div
          v-for="item in formattedAdmins"
          :key="item.id"
          class="card bg-white shadow transition-all duration-150 hover:bg-slate-50 rounded-2xl"
        >
          <span class="flex items-center justify-center">
            <img
              class="w-[50%]"
              src="https://i111.fastpic.org/big/2020/0401/da/3b42d0d4c1a7c814a292b6708b9a99da.png"
              alt=""
            />
          </span>
          <span
            class="flex border-t border-slate-300 flex-col gap-2"
            style="padding: 10px"
          >
            <span class="flex items-center justify-between">
              <h1 class="text-xl font-bold truncate text-ellipsis">
                {{ item.username }} {{ item.usersecondname }}
              </h1>
              <i
                @click="getAdminID(item._id)"
                class="pi pi-ellipsis-h cursor-pointer"
                style="padding: 0 5px"
              ></i>
            </span>
            <span class="flex items-center truncate text-ellipsis gap-2.5"
              ><h2 class="text-slate-500">Email:</h2>
              {{ item.email }}</span
            >
            <span class="flex items-center gap-2.5"
              ><h2 class="text-slate-500">Added:</h2>
              {{ item.formattedDate }}</span
            >
          </span>
        </div>
        <Menu ref="menu" :model="overlayMenuItems" :popup="true" />
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
      <ConfirmDialog></ConfirmDialog>
      </div>
      <Loading :class="dataLoading ? '' : 'hidden'"/>
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import Button from "primevue/button";
import router from "@/router";
import Menu from "primevue/menu";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Loading from "../components/Loading/Main.vue"

import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const visible = ref(false);
const menu = ref(null);
const admin_id = ref();
const admins = ref([]);
const editAdminUsername = ref('');
const editAdminUserSecondname = ref('');
const editAdminEmail = ref('')
const isLoading = ref(false);
const dataLoading = ref(true);
const overlayMenuItems = [
  {
    label: "Taxrirlash",
    icon: "pi pi-pencil",
    command: () => {
      console.log("editors");
      visible.value = true;
    },
  },
  {
    label: `O'chirish`,
    icon: "pi pi-trash",
    command: () => {
      confirm2();
    },
  },
];

const toggle = (event) => {
  menu.value.toggle(event);
};

function getAdminID(id) {
  admin_id.value = id;
  console.log(id);
  toggle(event);
  getAdminById(id);
}

function getAdminById(id) {
  axios
    .get(`/api/admin/${id}`)
    .then((response) => {
      editAdminUsername.value = response.data.username;
      editAdminUserSecondname.value = response.data.usersecondname;
      editAdminEmail.value = response.data.email;
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateAdmin() {
    isLoading.value = true;
  if(!editAdminUsername.value || !editAdminUserSecondname.value || !editAdminEmail.value) {
    isLoading.value = false;
    toast.add({ severity: 'error', summary: 'Error', detail: 'Ma\'lumotlarni to\'liq kiriting', life: 3000 });
    return;
  }else{
     axios
    .put(
      `/api/admin/${admin_id.value}`,{
        username: editAdminUsername.value,
        usersecondname: editAdminUserSecondname.value,
        email: editAdminEmail.value,
      }
    )
    .then((response) => {
      if(response.status==200){
        toast.add({ severity:'success', summary: 'Success', detail: 'Admin o\'zgartirildi', life:3000 });
        console.log(response.data);
        getAdmins();
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

function deleteAdmins() {
  console.log(5569);
  axios
    .delete(`/api/admin/${admin_id.value}`)
    .then((response) => {
      console.log(response.data);
      toast.add({ severity:'success', summary: 'Success', detail: 'Admin o\'chirildi', life:3000 });
      getAdmins();
    })
    .catch((err) => {
      console.log(err);
    });
}

function getAdmins() {
  axios
    .get("/api/admin")
    .then((response) => {
        dataLoading.value = false;
      admins.value = response.data;
      console.log(admins.value);
    })
    .catch((err) => {
      console.log(err);
    });
}
getAdmins();

// Har bir adminning sanasini formatlash
const formattedAdmins = computed(() => {
  return admins.value.map((admin) => ({
    ...admin,
    formattedDate: new Date(admin.createdAt).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
});

const confirm2 = () => {
  confirm.require({
    message: "Do you want to delete this record?",
    header: "Danger Zone",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: () => {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Admin O'chirildi",
        life: 3000,
      });
      deleteAdmins();
    },
  });
};
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
