import { defineStore } from "pinia";
import { ref } from "vue";

export const useOverlay = defineStore("overlay", ()=>{
    const overlay = ref(false);
    
    return {
        overlay
    }
});