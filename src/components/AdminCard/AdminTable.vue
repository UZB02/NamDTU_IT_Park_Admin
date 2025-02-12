<template>
  <div class="w-full">
    <DataTable :value="formattedAdmins" stripedRows tableStyle="width: 100%">
      <Column field="username" header="Name"></Column>
      <Column field="usersecondname" header="Lastname"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="formattedDate" header="Created At"></Column>

      <!-- Edit & Delete Tugmalari -->
      <Column header="Actions">
        <template #body="slotProps">
          <button @click="editAdmin(slotProps.data)" class="p-button p-button-sm p-button-text">
            <i class="pi pi-pencil text-slate-400"></i>
          </button>
          <button @click="(event) => confirm2(event, slotProps.data._id)"  class="p-button p-button-sm p-button-text">
            <i class="pi pi-trash text-slate-400"></i>
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
    <Toast id="toast"></Toast>
         <ConfirmPopup></ConfirmPopup>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";


import Toast from "primevue/toast";
import ConfirmPopup from 'primevue/confirmpopup';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const toast = useToast();

const admins = ref([]);
const adminID=ref()

// API dan adminlarni olish
async function getAdmins() {
  try {
    const response = await axios.get("/api/admin");
    admins.value = response.data;
    console.log("Adminlar:", admins.value);
  } catch (err) {
    console.error("Xatolik:", err);
  }
}


// Sahifa yuklanganda API chaqiramiz
onMounted(getAdmins);

// Formatlangan adminlar ro‘yxati
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

// Edit funksiyasi
function editAdmin(admin) {
  console.log("Tahrirlash:", admin);
  alert(`Tahrirlash: ${admin.username}`);
}

// Delete funksiyasi
async function deleteAdmin() {
  try {
    await axios.delete(`/api/admin/${adminID.value}`);
    admins.value = admins.value.filter((admin) => admin._id !== adminID.value);
    toast.add({
        severity: "success",
        summary: "Success",
        detail: "Admin O'chirildi",
        life: 3000,
      });
  } catch (error) {
    console.error("O‘chirishda xatolik:", error);
  }
}

const confirm2 = (event, id) => {
    adminID.value = id; // O'chirish uchun ID ni saqlab qo'yamiz
    confirm.require({
        target: event.target, // Target qo'shildi
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: deleteAdmin, // Adminni o'chirish
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
</script>

<style scoped>
.p-button {
  margin-right: 5px;
}
</style>
