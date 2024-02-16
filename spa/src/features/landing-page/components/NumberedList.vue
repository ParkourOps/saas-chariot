<script setup lang="ts">
defineProps<{
    items: string[];
}>();
</script>

<template>
    <ul class="mx-auto flex w-fit flex-col gap-6 px-4 sm:gap-12">
        <li v-for="(item, idx) in items" :key="`item#${idx}`" class="flex flex-col pb-4 sm:flex-row">
            <h1 class="text-serif mb-4 mr-4 text-center font-serif text-4xl font-semibold text-accent/60">{{ idx + 1 }}.</h1>
            <p class="-mt-1.5 max-w-prose text-center text-lg sm:text-left">
                {{ item }}
            </p>
        </li>
    </ul>
</template>
