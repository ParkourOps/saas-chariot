<script setup lang="ts">
    import { usePopupAlerts } from '../state/popup-alerts';
    import AlertLayout from './AlertLayout.vue';

    const popupAlerts = usePopupAlerts();
</script>

<template>
    <div class="fixed top-0 flex w-full flex-col gap-4 p-4 sm:gap-8 sm:p-8" v-if="popupAlerts.alerts.length > 0">
        <AlertLayout v-for="a in popupAlerts.alerts" :key="a.id" :type="a.type" @dismiss="() => popupAlerts.pop(a.id)" show>
            <span>{{ a.message }}</span>
        </AlertLayout>
    </div>
</template>
