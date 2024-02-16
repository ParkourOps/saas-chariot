<script setup lang="ts">
import { onMounted } from "vue";
import Offer from "../types/offer";
import { ref } from "vue";
import { readableDate, getNextDayOfWeek } from "@/utilities/date-time";
import configs from "@/configs";

defineProps<{
    offer: Offer;
}>();

const nextFriday = getNextDayOfWeek("Friday", configs.contact.timeZone).toDate();

const hoursRemaining = ref(0);
const minutesRemaining = ref(0);
const secondsRemaining = ref(0);

onMounted(() => {
    setInterval(() => {
        // Get the current date and time
        const currentTime = new Date().getTime();

        // Calculate the remaining time in milliseconds
        const timeRemaining = nextFriday.getTime() - currentTime;

        if (timeRemaining <= 0) {
            hoursRemaining.value = 0;
            minutesRemaining.value = 0;
            secondsRemaining.value = 0;
        } else {
            // Calculate days, hours, minutes, and seconds
            const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            hoursRemaining.value = daysRemaining * 24 + Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutesRemaining.value = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            secondsRemaining.value = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        }
    }, 1000);
});
</script>

<template>
    <div class="mx-2">
        <div>
            <div class="alert alert-error mx-auto mb-6 flex max-w-prose flex-col pb-5 pt-6 shadow-md">
                <p class="max-w-[20rem] text-center font-bold leading-tight tracking-tight">
                    Prices scheduled to increase on
                    {{ readableDate(nextFriday, "UTC", "dddd Do MMMM") }}.
                </p>
                <div class="text-red-800">
                    <p class="mb-2 text-center text-base font-bold tracking-wide sm:text-xl">Time till price update:</p>
                    <div class="flex justify-center gap-3 text-center sm:gap-4">
                        <div class="flex-col">
                            <p class="text-xl font-bold">{{ hoursRemaining }}</p>
                            <p class="font-medium">Hours</p>
                        </div>
                        <div class="flex-col">
                            <span class="text-xl font-bold">{{ minutesRemaining }}</span>
                            <p class="font-medium">Minutes</p>
                        </div>
                        <div class="flex-col">
                            <span class="text-xl font-bold">{{ secondsRemaining }}</span>
                            <p class="font-medium">Seconds</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card card-compact mx-auto mb-6 max-w-prose bg-neutral text-primary shadow-md sm:card-normal sm:p-4">
                <div class="card-body mx-2 my-4 gap-8 sm:mx-0 sm:my-4 sm:gap-12">
                    <div v-for="(item, idx) in offer.items" :key="`offer#${idx}`" class="">
                        <div>
                            <div class="flex flex-col items-baseline text-lg sm:flex-row sm:text-base">
                                <!-- product title -->
                                <p class="mb-1.5 min-w-fit font-black leading-tight tracking-tight sm:mb-0">
                                    {{ item.title }}
                                </p>

                                <!-- dotted line -->
                                <div class="w-full border-b-2 border-dotted border-primary/40 sm:mx-2 sm:border-b-4" />

                                <!-- item price -->
                                <p
                                    class="font-medium"
                                    :class="[
                                        {
                                            'text-red-600': item.newPrice || item.highlight === 'limitedTime',
                                        },
                                    ]"
                                >
                                    <span :class="[{ 'line-through': item.newPrice }]">{{ offer.currencySymbol }}{{ item.price }}</span>
                                    <span class="ml-1 font-black"
                                        ><span v-if="typeof item.newPrice === 'number'">{{ offer.currencySymbol }}</span
                                        >{{ item.newPrice }}</span
                                    >
                                </p>
                            </div>

                            <div class="flex flex-col sm:flex-row">
                                <div class="order-2 sm:order-1">
                                    <div v-for="(sub, idx) of item.subtitles" :key="`idx#${idx}`" class="mb-2 mr-2 flex items-baseline sm:mb-0">
                                        <p class="mr-2 max-w-fit whitespace-nowrap">—></p>
                                        <p class="text-sm tracking-tighter sm:max-w-72">
                                            {{ sub }}
                                        </p>
                                    </div>
                                </div>

                                <p v-if="item.highlight === 'limitedTime'" class="order-1 -mt-2 mb-1 h-full max-w-fit whitespace-nowrap font-black text-red-800 sm:order-2 sm:mb-0 sm:ml-auto">*** ENDS SOON ***</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mx-5 mb-5">
                    <div class="sm:border-b-6 border-b-4 border-double border-primary/40" />
                    <p class="mt-1 text-center text-2xl font-semibold sm:text-right">{{ offer.currencySymbol }}{{ offer.total }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
