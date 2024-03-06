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
            <!-- Countdown -->
            <div class="alert alert-error mx-auto mb-6 flex max-w-prose flex-col pb-5 pt-6 shadow-md">
                <p class="max-w-[20rem] text-center font-bold">
                    Prices scheduled to increase on
                    {{ countdown.target.format("dddd Do of MMMM") }}.
                </p>
                <div class="text-red-800">
                    <p class="mb-2 text-center text-base font-bold sm:text-xl">Time till price update:</p>
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
                <div class="card-body mx-2 my-4 sm:mx-0 sm:my-4 gap-8 sm:gap-12">
                    <!-- items -->
                    <div v-for="(item, idx) in offer.items" :key="`offer#${idx}`" class="">
                        <div class="grid grid-cols-1">
                            <div class="flex flex-col items-center sm:items-end sm:flex-row sm:justify-between leading-none mb-1">
                                <!-- title -->
                                <p class="font-bold sm:text-lg text-center sm:text-left">{{ item.title }}</p>
                                <!-- alert -->
                                <p v-if="item.alert" class="font-bold text-red-800/80 max-w-fit sm:text-lg ml-2 w-full">{{ item.alert }}</p>
                            </div>
                            <div class="border-primary/50 border-b-2 sm:border-b-4 border-dotted my-1" />
                            <!-- features -->
                            <div class="leading-tight text-xs sm:text-sm">
                                <p v-for="feature in item.features"> → {{ feature }}</p>
                            </div>
                            <!-- price info -->
                            <div v-if="item.price && !Offer.priceIsZero(item.price)" class="text-red-800 leading-tight font-medium sm:text-lg/tight w-fit mt-2">
                                <p :class="[{'line-through opacity-80' : item.overridePrice && !Offer.priceIsZero(item.overridePrice)}, {'font-bold': !item.overridePrice || Offer.priceIsZero(item.overridePrice) || !offer.overridePrice}]">{{ offer.priceToString(item.price) }}</p>
                                <p :class="[{'line-through' : offer.overridePrice && !Offer.priceIsZero(offer.overridePrice)}, {'font-bold': !offer.overridePrice && Offer.priceIsZero(item.overridePrice)}]" v-if="item.overridePrice && !Offer.priceIsZero(item.overridePrice)">{{ offer.priceToString(item.overridePrice) }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- total -->
                    <div>
                        <div class="border-primary/50 border-b-4 sm:border-b-8 border-double mt-1 mb-4" />    
                        <p class="text-base sm:text-2xl font-bold text-right">{{ offer.priceStrings.final }}</p>
                    </div>

                </div>

            </div>
    </div>
</template>
