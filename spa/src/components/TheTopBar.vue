<script setup lang="ts">
import configs from "@/configs";
import useAuth from "@/libraries/firebase/use-auth";

const auth = useAuth();
</script>

<template>
    <div class="flex flex-row items-center justify-between bg-primary p-4 shadow">
        <p class="cursor-pointer text-3xl font-bold text-white" @click="$router.push({ name: 'user' })">
            {{ configs.application.title }}
        </p>
        <button class="btn btn-ghost text-white" @click="auth.logout">SIGN OUT</button>
    </div>
</template>
