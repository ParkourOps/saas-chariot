import { defineStore } from "pinia";
import { ref } from "vue";

export const useOverlay = defineStore("Overlay", () => {
    const showOverlay = ref(false);

    return {
        showOverlay,
    };
});
