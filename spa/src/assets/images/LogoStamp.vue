<script setup lang="ts">
import LogoSymbol from './LogoSymbol.vue';
import configs from '@/configs';

defineProps<{
    colourClass?: string,
    showTitle?: boolean,
    showSubtitle?: boolean,
}>();
</script>

<template>
    <div class="flex flex-col items-center">
        <LogoSymbol class="mb-1 max-h-20" :class="[colourClass]"/>
        <p v-if="showTitle" class="text-center text-2xl font-black tracking-wide font-serif" :class="[colourClass]">
            {{ configs.application.title }}
        </p>
        <p v-if="showSubtitle && configs.application.subtitle" class="mt-1 text-center max-w-[15rem] text-sm leading-tight tracking-tight font-mono" :class="colourClass">
            {{ configs.application.subtitle }}
        </p>
    </div>
</template>
