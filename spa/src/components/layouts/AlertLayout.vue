<script setup lang="ts">
import InfoIcon from "@/assets/icons/IconInfo.vue";
import SuccessIcon from "@/assets/icons/IconSuccess.vue";
import WarningIcon from "@/assets/icons/IconWarning.vue";
import ErrorIcon from "@/assets/icons/IconError.vue";
import type { NotificationType } from "@/types/notification-type";

defineProps<{
  type: NotificationType;
  show?: boolean;
}>();

const emits = defineEmits<{
  dismiss: [];
}>();
</script>

<template>
  <div
    role="alert"
    :class="[
      `alert shadow-2xl transition-all`,
      { 'alert-info': type === 'info' },
      { 'alert-success': type === 'success' },
      { 'alert-warning': type === 'warning' },
      { 'alert-error': type === 'error' },
      {
        'bg-base-100':
          type && !['info', 'success', 'warning', 'error'].includes(type),
      },
      { hidden: !show },
    ]"
  >
    <!-- alert icon -->
    <WarningIcon v-if="type === 'warning'" />
    <SuccessIcon v-else-if="type === 'success'" />
    <ErrorIcon v-else-if="type === 'error'" />
    <InfoIcon v-else />

    <p>
      <!-- alert title -->
      <span class="font-semibold" v-if="type === 'error'"> Error! </span>
      <span class="font-semibold" v-else-if="type === 'warning'">
        Warning!
      </span>
      <span class="font-semibold" v-else-if="type === 'success'">
        Success!
      </span>
      <!-- alert message -->
      <slot />
    </p>
    <div class="flex w-full justify-center sm:justify-end" v-if="onDismiss">
      <button class="btn btn-ghost" @click="emits('dismiss')">Dismiss</button>
    </div>
  </div>
</template>
