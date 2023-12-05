<script setup lang="ts">
import { useAuth } from '@/libraries/firebase/use-auth';

    const auth = useAuth();
</script>

<template>
    <div class="flex flex-row p-4 justify-between items-center shadow bg-primary">
        <p class="text-3xl font-bold text-white cursor-pointer" @click="$router.push({name: 'user'})">SaaS Chariot</p>
        <button class="btn btn-ghost text-white" @click="auth.logout">
            SIGN OUT
        </button>
    </div>
</template>