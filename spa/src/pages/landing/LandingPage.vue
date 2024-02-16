<script setup lang="ts">
import LogoSymbol from "@/assets/images/LogoSymbol.vue";

import valuePropCatalogue from "./data/value-props-catalogue";
import featuresCatalogue from "./data/features-catalogue";
import testimonials from "./data/testimonials";
import offer from "./data/offer";

import KeyboardButton from "@/components/inputs/KeyboardButton.vue";
import TieredCatalogue from "./components/TieredCatalogue.vue";
import SectionDivider from "./components/SectionDivider.vue";
import NumberedList from "./components/NumberedList.vue";
import Testimonials from "./components/Testimonials.vue";
import Offer from "./components/Offer.vue";
import ShoppingBagIcon from "./assets/icons/ShoppingBagIcon.vue";
import { useBilling } from "@/libraries/use-billing";
import getRouteUrl from "@/utilities/get-route-url";
import TypeScriptIcon from "./assets/icons/TypeScriptIcon.vue";
import { useModalStack } from "@/plugins/modal-stack";

const modalStack = useModalStack();
const billing = useBilling();

async function showWaitingListOffer() {
    modalStack.showModal(() => import("@/features/waiting-list-w-lead-magnet/components/modals/Offer.vue"), {});
}

async function checkout() {
    const result = await billing.getCheckoutUrl({
        cart: [
            {
                priceId: "price_1Od5g0LqesARZuQ5BOfoYKTu",
                quantity: 1,
            },
        ],
        successUrl: getRouteUrl({ name: "landingPage" }),
    });
    window.location.assign(result.checkoutUrl);
}
</script>

<template>
    <div class="flex flex-col items-center justify-center bg-primary px-4 py-14 font-serif sm:py-28">
        <div>
            <LogoSymbol class="mb-1 max-h-20 fill-base-100" />
            <p class="mb-4 text-center text-2xl font-black tracking-tighter text-base-100">SaaS Chariot</p>
        </div>
        <p class="smallcaps max-w-sm text-center text-2xl text-accent sm:max-w-screen-sm sm:text-4xl">Transform Ideas into Reality: Rapidly Build and Launch Digital Products and Services</p>

        <div class="mt-12 flex flex-col gap-6 sm:flex-row">
            <KeyboardButton variant="neutral">Learn More </KeyboardButton>
            <!-- <KeyboardButton>View Demo</KeyboardButton> -->
            <KeyboardButton>View Demo</KeyboardButton>
            <KeyboardButton variant="accent">Buy Now</KeyboardButton>
        </div>
    </div>

    <div class="bg-secondary py-14 sm:py-16">
        <div class="mx-auto max-w-3xl px-4 text-center text-neutral sm:px-6">
            <p class="mb-6 text-2xl font-bold sm:text-xl">Stop wasting time building products from the ground up.</p>

            <p class="mb-6 text-lg tracking-tighter sm:text-xl">
                SaaS Chariot is a comprehensive product development system that streamlines commercial web application development with a modular Vue template that implements cutting-edge industry best practices so you can focus on creating
                user value:
            </p>

            <ul class="mb-6 flex flex-col items-center gap-4 text-lg sm:text-xl">
                <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100">Ship features, fast.</li>
                <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100">Enhance user experience.</li>
                <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100">Galvanise brand perception.</li>
            </ul>
            <!-- <span class="bg-accent/80 p-1 text-base-100 font-medium"></span>,
                <span class="bg-accent/80 p-1 text-base-100 font-medium"></span>, and
                <span class="bg-accent/80 p-1 text-base-100 font-medium"></span>. -->

            <div class="mx-auto flex w-fit flex-col items-center rounded-lg border border-neutral/50 p-4 font-serif text-base font-bold sm:flex-row sm:p-3">
                <TypeScriptIcon class="mb-1 h-12 fill-neutral sm:mb-0 sm:mr-4" />
                <p class="max-w-sm text-center text-base sm:max-w-none sm:text-left">Designed for engineering teams with (elementary) knowledge of TypeScript.</p>
            </div>
        </div>
    </div>

    <div class="lg:py-18 mb-10 bg-neutral px-2 py-16 shadow-xl sm:px-10 sm:py-24 lg:mb-0" style="border-bottom-left-radius: calc(var(--rounded-box) * 1.5); border-bottom-right-radius: calc(var(--rounded-box) * 1.5)">
        <div class="mx-4 flex flex-col gap-10 fill-accent/70 text-center text-secondary lg:flex-row">
            <div v-for="(item, idx) in valuePropCatalogue" :key="`value-prop#${idx}`" class="mx-auto my-10 flex max-w-sm flex-col first:mt-0 last:mb-0 lg:my-0">
                <component :is="item.icon" class="mx-auto mb-4 h-auto w-32" />
                <h1 class="mb-2 font-serif text-xl font-semibold text-accent">
                    {{ item.title }}
                </h1>
                <div class="flex flex-grow flex-col items-center justify-center">
                    <p class="leading-tighter text-base font-medium tracking-tight">
                        {{ item.description }}
                    </p>
                </div>
                <KeyboardButton v-if="item.action" class="mx-auto mt-6 w-fit" size="sm">
                    {{ item.action.name }}
                </KeyboardButton>
            </div>
        </div>
    </div>

    <SectionDivider title="How It Works" />
    <NumberedList
        :items="[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a mattis lorem. Vestibulum ultricies massa in ex consectetur dictum. Donec et mauris eu nunc pellentesque convallis.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a mattis lorem. Vestibulum ultricies massa in ex consectetur dictum. Donec et mauris eu nunc pellentesque convallis.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a mattis lorem. Vestibulum ultricies massa in ex consectetur dictum. Donec et mauris eu nunc pellentesque convallis.',
        ]"
        class="sm:my-24"
    />

    <SectionDivider title="Syllabus" />
    <TieredCatalogue :catalogue="featuresCatalogue" />

    <SectionDivider title="What Users Say" />
    <Testimonials :testimonials="testimonials" />

    <SectionDivider title="In The Offer" />
    <Offer :offer="offer" class="mb-12" />

    <KeyboardButton class="mx-auto w-fit font-black" variant="accent" size="xl" @click="showWaitingListOffer">
        <div class="flex items-center">
            <p class="-mb-2 mr-2 whitespace-nowrap">ACCESS NOW</p>
            <ShoppingBagIcon fill="white" class="h-16 w-fit" />
        </div>
    </KeyboardButton>
    <p class="mx-auto mt-1 max-w-prose text-center font-serif text-sm font-medium text-accent">One-time purchase of {{ offer.currencySymbol }}{{ offer.total }}</p>
    <p class="mx-auto -mt-1 max-w-prose text-center font-serif text-sm font-medium text-accent">7-day money-back guarantee included.</p>
    <div class="h-12 sm:h-24" />
</template>

<style scoped>
.border-b-box-3 {
    border-radius: calc(var(--rounded-box) * 3);
}
</style>
