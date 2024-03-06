<script setup lang="ts">
import type { Testimonial } from "../types/testimonial";

defineProps<{
    testimonial: Testimonial;
}>();
</script>

<template>
    <!-- use overflow-x-clip to prevent commas from overflowing -->
    <div class="mx-auto w-fit px-4">
        <div class="flex flex-col items-center sm:flex-row">
            <div class="avatar order-last self-center sm:order-first sm:self-end" v-if="testimonial.avatar">
                <div class="size-32 rounded-full">
                    <img :src="testimonial.avatar" :alt="`Portrait photograph of ${testimonial.name}.`" height="128" width="128" />
                </div>
            </div>
            <div class="relative mb-6 text-primary sm:ml-8">
                <span class="absolute top-0 -ml-10 -mt-20 font-serif text-[20rem] opacity-10 sm:-ml-14">“</span>
                <p v-for="paragraph, idx in testimonial.quote" :key="`p-${idx+1}`" class="max-w-md text-center text-sm text-primary sm:text-left sm:text-base mb-4">
                    {{ paragraph }}
                </p>
                <span class="absolute bottom-0 right-0 -mb-[15rem] -mr-10 font-serif text-[20rem] opacity-10">”</span>
            </div>
        </div>
        <div class="text-center sm:text-left leading-none">
            <p class="font-serif text-xl font-medium sm:-mb-1">
                {{ testimonial.name }}
            </p>
            <p class="-ml-1 opacity-75">
                {{ testimonial.jobTitle }},
                <span class="whitespace-nowrap">{{ testimonial.organisation }}</span>
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.text-quote {
    ::before {
        content: "test";
    }
    ::after {
        content: "c";
    }
}
</style>
