<script setup lang="ts">
defineProps<{
    icon?: string;
    title: string;
    align?: "start" | "center" | "end";
}>();
</script>

<template>
    <div class="mb-5 flex flex-row items-center border-b px-2 pb-3 font-bold sm:mb-6 sm:text-lg text-primary fill-primary" :class="[{ 'justify-start': align === 'start' }, { 'justify-center': align === 'center' }, { 'justify-end': align === 'end' }]">
        <SvgIcon :name="icon" class="h-6 mr-3" v-if="icon" />
        {{ title }}
    </div>
</template>
