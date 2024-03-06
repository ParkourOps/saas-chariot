<script setup lang="ts">
import type {HorizontalAlign, ScreenSize, ClassList} from "@/types";

defineOptions({
    inheritAttrs: false,
});

defineProps<{
    width?: ScreenSize;
    
    label: string;
    labelClass?: ClassList;
    
    iconLeft?: ClassList;
    iconRight?: ClassList;

    horizontalAlign?: HorizontalAlign;
}>();
</script>

<template>
    <div class="mx-auto w-full" :class="[{ 'max-w-sm': width === 'sm' }, { 'max-w-md': width === 'md' }, { 'max-w-lg': width === 'lg' }, { 'max-w-xl': width === 'xl' }, { 'max-w-2xl': width === '2xl' }]">
        <p class="mx-2 mb-1.5 flex flex-row items-center" :class="[labelClass, { 'justify-start': horizontalAlign === 'left' }, { 'justify-center': horizontalAlign === 'centre' }, { 'justify-end': horizontalAlign === 'right' }]">
            <i v-if="iconLeft" :class="iconLeft" class="mr-2" />
            {{ label }}
            <i v-if="iconRight" :class="iconRight" class="ml-2" />
        </p>
        <slot></slot>
    </div>
</template>
