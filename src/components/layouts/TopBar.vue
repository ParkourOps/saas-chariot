<script setup lang="ts">
import { useAuth } from '@/libraries/firebase';

    const auth = useAuth();
</script>

<template>
    <div class="flex flex-row p-4 justify-between items-center">
        <p class="text-3xl">Buildingreen</p>
        <button class="btn btn-ghost" @click="auth.logout">
            Sign out
        </button>
    </div>
</template>