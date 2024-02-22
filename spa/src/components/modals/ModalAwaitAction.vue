<script setup lang="ts">
    import { onMounted } from "vue";
    import { useIndicators } from "@/state/indicators";

    const indicators = useIndicators();

    const props = defineProps<{
        title?: string;
        instruction: string;
        action?: (() => void | (()=>Promise<void>));
    }>();

    onMounted(async ()=>{
        if (!props.action) {
            return;
        }
        const token = indicators.registerPendingAction();
        await props.action;
        token.unregisterPendingAction();
    });
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
            <BusySpinner class="mx-auto mb-8 mt-14" colour="base-content/80" />
        </template>
    </Modal>
</template>
