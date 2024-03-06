<script setup lang="ts">
    defineProps<{
        price: string,
    }>();
</script>

<template>
    <div class="flex flex-col items-center my-8">
        <KeyboardButton
            class="font-bold"
            size="xl"
            background-colour="accent"
            foreground-colour="neutral"
            :action="()=>$showModal(() => import('../components/modals/ModalJoinWaitingList.vue'), {
                lockInPrice: price,
                leadMagnetResourceKey: 'xrbmvnmbqagf'
            })"
        >
            <div class="flex items-center -mb-1 font-bold">
                <p class="whitespace-nowrap mr-6">ACCESS NOW</p>
                <SvgIcon name="diamond" class="h-12" />
            </div>
        </KeyboardButton>

        <div class="px-4">
            <p class="mx-auto mt-2 max-w-prose text-center font-serif text-primary font-semibold text-lg/tight sm:text-xl/tight">One-time purchase of <span class="font-bold">{{ price }}</span></p>
            <p class="mx-auto max-w-prose text-center font-serif text-primary/60 text-base sm:text-lg/snug">(30-day money-back guarantee)</p>
        </div>
        
    </div>
</template>