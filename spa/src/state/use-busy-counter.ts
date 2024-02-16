import { defineStore } from "pinia";
import { computed, ref } from "vue";

export default defineStore("Busy Counter", () => {
    const numPendingActions = ref(0);
    const isBusy = computed(() => numPendingActions.value !== 0);

    function increment() {
        numPendingActions.value++;
    }

    function decrement() {
        if (numPendingActions.value > 0) {
            numPendingActions.value--;
        } else {
            throw Error("Can not decrement.");
        }
    }

    return {
        isBusy,
        increment,
        decrement,
    };
});
