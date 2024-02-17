import uniqueId from "@/_shared_/libraries/unique-id";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

type PendingAction = {
    id: string
}

export const useIndicators = defineStore("Indicators", () => {
    const _forceOverlay = ref(false);
    function forceOverlay() {
        _forceOverlay.value = true;
    }
    function unforceOverlay() {
        _forceOverlay.value = false;
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
            }
        }
    }

    const isBusy = computed(() => pendingActions.value.length > 0);
    const showOverlay = computed(() => isBusy.value || _forceOverlay.value);
    return {
        forceOverlay,
        unforceOverlay,
        registerPendingAction,
        showOverlay,
        isBusy,
    };
});
