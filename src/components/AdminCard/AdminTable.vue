<template>
  <div class="w-full">
    <DataTable :value="formattedAdmins" stripedRows tableStyle="width: 100%;">
       <Column header="ID">
        <template #body="slotProps">
          {{ slotProps.data.order }}
        </template>
      </Column>
      <Column field="username" header="Name"></Column>
      <Column field="usersecondname" header="Lastname"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="formattedDate" header="Created At"></Column>
      <Column header="Actions">
        <template #body="slotProps">
          <button @click="getadminID(slotProps.data._id)" class="p-button p-button-sm p-button-text">
            <i class="pi pi-pencil text-slate-400"></i>
          </button>
          <button @click="(event) => confirm2(event, slotProps.data._id)"  class="p-button p-button-sm p-button-text">
            <i class="pi pi-trash text-slate-400"></i>
          </button>
        </template>
      </Column>
    </DataTable>
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
import { ref, computed, defineProps, onMounted, watch } from "vue";
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const toast = useToast();
const visible = ref(false);

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


const props = defineProps({
  admins: {
    type: Array,
    default: () => [],
  },
});
const adminID = ref();
const editAdminUsername = ref("");
const editAdminUserSecondname = ref("");
const editAdminEmail = ref("");
const isLoading = ref(false);


const formattedAdmins = computed(() => {
  return (props.admins || []).map((admin, index) => ({
    ...admin,
    order: index + 1,
    formattedDate: new Date(admin.createdAt).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
});

watch(
  () => props.admins,
  (newVal) => {
    console.log("Yangi admins:", newVal);
  },
  { immediate: true }
);

function getadminID(id) {
  adminID.value = id;
  visible.value = true;
  getAdminById(adminID.value);
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
function deleteAdmin() {
  if (!adminID.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Admin ID not found",
      life: 3000,
    });
    return;
  }

  axios
    .delete(`/api/admin/${adminID.value}`)
    .then((response) => {
      toast.add({
        severity: "success",
        summary: "Deleted",
        detail: "Admin successfully deleted",
        life: 3000,
      });
      getAdmins(); // Ro'yxatni yangilash
    })
    .catch((err) => {
      console.error("Xatolik:", err);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete admin",
        life: 3000,
      });
    });
}


const confirm2 = (event, id) => {
  adminID.value = id;
  confirm.require({
    target: event.target,
    message: "Do you want to delete this record?",
    icon: "pi pi-info-circle",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: deleteAdmin, // ✅ Endi mavjud funksiyani chaqiradi
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
  });
};


// ✅ `watch()` bilan `checkEditInput()`
watch(visible, (newVal) => {
  if (!newVal) {
    editAdminEmail.value = "";
    editAdminUsername.value = "";
    editAdminUserSecondname.value = "";
  }
});
</script>

<style scoped>
.p-button {
  margin-right: 5px;
}
</style>
