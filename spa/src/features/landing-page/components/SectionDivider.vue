<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="divider divider-primary mb-14 mt-16">
        <h1 class="mb-1.5 font-serif text-2xl font-semibold tracking-wide text-primary">
            {{ title }}
        </h1>
    </div>
</template>
