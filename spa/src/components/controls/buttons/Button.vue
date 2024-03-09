<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useIndicators } from '@/state/indicators';
import type { Action, ControlSize, ControlVariant } from '@/types';

defineOptions({
    inheritAttrs: false,
});

const indicators = useIndicators();

    const props = defineProps<{
        name?: string,
        disabled?: boolean,
        loading?: boolean,
        shape?: "square" | "circle",
        outline?: boolean,
        size?: Exclude<ControlSize,"xl">,
        block?: boolean,
        action?: Action | Action[],
        variant?: ControlVariant | "ghost" | "link" | "glass",
        label?: string,
        iconLeft?: string,
        iconRight?: string,
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
        if (Array.isArray(props.action)) {
            for (const p of props.action) {
                await p();
            }
        } else {
            await props.action();
        }
        _loading.value = false;
        token.unregisterPendingAction();
    }
</script>

<template>
    <button
        :name="name"
        class="btn leading-none"
        :disabled="_disabled"
        :class="[
            {'btn-xs': size === 'xs'},
            {'btn-sm': size === 'sm'},
            {'btn-md': !size || (size === 'md')},
            {'btn-lg': size === 'lg'},
            {'btn-square': shape === 'square'},
            {'btn-circle': shape === 'circle'},
            {'btn-outline': outline},
            {'btn-block': block},
            {'btn-neutral fill-neutral-content': variant === 'neutral'},
            {'btn-primary fill-primary-content': variant === 'primary'},
            {'btn-secondary fill-secondary-content': variant === 'secondary'},
            {'btn-accent fill-accent-content': variant === 'accent'},
            {'btn-info fill-info-content': variant === 'info'},
            {'btn-success fill-success-content': variant === 'success'},
            {'btn-warning fill-warning-content': variant === 'warning'},
            {'btn-error fill-error-content': variant === 'error'},
            {'btn-ghost fill-primary': variant === 'ghost'},
            {'btn-link fill-primary': variant === 'link'},
            {'glass': variant === 'glass'},
        ]"
        @click.prevent.stop="handleAction"
    >
        <span class="loading loading-spinner mr-2" v-if="_loading"></span>
        <SvgIcon v-if="iconLeft" :name="iconLeft" class="mr-2" :class="[
            {'h-2': size === 'xs'},
            {'h-3': size === 'sm'},
            {'h-4': !size || (size === 'md')},
            {'h-6': size === 'lg'},
            {'fill-primary/10': disabled}
        ]"/>
        <slot>
            {{ label }}
        </slot>
        <SvgIcon v-if="iconRight" :name="iconRight" class="ml-2" :class="[
            {'h-2': size === 'xs'},
            {'h-3': size === 'sm'},
            {'h-4': !size || (size === 'md')},
            {'h-6': size === 'lg'},
            {'fill-primary/10': disabled}
        ]"/>
    </button>
</template>
