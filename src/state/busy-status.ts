import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useBusyStatus = defineStore("Busy Status", ()=>{
    const pendingActions = ref(0);
    const busy = computed(()=>pendingActions.value !== 0);

    function increment() {
        pendingActions.value++;
    }
    
    function decrement() {
        if (pendingActions.value > 0) {
            pendingActions.value--;
        } else {
            throw Error("Can not decrement.");
        }
    }
    
    return {
        busy,
        increment,
        decrement
    }
});
