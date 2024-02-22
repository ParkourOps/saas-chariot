<script setup lang="ts">
    definePage({
        meta: {
            requiresAuth: true,
        }
    });
</script>

<template>
    <TheTopBar />
    <RouterView />
</template>
