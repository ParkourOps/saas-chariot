<script setup lang="ts" generic="T extends string">
  import { defineAsyncComponent } from 'vue';

  defineOptions({
    inheritAttrs: false,
  });

    const props = defineProps<{
        name: T,
    }>();

    const iconComponent = defineAsyncComponent(() => import(`@/assets/icons/svg/${props.name}.svg`));
  </script>

<template>
    <div class="max-h-full max-w-full inline-block leading-normal">
        <component :is="iconComponent" :class="$attrs.class"/>
    </div>
</template>
