<script setup lang="ts">

import Offer from "../types/offer";
import createCountdownToNextDateByDayOfWeek from "../utilities/create-countdown-to-next-date-by-day-of-week";
import configs from "@/configs";
import { onMounted } from "vue";

defineProps<{
    offer: Offer;
}>();

// initialise and start the countdown
const countdown = createCountdownToNextDateByDayOfWeek("Friday", configs.contact.timeZone);
onMounted(()=>{
    countdown.begin();
});
</script>

<template>
    <div class="mx-2">
        <div>
            <div class="alert alert-error mx-auto mb-6 flex max-w-prose flex-col pb-5 pt-6 shadow-md">
                <p class="max-w-[20rem] text-center font-bold leading-tight tracking-tight">
                    Prices scheduled to increase on
                    {{ countdown.target.format("dddd Do of MMMM") }}.
                </p>
                <div class="text-red-800">
                    <p class="mb-2 text-center text-base font-bold tracking-wide sm:text-xl">Time till price update:</p>
                    <div class="flex justify-center gap-3 text-center sm:gap-4">
                        <div class="flex-col">
                            <p class="text-xl font-bold">{{ countdown.daysRemaining }}</p>
                            <p class="font-medium">Days</p>
                        </div>
                        <div class="flex-col">
                            <p class="text-xl font-bold">{{ countdown.hoursRemaining }}</p>
                            <p class="font-medium">Hours</p>
                        </div>
                        <div class="flex-col">
                            <span class="text-xl font-bold">{{ countdown.minutesRemaining }}</span>
                            <p class="font-medium">Minutes</p>
                        </div>
                        <div class="flex-col">
                            <span class="text-xl font-bold">{{ countdown.secondsRemaining }}</span>
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
                                    <span :class="[{ 'line-through': item.newPrice }]">
                                        {{ item.price !== 'FREE' ? offer.currencySymbol : '' }}{{ item.price }}
                                    </span>
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
                    <p class="text-center text-2xl sm:text-right mt-4">
                        <span class="text-red-600 line-through font-semibold mr-2" v-if="offer.total.original !== offer.total.final">{{ offer.currencySymbol }}{{ offer.total.original }}</span>
                        <span class="font-semibold">{{ offer.currencySymbol }}{{ offer.total.final }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
