<script setup lang="ts">
import { useAuth } from '@/libraries/firebase';
    
    const auth = useAuth();
</script>

<template>
        <div class="max-w-prose mx-auto mt-12 px-4 sm:px-0" v-if="auth.activeUser">
        <p class="mb-4">
            Welcome to the default user page.
        </p>
        <div class="flex flex-row justify-end">
            <button class="btn" @click="$showModal(()=>import('@/components/modals/SampleModal.vue'), { emailAddress: auth.activeUser.email ?? '<Unknown>' })">Show Modal</button>
        </div>
    </div>
</template>