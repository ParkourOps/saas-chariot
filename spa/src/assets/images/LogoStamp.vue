<script setup lang="ts">
import configs from "@/configs";
import { computed } from "vue";
import logoSymbolDark from "./logo-symbol-base-100.png";
import logoSymbolLight from "./logo-symbol-secondary.png";

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
        <img :src="imgSrc" :alt="configs.application.title" height="100" width="182" class="mb-1" />
        <p v-if="!hideTitle" class="text-center text-2xl font-black tracking-wide font-serif">
            {{ configs.application.title }}
        </p>
        <p v-if="!hideSubtitle && configs.application.subtitle" class="mt-1 text-center max-w-[15rem] text-sm leading-tight tracking-tight font-mono" :class="colourClass">
            {{ configs.application.subtitle }}
        </p>
    </div>
</template>
