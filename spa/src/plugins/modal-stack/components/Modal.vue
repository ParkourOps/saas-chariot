<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts" generic="T">
import type { ScreenSize } from "@/types";
import { onMounted, ref } from "vue";

defineOptions({
    inheritAttrs: false
});

defineProps<{
    size?: ScreenSize
}>();

const emits = defineEmits<{
    done: [value?: T];
    hidden: [];
    visible: [];
}>();

const dialog = ref<HTMLDialogElement>();

const returnValue = ref<T>();

function conclude() {
    emits("done", returnValue.value);
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

function setReturnValue(value?: T) {
    returnValue.value = value;
    hide(); // will trigger close event on the dialog.
}

onMounted(() => {
    show();
});
</script>

<template>
    <dialog ref="dialog" class="modal modal-top sm:modal-middle overflow-y-scroll" @close="conclude">
        <div class="modal-box max-h-none mb-4 sm:my-4 overflow-visible"
        :class="[
            $attrs.class,
            {'sm:max-w-screen-sm': size === 'sm'},
            {'sm:max-w-screen-md': size === 'md'},
            {'sm:max-w-screen-lg': size === 'lg'},
            {'sm:max-w-screen-xl': size === 'xl'},
            {'sm:max-w-screen-2xl': size === '2xl'},
        ]"
    >
                <slot :done="setReturnValue" />
        </div>
    </dialog>
</template>

<style>
    .modal:not(dialog:not(.modal-open)),
    .modal::backdrop {
        background-color: transparent;
    }
</style>
