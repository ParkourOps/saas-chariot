<script setup lang="ts">
import TopBar from '@/components/layout/top-bar.vue';
import { useAuth } from '@/libraries/firebase';
    
    const auth = useAuth();
    

</script>

<template>
    <TopBar />
    {{ auth.activeUser }}
</template>