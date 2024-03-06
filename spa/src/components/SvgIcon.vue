<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps<{
    name: string
}>();

const icon = defineAsyncComponent(() =>
  import(`@/assets/icons/svg/${props.name}.svg`)
);
</script>

<template>
  <component :is="icon" :class="$attrs.class" />
</template>