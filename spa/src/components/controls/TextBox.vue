<script setup lang="ts">
import type { ControlVariants, HorizontalAlign } from "@/types";
import { ref } from "vue";
import { computed, watch } from "vue";
import { type ZodString } from "zod";

const props = defineProps<{
    name: string;
    type?: "text" | "password";
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    autocomplete?: string;

    size?: "xs" | "sm" | "md" | "lg";
    variant?: ControlVariants | "ghost";
    horizontalAlign?: HorizontalAlign,

    block?: boolean,

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
    <input
        :name="name"
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        class="input input-bordered transition-all ease-in"
        :class="[
                { 'input-xs': size === 'xs' },
                { 'input-sm': size === 'sm' },
                { 'input-md': size === 'md' },
                { 'input-lg': size === 'lg' },
                { 'input-error border-2': touched && !valid },
                {'input-neutral': variant === 'neutral'},
                {'input-primary': variant === 'primary'},
                {'input-secondary': variant === 'secondary'},
                {'input-accent': variant === 'accent'},
                {'input-info': variant === 'info'},
                {'input-success': variant === 'success'},
                {'input-warning': variant === 'warning'},
                {'input-error': variant === 'error'},
                {'input-ghost': variant === 'ghost'},
                {'w-full': block},
                {'text-left': horizontalAlign === 'left'},
                {'text-center': horizontalAlign === 'centre'},
                {'text-right': horizontalAlign === 'right'},
            ]"
        v-model="value"
        @focusout="touched = true"
    />
</template>
