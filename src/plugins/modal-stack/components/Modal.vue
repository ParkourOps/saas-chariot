<script setup lang="ts">
import { computed } from 'vue';
import makeUUID from '@/utilities/makeUUID';
import { watch } from 'vue';
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
    <dialog ref="dialog" class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <slot :hideModal="hide" />
        </div>
    </dialog>
</template>

<!-- <h3 class="font-bold text-lg">Hello!</h3>
<p class="py-4">Click the button below to close</p>
<div class="modal-action">
<form method="dialog">
    
    <button class="btn" @click="hide">Close</button>
</form>
</div> -->