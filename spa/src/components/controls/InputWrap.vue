<script setup lang="ts">
defineProps<{
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  label: string;
  labelClass?: string | string[];
  iconClass?: string | string[];
  align?: "start" | "center" | "end";
}>();
</script>

<template>
  <div
    class="mx-auto w-full"
    :class="[
      { 'max-w-sm': width === 'sm' },
      { 'max-w-md': width === 'md' },
      { 'max-w-lg': width === 'lg' },
      { 'max-w-xl': width === 'xl' },
      { 'max-w-2xl': width === '2xl' },
    ]"
  >
    <p
      class="mx-2 mb-1.5 flex flex-row items-center text-sm leading-none"
      :class="[
        labelClass,
        { 'justify-start': align === 'start' },
        { 'justify-center': align === 'center' },
        { 'justify-end': align === 'end' },
      ]"
    >
      <i v-if="iconClass" :class="iconClass" class="mr-2" />
      {{ label }}
    </p>
    <slot></slot>
  </div>
</template>
