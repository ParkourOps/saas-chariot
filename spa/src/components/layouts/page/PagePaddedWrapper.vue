<script setup lang="ts">
    // defineProps<{
    //     endOfPage?: boolean
    // }>();
</script>

<template>
    <div class="py-6 px-2 sm:px-4 sm:py-10" :class="[
        // {'pb-6': !endOfPage},
        // {'pb-24': endOfPage}
    ]">
        <slot />
    </div>
</template>
