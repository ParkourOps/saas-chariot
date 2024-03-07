<script setup lang="ts">
import configs from "@/configs";
import { computed } from "vue";
import logoSymbolDark from "./logo-symbol-base-100.webp";
import logoSymbolLight from "./logo-symbol-secondary.webp";

const props = defineProps<{
    dark?: boolean
    hideTitle?: boolean,
    hideSubtitle?: boolean,
}>();

const imgSrc = computed(()=>{
    if (props.dark) {
        return logoSymbolDark;
    } else {
        return logoSymbolLight;
    }
});
</script>

<template>
    <div class="flex flex-col items-center" :class="[
        {'text-base-100' : dark},
        {'text-secondary': !dark}
    ]">
        <img :src="imgSrc" :alt="configs.application.title" class="mb-1" width="182" height="100" />
        <p v-if="!hideTitle" class="text-center text-2xl font-black tracking-wide font-serif">
            {{ configs.application.title }}
        </p>
        <p v-if="!hideSubtitle && configs.application.subtitle" class="text-center max-w-[15rem] text-sm leading-tight tracking-tight font-mono">
            {{ configs.application.subtitle }}
        </p>
    </div>
</template>
