<script setup lang="ts">
import type { NotificationType } from "@/types";
import InfoIcon from "../assets/icons/IconInfo.vue";
import SuccessIcon from "../assets/icons/IconSuccess.vue";
import WarningIcon from "../assets/icons/IconWarning.vue";
import ErrorIcon from "../assets/icons/IconError.vue";

defineProps<{
    type?: NotificationType;
    show?: boolean;
    dismissable?: boolean
}>();

const emits = defineEmits<{
    dismiss: [];
}>();
</script>

<template>
    <div
        role="alert"
        :class="[
            `alert transition-all`,
            { 'alert-info': type === 'info' },
            { 'alert-success': type === 'success' },
            { 'alert-warning': type === 'warning' },
            { 'alert-error': type === 'error' },
            {
                'bg-base-100': type && !['info', 'success', 'warning', 'error'].includes(type),
            },
            { hidden: !show },
        ]"
    >
        <!-- alert icon -->
        <WarningIcon v-if="type === 'warning'" />
        <SuccessIcon v-else-if="type === 'success'" />
        <ErrorIcon v-else-if="type === 'error'" />
        <InfoIcon v-else />

        <div>
            <!-- alert title -->
            <p class="font-semibold block sm:inline-block sm:mr-2" v-if="type === 'error'"> Error! </p>
            <p class="font-semibold block sm:inline-block sm:mr-2" v-else-if="type === 'warning'"> Warning! </p>
            <p class="font-semibold block sm:inline-block sm:mr-2" v-else-if="type === 'success'"> Success! </p>
            <!-- alert message -->
            <slot />
        </div>
        <div class="flex w-full justify-center sm:justify-end" v-if="dismissable">
            <Button size="sm" variant="ghost" block :action="()=>emits('dismiss')">DISMISS</Button>
        </div>
    </div>
</template>
