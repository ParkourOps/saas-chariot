<script setup lang="ts" generic="T">
import { ref } from 'vue';
import { computed } from 'vue';

    const props = defineProps<{
        options: Array<T>,
        modelValue?: T,
        buttonClass?: string | Array<string>
    }>();

    const emits = defineEmits<{
        "update:modelValue": [value?: T]
    }>();

    const value = computed({
        get() {
            return props.modelValue;
        },
        set(value?: T) {
            emits("update:modelValue", value);
        }
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
    
        <summary class="mb-1 btn" :class="buttonClass">
            <slot v-if="!value" name="unselected">
            </slot>
            <slot v-else name="selected" :option="value">
            </slot>
        </summary>

        <ul class="dropdown-content z-[1] card card-compact rounded-t-none shadow bg-info w-full">
            <div class="border-b border-base-200">
                <slot name="filter"></slot>
            </div>
            <div class="max-h-[350px] overflow-y-auto">
                <li 
                    v-for="(o, idx) in options" :key="`option-n-${idx}`" 
                    @click.stop="selectOption(o)"
                    class="py-2 px-4 mx-2 my-1 first:mt-3 last:mb-3 hover:bg-neutral/40 rounded-xl cursor-pointer"
                >
                    <a>
                        <slot :option="o">
                        </slot>
                    </a>
                </li>
            </div>
        </ul>
    </details>
</template>