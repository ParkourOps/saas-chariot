<script setup lang="ts">
// import { useReactiveUserInterface } from '@/plugins/reactive-user-interface';
import type { ThemeColour } from '@/types';

defineProps<{
    title: string
    colour?: ThemeColour
}>();

// const ui = useReactiveUserInterface();
</script>

<template>
    <div class="divider divider-primary mb-14 mt-16"
        :class="[
            {[`divider-${colour} text-${colour}`] : colour}
        ]"
    >
            <h2 class="mb-1.5 text-center text-base text-black sm:text-2xl sm:font-semibold" >
                <a :href="`#${$attrs.id}`" v-if="$attrs.id" class="border-b-2 border-b-primary/0 hover:border-b-primary/80 transition-all">
                    {{ title }}
                </a>
                <span v-else>
                    {{ title }}
                </span>
            </h2>
    </div>
</template>
