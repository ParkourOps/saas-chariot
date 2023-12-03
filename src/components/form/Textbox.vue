<script setup lang="ts">
    import { computed, watch } from 'vue';
    import { type ZodString } from "zod";

    const props = defineProps<{
        placeholder?: string,
        centered?: boolean,
        disabled?: boolean,
        modelValue?: string,
        schema?: ZodString,
        type?: "text" | "password"
    }>();

    const emits = defineEmits<{
        "update:modelValue": [value?: string],
        "update:valid": [value: boolean]
    }>();

    const value = computed({
        get() {
            return props.modelValue;
        },
        set(value?: string) {
            emits("update:modelValue", value);
        }
    });

    const valid = computed(()=>{
        if (!value.value || value.value.length < 1) {
            return false;
        }
        else if (!props.schema) {
            return true;
        } else {
            const parseResult = props.schema.safeParse(value.value) 
            return parseResult.success;
        }
    });

    watch(valid, (val)=>{
        emits("update:valid", val);
    }, {immediate: true})

    defineExpose({
        valid
    });
</script>

<template>
    <input 
        :type="type ?? 'text'" 
        :placeholder="placeholder" 
        class="input input-bordered" 
        :class="[{'text-center': centered}]" 
        :disabled="disabled"
        v-model="value"
    />
</template>
