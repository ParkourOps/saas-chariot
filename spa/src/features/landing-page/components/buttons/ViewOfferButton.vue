<script setup lang="ts">
import { watch, ref } from "vue";
import countdown from "../../libraries/offer-countdown"

defineProps<{
    hideCountdown?: boolean
}>();

let countdownString = ref<string>();

watch([countdown.daysRemaining, countdown.hoursRemaining, countdown.minutesRemaining, countdown.secondsRemaining], ([d, h, m, s])=>{
    let string = "";
    if (d) {
        string += `${d} days, `;
    }
    string += `${h} hours, `;
    string += `${m} mins, `;
    string += `${s} secs`;
    countdownString.value = string;
}, { immediate: true });

const analytics = useAnalytics();
</script>

<template>
    <div class="flex flex-col items-center my-8">
        <KeyboardButton
            class="font-bold"
            size="xl"
            background-colour="accent"
            foreground-colour="neutral"
            :action="[
                () => $router.push({name:'/', hash: '#offer', force: true}),
                () => analytics.trackEvent('view-offer-clicked')()
            ]"
        >
            <div class="flex items-center -mb-1 font-bold font-serif">
                <p class="whitespace-nowrap mr-6">View Offer</p>
                <SvgIcon name="diamond" class="h-12" />
            </div>
        </KeyboardButton>

        <div class="px-4" v-if="!hideCountdown">
            <p class="mx-auto max-w-prose text-center font-serif text-primary/60 text-base sm:text-lg mt-2">
                {{ countdownString }} remaining.
            </p>
        </div>
        
    </div>
</template>