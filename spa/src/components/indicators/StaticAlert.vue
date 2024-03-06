<script setup lang="ts">
import type { NotificationType } from '@/types';

    defineProps<{
        type: NotificationType;
    }>();
</script>

<template>
    <div 
        class="p-6 rounded-box border-2 font-semibold text-center sm:text-left leading-tight"
        :class="[
            {'bg-info text-info-content border-info-content' : type === 'info' },
            {'bg-success text-success-content border-success-content' : type === 'success' },
            {'bg-warning text-warning-content border-warning-content' : type === 'warning' },
            {'bg-error text-error-content border-error-content' : type === 'error' },
        ]"
    >
        <slot />
    </div>
</template>
