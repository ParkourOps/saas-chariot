<script setup lang="ts">
import TopBar from '@/components/layouts/TopBar.vue';
import { useAuth } from '@/libraries/firebase';
import { ref } from 'vue';
    
    const auth = useAuth();
    const showModal = ref(true);
    

</script>

<template>
    <TopBar />

    <div class="max-w-prose mx-auto mt-12 px-4 sm:px-0" v-if="auth.activeUser">
        <p class="mb-4">
            Welcome to the default user page.
        </p>
        <div class="flex flex-row justify-end">
            <button class="btn" @click="$showModal(()=>import('@/components/modals/SampleModal.vue'), { emailAddress: auth.activeUser.email ?? '<Unknown>' })">Show Modal</button>
        </div>
    </div>
    
    
</template>