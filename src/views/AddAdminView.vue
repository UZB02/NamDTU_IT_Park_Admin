<template>
    <section class="h-screen" style="padding: 0px 15px;">
        <div class="container flex flex-col items-center justify-center gap-3" style="padding: 15px 0;">
            <div class="top w-full">
                <div class="text-xl md:text-[24px] text-slate-500"><span @click="router.push('/admins')" class="cursor-pointer text-green-500  font-semibold">Admins</span> / <span class="font-semibold text-lg md:text-[24px]">Add Admin</span></div>
            </div>
            <div class="bottom w-full  flex items-center justify-center">
                <AddAdminCard />
            </div>
        </div>
    </section>
</template>
<script setup>
import router from '@/router';
import AddAdminCard from '../components/AdminCard/AddAdminCard.vue'
</script>
<style scoped>
    
</style>