<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useIndicators } from '@/state/indicators';
import type { ControlVariants } from '@/types';

const indicators = useIndicators();

    const props = defineProps<{
        disabled?: boolean,
        loading?: boolean,
        shape?: "square" | "circle",
        outline?: boolean,
        size?: "xs" | "sm" | "md" | "lg",
        block?: boolean,
        action?: ((()=>void) | (()=>Promise<void>)),
        variant?: ControlVariants | "ghost" | "link" | "glass",
        iconLeftClass?: string | string[]
        iconRightClass?: string | string[]
    }>();

    const _loading = ref(false);
    watch(()=>props.loading, (val)=>{
        _loading.value = val;
    }, {immediate: true});
    
    const _disabled = computed(()=>{
        return props.disabled || _loading.value;
    });

    async function handleAction() {
        if (!props.action) return;
        const token = indicators.registerPendingAction();
        _loading.value = true;
        await props.action();
        _loading.value = false;
        token.unregisterPendingAction();
    }
</script>

<template>
    <button
        class="btn"
        :disabled="_disabled"
        :class="[
            {'btn-xs': size === 'xs'},
            {'btn-sm': size === 'sm'},
            {'btn-md': size === 'md'},
            {'btn-lg': size === 'lg'},
            {'btn-square': shape === 'square'},
            {'btn-circle': shape === 'circle'},
            {'btn-outline': outline},
            {'btn-block': block},
            {'btn-neutral': variant === 'neutral'},
            {'btn-primary': variant === 'primary'},
            {'btn-secondary': variant === 'secondary'},
            {'btn-accent': variant === 'accent'},
            {'btn-info': variant === 'info'},
            {'btn-success': variant === 'success'},
            {'btn-warning': variant === 'warning'},
            {'btn-error': variant === 'error'},
            {'btn-ghost': variant === 'ghost'},
            {'btn-link': variant === 'link'},
            {'glass': variant === 'glass'},
        ]"
        @click="handleAction"
    >
        <span class="loading loading-spinner mr-2" v-if="_loading"></span>
        <i :class="iconLeftClass" v-if="iconLeftClass" />
        <slot />
        <i :class="iconRightClass" v-if="iconRightClass" />
    </button>
</template>
