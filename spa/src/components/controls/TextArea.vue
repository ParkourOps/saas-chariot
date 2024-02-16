<script setup lang="ts">
import { ref } from "vue";
import { computed, watch } from "vue";
import { type ZodString } from "zod";

const props = defineProps<{
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  spellcheck?: boolean;
  wrap?: "hard" | "soft";
  cols?: number;
  rows?: number;

  size?: "xs" | "sm" | "md" | "lg";

  modelValue?: string;
  schema?: ZodString;
}>();

const emits = defineEmits<{
  "update:modelValue": [value?: string];
  "update:valid": [value: boolean];
  "update:touched": [value: boolean];
}>();

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value?: string) {
        emits("update:modelValue", value);
    },
});

const valid = computed(() => {
    if (!value.value || value.value.length < 1) {
        return false;
    } else if (!props.schema) {
        return true;
    } else {
        const parseResult = props.schema.safeParse(value.value);
        return parseResult.success;
    }
});
watch(
    valid,
    (val) => {
        emits("update:valid", val);
    },
    { immediate: true },
);

const touched = ref(false);
watch(
    touched,
    (val) => {
        emits("update:touched", val);
    },
    { immediate: true },
);

defineExpose({
    valid,
    touched,
});
</script>

<template>
  <textarea
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :spellcheck="spellcheck"
    :wrap="wrap"
    :cols="cols"
    :rows="rows"
    class="textarea textarea-bordered"
    :class="[
      { 'textarea-xs': size === 'xs' },
      { 'textarea-sm': size === 'sm' },
      { 'textarea-md': size === 'md' },
      { 'textarea-lg': size === 'lg' },
      { 'textarea-error border-2': touched && !valid },
    ]"
    v-model="value"
    @focusout="touched = true"
  >
        <slot />
    </textarea
  >
</template>
