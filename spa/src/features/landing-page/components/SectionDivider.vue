<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="divider divider-primary mb-14 mt-16">
            <h1 class="mb-1.5 font-serif text-2xl font-semibold tracking-wide text-primary">
                <a :href="`#${$attrs.id}`" v-if="$attrs.id" class="border-b-2 border-b-primary/0 hover:border-b-primary/80 transition-all">
                    {{ title }}
                </a>
                <span v-else>
                    {{ title }}
                </span>
            </h1>
        
    </div>
</template>
