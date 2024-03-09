<script setup lang="ts">
import type {HorizontalAlign, ScreenSize, ClassList} from "@/types";

defineOptions({
    inheritAttrs: false,
});

defineProps<{
    width?: ScreenSize;
    
    label: string;
    iconLeft?: string;
    iconRight?: string;

    horizontalAlign?: HorizontalAlign;
}>();
</script>

<template>
    <div class="mx-auto w-full" :class="[{ 'max-w-sm': width === 'sm' }, { 'max-w-md': width === 'md' }, { 'max-w-lg': width === 'lg' }, { 'max-w-xl': width === 'xl' }, { 'max-w-2xl': width === '2xl' }]">
        <p class="mx-2 mb-1.5 flex flex-row items-center" :class="[{ 'justify-start': horizontalAlign === 'left' }, { 'justify-center': horizontalAlign === 'centre' }, { 'justify-end': horizontalAlign === 'right' }]">
            <SvgIcon v-if="iconLeft" :name="iconLeft" class="mr-2 h-4" />
            {{ label }}
            <SvgIcon v-if="iconRight" :name="iconRight" class="ml-2 h-4" />
        </p>
        <slot></slot>
    </div>
</template>
