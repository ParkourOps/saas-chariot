<script setup lang="ts" generic="ReturnType">
import { onMounted } from 'vue';
import { ref } from 'vue';

    const emits = defineEmits<{
        "done": [value?: ReturnType],
        "hidden": [],
        "visible": []        
    }>();

    const dialog = ref<HTMLDialogElement>();

    function done(value?: ReturnType) {
        emits("done", value);
        hide();
    }

    function show() {
        if (dialog.value) {
            dialog.value.showModal();
            emits("visible");
        }
    }

    function hide() {
        if (dialog.value) {
            dialog.value.close();
            emits("hidden");
        }
    }

    onMounted(()=>{
        show();
    })
</script>

<template>
        <dialog ref="dialog" class="modal modal-top sm:modal-middle">
            <div class="modal-box overflow-visible">
                <slot :done="done" />
            </div>
        </dialog>
</template>