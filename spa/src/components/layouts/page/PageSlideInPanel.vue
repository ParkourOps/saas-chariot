<script setup lang="ts">
import { computed, watch } from "vue";
import { useIndicators } from "@/state/indicators";
import { useReactiveUserInterface } from "@/plugins/reactive-user-interface";

const props = defineProps<{
    modelValue?: boolean;
    position: "left" | "right";
    width: string; // must be in px, rem, vw; not %!
    notResponsive?: boolean,
}>();

const emits = defineEmits<{
    "update:modelValue": [value?: boolean];
}>();

const show = computed({
    get() {
        return props.modelValue;
    },
    set(value?: boolean) {
        emits("update:modelValue", value);
    },
});

const indicators = useIndicators();
watch(
    show,
    (val) => {
        if (val) {
            indicators.showOverlay();
        } else {
            indicators.hideOverlay();
        }
    },
    { immediate: true },
);

const ui = useReactiveUserInterface();
const panelWidth = computed(()=>{
    if (props.notResponsive) {
        return props.width;
    }
    if (ui.activeBreakpoint.value) {
        return props.width;
    } else {
        return "82vw";
    }
});
</script>

<template>
    <Transition
        enter-active-class="ease-in-out duration-300 sm:duration-500"
        :enter-from-class="position === 'left' ? 'translate-x-[-100%]' : 'translate-x-[100%]'"
        enter-to-class="translate-x-0"
        leave-active-class="ease-in-out duration-300 sm:duration-500"
        leave-from-class="translate-x-0"
        :leave-to-class="position === 'left' ? 'translate-x-[-100%]' : 'translate-x-[100%]'"
    >
        <div v-if="show" class="fixed inset-y-0 z-50 bg-base-100 shadow-2xl w-fit" :class="[{ 'left-0': position === 'left' }, { 'right-0': position === 'right' }]" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <!-- close button -->
            <div class="absolute top-0 mt-2" :class="[{ 'right-0': position === 'left' }, { '-mr-10': position === 'left' }, { '-ml-10': position === 'right' }, { 'left-0': position === 'right' }]">
                <Button
                    shape="circle"
                    size="sm"
                    :action="() => show = false"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Button>
            </div>
            <div :style="{ width: panelWidth }">
                <slot />
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped></style>
