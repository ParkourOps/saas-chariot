<script setup lang="ts">
import { watch } from "vue";
import { ref } from "vue";

defineOptions({
    inheritAttrs: false,
});

type Key = string;
type TabOption = {
    key: Key;
    label: string;
};

const props = defineProps<{
    options: TabOption[];
    tabClass?: string | string[];
    modelValue?: TabOption;
}>();

const emits = defineEmits<{
    "update:modelValue": [value: TabOption];
}>();

const selected = ref(props.modelValue ?? props.options[0]);

watch(
    selected,
    (value) => {
        emits("update:modelValue", value);
    },
    { immediate: true },
);
</script>

<template>
    <div role="tablist" class="tabs-boxed tabs">
        <a v-for="option in options" :key="option.key" role="tab" class="tab" :class="[tabClass, { 'tab-active': option.key === selected.key }]" @click="selected = option">
            {{ option.label }}
        </a>
    </div>
</template>
