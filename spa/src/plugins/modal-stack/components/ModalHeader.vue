<script setup lang="ts">
defineProps<{
    iconClass?: string;
    title: string;
    align?: "start" | "center" | "end";
}>();
</script>

<template>
    <div class="mb-5 flex flex-row items-center border-b px-2 pb-3 font-bold sm:mb-6 sm:text-lg" :class="[{ 'justify-start': align === 'start' }, { 'justify-center': align === 'center' }, { 'justify-end': align === 'end' }]">
        <i v-if="iconClass" class="mr-3 leading-none" :class="iconClass" />
        {{ title }}
    </div>
</template>
