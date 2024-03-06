<script setup lang="ts" generic="T">
import type { ClassList } from "@/types";
import { ref, computed } from "vue";

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<{
    options: T[];
    modelValue?: T;
    buttonClass?: ClassList;
}>();

const emits = defineEmits<{
    "update:modelValue": [value?: T];
}>();

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value?: T) {
        emits("update:modelValue", value);
    },
});

const dropdown = ref<HTMLDetailsElement>();

function collapse() {
    dropdown.value?.removeAttribute("open");
}

function selectOption(option: T) {
    value.value = option;
    collapse();
}
</script>

<template>
    <details class="dropdown" ref="dropdown">
        <summary class="btn mb-1" :class="buttonClass">
            <slot v-if="!value" name="unselected"> </slot>
            <slot v-else name="selected" :option="value"> </slot>
        </summary>

        <ul class="card dropdown-content card-compact z-[1] w-full rounded-t-none bg-accent/95 shadow">
            <div class="border-b border-base-200">
                <slot name="filter"></slot>
            </div>
            <div class="max-h-[350px] overflow-y-auto">
                <li v-for="(o, idx) in options" :key="`option-n-${idx}`" @click.stop="selectOption(o)" class="mx-2 my-1 cursor-pointer rounded-xl px-4 py-2 first:mt-3 last:mb-3 hover:bg-neutral/30">
                    <a>
                        <slot :option="o"> </slot>
                    </a>
                </li>
            </div>
        </ul>
    </details>
</template>
