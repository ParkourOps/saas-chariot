<script setup lang="ts">
defineProps<{
    hideTitle?: boolean;
}>();
</script>

<template>
    <div
        class="prose prose-sm mx-auto text-primary md:prose-base prose-headings:px-8 prose-headings:text-center prose-headings:font-semibold prose-headings:leading-tight prose-h1:font-bold prose-a:text-secondary"
        :class="[{ 'prose-h1:hidden': hideTitle }]"
    >
        <slot />
    </div>
</template>
