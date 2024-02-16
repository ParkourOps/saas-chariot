<script setup lang="ts">
import { computed, watch } from "vue";
import { ZodNumber } from "zod";

const props = defineProps<{
    placeholder?: string;
    centered?: boolean;
    size?: "xs" | "sm" | "md" | "lg";
    disabled?: boolean;
    modelValue?: number;
    schema?: ZodNumber;
    min?: number;
    max?: number;
    step?: number;
    pattern?: string;
}>();

const emits = defineEmits<{
    "update:modelValue": [value?: number];
    "update:valid": [value: boolean];
}>();

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value?: number) {
        emits("update:modelValue", value);
    },
});

const valid = computed(() => {
    if (!value.value) {
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

defineExpose({
    valid,
});
</script>

<template>
    <input
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :placeholder="placeholder"
        class="input input-bordered"
        :class="[{ 'text-center': centered }, { 'input-xs': size === 'xs' }, { 'input-sm': size === 'sm' }, { 'input-md': size === 'md' }, { 'input-lg': size === 'lg' }]"
        :disabled="disabled"
        v-model="value"
    />
</template>
