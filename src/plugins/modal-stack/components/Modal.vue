<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';

    const emits = defineEmits<{
        "hidden": [],
        "visible": []
    }>();

    const dialog = ref<HTMLDialogElement>();

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

    defineExpose({
        show,
        hide
    });

    onMounted(()=>{
        show();
    })
</script>

<template>
    <dialog ref="dialog" class="modal modal-top sm:modal-middle">
        <div class="modal-box overflow-visible">
            <slot :hideModal="hide" />
        </div>
    </dialog>
</template>
