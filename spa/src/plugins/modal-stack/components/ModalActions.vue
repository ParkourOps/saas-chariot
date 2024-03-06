<script setup lang="ts">
import type { JustifyContent } from '@/types';

    defineProps<{
        justify?: JustifyContent
    }>();
</script>

<template>
    <div 
        class="mt-4 flex gap-4 sm:mt-6 sm:gap-6"
        :class="[
            {'justify-start': justify === 'start'},
            {'justify-end': !justify || justify === 'end'},
            {'justify-center': justify === 'centre'},
            {'justify-between': justify === 'space-between'},
            {'justify-around': justify === 'space-around'},
            {'justify-evenly': justify === 'space-evenly'},
        ]"
    >
        <slot />
    </div>
</template>
