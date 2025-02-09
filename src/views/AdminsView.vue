<template>
    <section class="h-screen" style="padding: 0px 15px;">
        <div class="container flex flex-col items-center justify-center gap-3" style="padding: 15px 0;">
            <div class="top w-full flex items-center justify-between " style="padding: 0 10px;">
                <div class="left flex items-center justify-center gap-3">
                    <h1 class="text-3xl font-bold">Admins</h1>
                    <Button @click="router.push('/admins/add')" label="Add Admin" severity="success" />
                </div>
                <div class="right flex items-center justify-center gap-3">
                    <i class="pi cursor-pointer transition-all hover:scale-105 pi-th-large"></i>
                    <i class="pi cursor-pointer transition-all hover:scale-105 pi-table"></i>
                </div>
            </div>
            <div class="bottom grid md:grid-cols-4 grid-cols-1 gap-3">
                <div v-for="item in formattedAdmins" :key="item.id" class="card bg-slate-100/50 rounded-2xl">
                    <span class="flex items-center justify-center">
                        <img class="w-[50%]" src="https://i111.fastpic.org/big/2020/0401/da/3b42d0d4c1a7c814a292b6708b9a99da.png" alt="">
                    </span>
                    <span class="flex border-t border-slate-300 flex-col gap-2" style="padding: 10px;">
                        <span class="flex items-center justify-between">
                            <h1 class="text-xl font-bold">{{ item.username }} {{ item.usersecondname }}</h1>
                            <i class="pi pi-ellipsis-h cursor-pointer"></i>
                        </span>
                        <span class="flex items-center gap-2.5"><h2 class="text-slate-500">Email:</h2>{{ item.email }}</span>
                        <span class="flex items-center gap-2.5"><h2 class="text-slate-500">Added:</h2> {{ item.formattedDate }}</span> <!-- Xatolik shu yerda edi -->
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import router from '@/router';

const admins = ref([]);

function getAdmins() {
    axios.get('/api/admin')
        .then(response => {
            admins.value = response.data;
            console.log(admins.value);
        })
        .catch(err => {
            console.log(err);
        });
}
getAdmins();

// Har bir adminning sanasini formatlash
const formattedAdmins = computed(() => {
    return admins.value.map(admin => ({
        ...admin,
        formattedDate: new Date(admin.createdAt).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }));
});
</script>

<style scoped>
</style>
