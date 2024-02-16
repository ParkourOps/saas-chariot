<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps<{
    title?: string;
    instruction: string;
    mountAction?: () => void;
}>();

onMounted(props.mountAction ? props.mountAction : () => {});
</script>

<template>
    <Modal>
        <template #default="{}">
            <p v-if="title" class="mb-4 text-center text-xl font-semibold text-primary">
                {{ title }}
            </p>
            <p class="text-center text-base-content/80" :class="[{ 'mt-2': !title }]">
                {{ instruction }}
            </p>
            <BusySpinner class="mx-auto mb-8 mt-14" />
        </template>
    </Modal>
</template>
