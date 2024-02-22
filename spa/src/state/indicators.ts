import uniqueId from "@/_shared_/libraries/unique-id";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

type PendingAction = {
    id: string
}

export const useIndicators = defineStore("Indicators", () => {
    const _showOverlay = ref(false);
    function showOverlay() {
        _showOverlay.value = true;
    }
    function hideOverlay() {
        _showOverlay.value = false;
    }

    const pendingActions = ref<Array<PendingAction>>([]);
    function registerPendingAction() {
        const id = uniqueId.create();
        pendingActions.value.push({
            id,
        });
        return {
            unregisterPendingAction() {
                pendingActions.value = pendingActions.value.filter((a)=>a.id !== id);
            },
        };
    }

    const isBusy = computed(() => pendingActions.value.length > 0);
    const isOverlayVisible = computed(() => isBusy.value || _showOverlay.value);
    return {
        showOverlay,
        hideOverlay,
        registerPendingAction,
        isOverlayVisible,
        isBusy,
    };
});
