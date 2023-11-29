<script setup lang="ts">
import { useAuth } from '@/libraries/firebase';

    const auth = useAuth();
</script>

<template>
    {{ auth.activeUser?.email }}
    <button class="btn" @click="auth.logout">Sign out</button>
</template>