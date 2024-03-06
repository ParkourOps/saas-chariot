<script setup lang="ts">
    defineProps<{
        endOfPage?: boolean
    }>();
</script>

<template>
    <div class="pt-6 px-4 pb-6 sm:pt-10" :class="[
        {'pb-6': !endOfPage},
        {'pb-24': endOfPage}
    ]">
        <slot />
    </div>
</template>
