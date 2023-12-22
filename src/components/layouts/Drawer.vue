<script setup lang="ts">
import { useOverlay } from '@/state/overlay';
import { watch } from 'vue';
import { computed } from 'vue';
    const props = defineProps<{
        modelValue?: boolean,
        position: "left" | "right",
        width: string
    }>();

    const emits = defineEmits<{
        'update:modelValue': [value?: boolean]
    }>();

    const show = computed({
        get() {
            return props.modelValue;
        },
        set(value?: boolean) {
            emits("update:modelValue", value);
        }
    });

    const overlay = useOverlay();
    watch(show, (val)=>{
        overlay.overlay = val;
    }, {immediate: true});
</script>

<template>
    
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <!-- <div class="fixed inset-0"></div>

        <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              
                </div>
            </div>
        </div> -->

        <Transition
                enter-active-class="ease-in-out duration-300 sm:duration-500"
                :enter-from-class="(position === 'left') ? 'translate-x-[-100%]' : 'translate-x-[100%]'"
                enter-to-class="translate-x-0"
                leave-active-class="ease-in-out duration-300 sm:duration-500"
                leave-from-class="translate-x-0"
                :leave-to-class="(position === 'left') ? 'translate-x-[-100%]' : 'translate-x-[100%]'"
            >
            <div 
                v-if="show" 
                class="fixed inset-y-0 z-50 shadow-2xl bg-neutral" 
                :class="[
                    {'left-0': position === 'left'},
                    {'right-0': position === 'right'}
                ]"
                aria-labelledby="slide-over-title" 
                role="dialog" 
                aria-modal="true"
            >
                <!-- close button -->
                <button 
                    class="btn btn-circle btn-outline btn-sm absolute top-0 mt-2"
                    :class="[
                        {'right-0': position === 'left'},
                        {'-mr-10': position === 'left'},
                        {'-ml-10': position === 'right'},
                        {'left-0': position === 'right'},
                    ]"
                    @click="show = false"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div :style="{width}">
                    <slot />
                </div>
            </div>
            </Transition>
    
            

</template>


<style lang="scss" scoped>

</style>

