<script setup lang="ts">
defineProps<{
    items: string[];
    textSize: "xs" | "sm" | "base" | "lg" | "xl" | "2xl"
}>();
</script>

<template>
    <ul class="mx-auto flex w-fit flex-col gap-6 px-4 sm:gap-12 max-w-prose">
        <li v-for="(item, idx) in items" :key="`item#${idx}`" class="flex flex-col pb-4 sm:flex-row items-center">
            <p class="text-serif mb-4 mr-4 text-center font-serif text-4xl font-semibold text-accent/60">{{ idx + 1 }}.</p>
            <p class="-mt-1.5 max-w-prose text-center text-x sm:text-left" :class="[
                {'text-xs': textSize === 'xs'},
                {'text-sm': textSize === 'sm'},
                {'text-base': textSize === 'base'},
                {'text-lg': textSize === 'lg'},
                {'text-xl': textSize === 'xl'},
                {'text-2xl': textSize === '2xl'},
            ]"
                v-html="item"
            />
        </li>
    </ul>
</template>
