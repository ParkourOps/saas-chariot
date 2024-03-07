<script setup lang="ts">
    import featuresCatalogue from "../data/tiered-catalogue-features";
    import offer from "../data/offer";

    import TieredCatalogue from "../components/TieredCatalogue.vue";
    import NumberedList from "../components/NumberedList.vue";
    import TestimonialsLayout from "../components/TestimonialsLayout.vue";
    import OfferCountdown from "../components/OfferCountdown.vue";

    import LogoStamp from "@/assets/images/LogoStamp.vue";
    import ViewOfferButton from "../components/buttons/ViewOfferButton.vue";
    import { useReactiveUserInterface } from "@/plugins/reactive-user-interface";

    const ui = useReactiveUserInterface();
    seo.allowIndex();
</script>

<template>

<div class="bg-secondary py-14 sm:py-16 shadow-xl" style="border-bottom-left-radius: calc(var(--rounded-box) * 1.5); border-bottom-right-radius: calc(var(--rounded-box) * 1.5)" >
    <div class="mx-auto max-w-3xl px-4 text-neutral sm:px-6">
        
        <LogoStamp show-title dark hide-subtitle/>

        <div
            class="mt-8 sm:mt-1 mb-8 w-fit mx-auto fill-neutral text-neutral border-4 border-neutral/20 p-4 rounded-xl flex flex-col sm:grid sm:grid-cols-6 items-center"
        >
            <SvgIcon name="typescript" class="w-auto h-12 mb-2 sm:mb-0 mx-auto" />
            <p class="text-center sm:text-left sm:col-span-5 max-w-sm font-semibold leading-snug">
                Designed for individuals and teams with basic working knowledge of TypeScript.
            </p>
        </div>

        <p class="mb-6 text-2xl font-bold sm:text-xl text-center leading-tight">
            Stop wasting time building products from the ground up.
        </p>

        <p class="mb-6 text-lg sm:text-xl text-center">
            SaaS Chariot is a comprehensive product development system for TypeScript programmers that streamlines
            the development of MVPs using a framework that implements cutting-edge industry best practices,
            so you can focus on creating exceptional value for your customers.
        </p>

        <div class="mt-12 flex flex-col gap-8 sm:flex-row mx-auto w-fit">
            <KeyboardButton
                background-colour="neutral"
                foreground-colour="secondary"
                :action="() => $router.push({name: '/', force: true})"
            >
                <div class="flex justify-center items-center">
                    <span class="font-black font-mono mr-3">Home</span>
                    <SvgIcon name="home" class="h-8 inline" />
                </div>
            </KeyboardButton>
            <KeyboardButton
                background-colour="accent"
                foreground-colour="neutral"
                :action="() => $router.push({name: '/', hash: '#offer', force: true})"
            >
                <span class="font-black font-mono mr-3">View Offer</span>
                <SvgIcon name="diamond" class="h-8 inline" />
            </KeyboardButton>
        </div>
        
        <!-- <ul class="mb-6 flex flex-col items-center gap-4 text-lg sm:text-xl text-center">
            <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100 shadow-sm">Ship features fast.</li>
            <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100 shadow-sm">Elevate user experience.</li>
            <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100 shadow-sm">Galvanise your brand.</li>
            <li class="w-fit bg-accent/80 px-6 py-4 text-2xl font-bold text-base-100 shadow-lg -rotate-2">Outsource the drudge.</li>
        </ul> -->
    </div>
</div>

    <PageDivider title="List of Features" id="list-of-features" />
    
    <PagePaddedWrapper class="pt-0 sm:pt-0">
        <div class="flex justify-center items-center bg-accent shadow-xl text-base-100 p-6 rounded-btn text-center font-semibold text-xl max-w-screen-sm mx-auto mb-14">
            <p class="mx-4">👇</p>
            <!-- <p class="leading-tight">Here's how SaaS Chariot accelerates your <span class="whitespace-nowrap">time to market</span>, <span class="whitespace-nowrap">reduces engineering risk</span>, <span class="whitespace-nowrap">and <mark class="p-0.5">↑↑↑ your margins</mark></span>.</p> -->
            <p class="leading-tight">Here's how <span class="whitespace-nowrap">SaaS Chariot</span> accelerates your time to market, reduces engineering risk, and <mark class="p-0.5 whitespace-nowrap">↑↑↑ your margins</mark>.</p>
            <p class="mx-4">👇</p>
        </div>

        <div class="max-w-screen-lg mx-auto">
            <TieredCatalogue :catalogue="featuresCatalogue" :expanded="!ui.activeBreakpoint.value">
                <template #tier-footer>
                    <ViewOfferButton class="mt-16" />
                </template>
            </TieredCatalogue>
        </div>
    </PagePaddedWrapper>
    <!-- <PageEndSpacer /> -->
</template>

