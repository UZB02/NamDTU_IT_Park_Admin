<template>
    <div class="flex flex-col gap-3">
        <span class="grid md:grid-cols-2 grid-cols-1 gap-2.5">
            <div class="flex flex-col gap-2">
            <label for="username">Username</label>
            <InputText id="username" v-model="username" aria-describedby="username-help" />
        </div>
          <div class="flex flex-col gap-2">
            <label for="username">Last Name</label>
            <InputText id="username" v-model="usersecondname" aria-describedby="username-help" />
        </div>
        </span>
        <span class="grid md:grid-cols-2 grid-cols-1 gap-2.5">
            <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <InputText id="email" v-model="email" aria-describedby="username-help" />
        </div>
          <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" class="border border-slate-300 outline-0 rounded shadow" style="padding: 8px">
        </div>
        </span>
        <span class="grid md:grid-cols-2 grid-cols-1 gap-2.5">
            <Button @click="addAdmin()" label="Add" severity="success" />
            <Button label="Cancel" severity="danger" />
        </span>
    </div>
</template>
<script setup>
import InputText from 'primevue/inputtext';
// import Password from 'primevue/password';
import Button from 'primevue/button';
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const usersecondname = ref('');
const email = ref('');
const password = ref('');

function addAdmin(){
    axios.post('/api/admin', {
        username: username.value,
        usersecondname: usersecondname.value,
        email: email.value,
        password: password.value
    })
   .then(response => {
    console.log(response);
    username.value = '';
    usersecondname.value = '';
    email.value = '';
    password.value = '';
   }).catch(err=>{
    console.log(err);
   })
}
</script>
<style scoped>
    
</style>