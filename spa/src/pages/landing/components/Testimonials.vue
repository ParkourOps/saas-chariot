<script setup lang="ts">
import type { Testimonials } from "../types/testimonials";
import TestimonialCard from "./TestimonialCard.vue";

defineProps<{
    testimonials: Testimonials;
}>();
</script>

<template>
    <div class="my-20 flex flex-col gap-20">
        <TestimonialCard v-for="(testimonial, idx) in testimonials" :key="`testimonial#${idx}`" :testimonial="testimonial" />
    </div>
</template>
