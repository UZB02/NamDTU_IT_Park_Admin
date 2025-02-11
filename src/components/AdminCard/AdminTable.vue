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
            <i class="pi pi-pencil text-blue-500"></i>
          </button>
          <button @click="deleteAdmin(slotProps.data._id)" class="p-button p-button-sm p-button-text">
            <i class="pi pi-trash text-red-500"></i>
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const admins = ref([]);

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
async function deleteAdmin(adminId) {
  if (!confirm("Haqiqatan ham o‘chirmoqchimisiz?")) return;

  try {
    await axios.delete(`/api/admin/${adminId}`);
    admins.value = admins.value.filter((admin) => admin._id !== adminId);
    console.log("O‘chirildi:", adminId);
  } catch (error) {
    console.error("O‘chirishda xatolik:", error);
  }
}
</script>

<style scoped>
.p-button {
  margin-right: 5px;
}
</style>
