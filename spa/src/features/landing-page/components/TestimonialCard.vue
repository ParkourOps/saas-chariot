<script setup lang="ts">
import type { Testimonial } from "../types/testimonial";

defineProps<{
    testimonial: Testimonial;
}>();
</script>

<template>
    <!-- use overflow-x-clip to prevent commas from overflowing -->
    <div class="mx-auto w-fit px-4 overflow-x-clip">
        <div class="flex flex-col items-center sm:flex-row">
            <div class="avatar order-last self-center sm:order-first sm:self-end" v-if="testimonial.avatar">
                <div class="w-32 rounded-full">
                    <img :src="testimonial.avatar" />
                </div>
            </div>
            <div class="relative mb-6 text-primary sm:ml-8">
                <span class="absolute top-0 -ml-10 -mt-20 font-serif text-[20rem] leading-none opacity-10 sm:-ml-14">“</span>
                <p class="max-w-md text-center text-sm text-primary sm:text-left sm:text-base">
                    {{ testimonial.quote }}
                </p>
                <span class="absolute bottom-0 right-0 -mb-[15rem] -mr-10 font-serif text-[20rem] leading-none opacity-10">”</span>
            </div>
        </div>
        <div class="text-center sm:text-left">
            <h1 class="-mb-1 font-serif text-xl font-medium">
                {{ testimonial.name }}
            </h1>
            <p class="-ml-1 leading-tight opacity-75">
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
