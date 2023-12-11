<script setup lang="ts">
import type { NotificationType } from '@/types/notification-type';
import WarningIcon from '@/assets/icons/WarningIcon.vue';
  import SuccessIcon from '@/assets/icons/SuccessIcon.vue';
  import ErrorIcon from '@/assets/icons/ErrorIcon.vue';
  import InfoIcon from '@/assets/icons/InfoIcon.vue';

    defineProps<{
        type: NotificationType,
        show?: boolean,
        onDismiss?: (...args: any[]) => void
    }>();
</script>

<template>
    <div
      role="alert" 
      :class="[
        `alert transition-all shadow-2xl`, 
        { 'alert-info': type === 'info' },
        { 'alert-success': type === 'success' },
        { 'alert-warning': type === 'warning' },
        { 'alert-error': type === 'error' },
        { 'hidden': !show }
      ]"
    >
      <!-- alert icon -->
      <WarningIcon v-if="type === 'warning'" />
      <SuccessIcon v-else-if="type === 'success'" />
      <ErrorIcon v-else-if="type === 'error'" />
      <InfoIcon v-else />
      
      <p>
        <!-- alert title -->
        <span class="font-semibold" v-if="type === 'error'">
          Error!
        </span>
        <span class="font-semibold" v-else-if="type === 'warning'">
          Warning!
        </span>
        <span class="font-semibold" v-else-if="type === 'success'">
          Success!
        </span>
        <!-- alert message -->
        <slot />
      </p>
      <div class="flex w-full justify-end" v-if="onDismiss">
        <button class="btn btn-sm btn-ghost" @click="onDismiss">
          Dismiss
        </button>
      </div>
    </div>     
</template>