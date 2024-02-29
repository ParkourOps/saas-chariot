<script setup lang="ts">
import LogoStamp from "@/assets/images/LogoStamp.vue";

import valuePropCatalogue from "../data/flat-catalogue-value-props";
// import syllabusCatalogue from "../data/tiered-catalogue-syllabus";
import featuresCatalogue from "../data/flat-catalogue-features";
import customerTestimonials from "../data/customer-testimonials";
import offerData from "../data/offer-data";

import TieredCatalogue from "../components/TieredCatalogue.vue";
import SectionDivider from "../components/SectionDivider.vue";
import NumberedList from "../components/NumberedList.vue";
import TestimonialsLayout from "../components/TestimonialsLayout.vue";
import OfferCountdown from "../components/OfferCountdown.vue";

import DiamondIcon from "../assets/icons/IconDiamond.vue";
import TypeScriptIcon from "../assets/icons/IconTypeScript.vue";

seo.allowIndex();
</script>

<template>
    <div class="flex flex-col items-center justify-center bg-primary px-4 py-14 font-serif sm:py-28">
        <LogoStamp class="mb-2" colour-class="fill-base-100 text-base-100" show-title/>
        <p class="smallcaps max-w-sm text-center text-2xl text-accent font-semibold sm:font-bold sm:max-w-screen-md sm:text-5xl">
            Transform Ideas into Reality: Rapidly Build and Launch Digital Products and Services
        </p>

        <div class="mt-12 flex flex-col gap-6 sm:flex-row">
            <KeyboardButton
                class="font-mono"
                background-colour-class="bg-neutral"
                text-background-colour-class="bg-secondary"
                @click="$router.push({name: '/', hash: '#how-it-works'})"
            >
                Learn More
            </KeyboardButton>
            <!-- <KeyboardButton>View Demo</KeyboardButton> -->
            <KeyboardButton
                class="font-mono"
                background-colour-class="bg-accent"
                text-background-colour-class="bg-neutral"
            >
                Buy Now
            </KeyboardButton>
        </div>
    </div>

    <div class="bg-secondary py-14 sm:py-16">
        <div class="mx-auto max-w-3xl px-4 text-neutral sm:px-6">

            <div
                class="mb-8 w-fit mx-auto fill-neutral text-neutral border-4 border-neutral/20 p-4 rounded-xl flex flex-col sm:grid sm:grid-cols-6 items-center"
            >
                <TypeScriptIcon class="h-10 mb-3 mt-1 sm:m-0" />
                <p class="text-center sm:text-left sm:col-span-5 leading-tight max-w-sm font-semibold">
                    Designed for individuals and teams with (elementary) knowledge of TypeScript.
                </p>
            </div>

            <p class="mb-6 text-2xl font-bold sm:text-xl text-center">
                Stop wasting time building products from the ground up.
            </p>

            <p class="mb-6 text-lg tracking-tighter sm:text-xl text-center">
                SaaS Chariot is a comprehensive product development system that streamlines
                the development of MVPs through a framework that implements cutting-edge industry best practices,
                so you can focus on creating exceptional value for your customers.
            </p>

            <ul class="mb-6 flex flex-col items-center gap-4 text-lg sm:text-xl text-center">
                <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100 shadow-sm">Ship features fast.</li>
                <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100 shadow-sm">Elevate user experience.</li>
                <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100 shadow-sm">Galvanise your brand.</li>
                <li class="w-fit bg-accent/80 px-6 py-4 text-2xl font-bold text-base-100 shadow-lg -rotate-2">Outsource the drudge.</li>
            </ul>
        </div>
    </div>

    <div class="lg:py-18 mb-10 bg-neutral px-2 py-16 shadow-xl sm:px-10 sm:py-24 lg:mb-0" style="border-bottom-left-radius: calc(var(--rounded-box) * 1.5); border-bottom-right-radius: calc(var(--rounded-box) * 1.5)">
        <div class="mx-4 flex flex-col gap-10 fill-accent/70 text-center text-secondary lg:flex-row">
            <div v-for="(item, idx) in valuePropCatalogue($router)" :key="`value-prop#${idx}`" class="mx-auto my-10 flex max-w-sm flex-col first:mt-0 last:mb-0 lg:my-0">
                <component :is="item.icon" class="mx-auto mb-4 h-auto w-32" />
                <h1 class="mb-2 font-serif text-xl font-semibold text-accent">
                    {{ item.title }}
                </h1>
                <div class="flex flex-grow flex-col items-center justify-center">
                    <p class="leading-tighter text-base font-medium tracking-tight">
                        {{ item.description }}
                    </p>
                </div>
                <KeyboardButton
                    v-if="item.action"
                    class="mx-auto mt-6 w-fit"
                    size="sm"
                    background-colour-class="bg-base-100"
                    text-background-colour-class="bg-secondary"
                    @click="item.action.function"
                >
                    {{ item.action.text }}
                </KeyboardButton>
            </div>
        </div>
    </div>

    <SectionDivider id="how-it-works" title="How It Works"/>
    <p class="text-xl sm:text-2xl text-center w-3/4 sm:max-w-prose mx-auto text-secondary sm:mt-24 font-semibold tracking-wide sm:tracking-wider">
        Implement your product or service in <span class="text-nowrap">9 simple steps:</span>
    </p>
    <NumberedList
        text-size="lg"
        :items="[
            `<mark>Initiate project codebase</mark> by cloning the template.`,
            '<mark>Create a configuration file</mark> with information about your company, the application, and necessary third-party accounts (e.g. billing and analytics).',
            '<mark>Bring your brand to life</mark> by defining colour scheme(s), visual properties, typefaces, icon sets, transitions, and more. Add brand assets such as photographs, videos, animations, and illustrations.',
            // '<mark>Implement static content layouts.</mark> Add functional tests to verify layout consistency.',
            '<mark>Model and implement business logic;</mark> add unit tests to verify logical consistency.',
            // '<mark>Implement content layouts and user workflows.</mark> Add functional tests to verify layout consistency.',
            '<mark>Build user workflows and content layouts</mark> by leveraging common application elements such as modals, pop-up alerts, notifications, transactional emails, action links, and more. Define functional tests and end-to-end tests to corroborate requirements.',
            '<mark>Optimise project for SEO</mark> using built-in library; Make sure to <mark>check audit report</mark> for issues and possible improvements.',
            `<mark>Deploy to staging environment.</mark> Execute manual and automated test suites.`,
            `<mark>Approve for release</mark> to production environment.`,
            `Repeat as necessary from step 3 or beyond.`
        ]"
        class="mt-12 sm:my-24"
    />


    <!--
    <SectionDivider id="syllabus" title="Syllabus" />
    <TieredCatalogue :catalogue="syllabusCatalogue" />
    -->


    <SectionDivider id="features" title="Features" />
    <div class="max-w-screen-xl mx-auto">
        <TieredCatalogue :catalogue="featuresCatalogue" />
    </div>
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto w-fit gap-6 px-2">
        <CatalogueItemCard v-for="feature in featuresCatalogue" :item="feature" />
    </div> -->


    <SectionDivider id="what-users-say" title="What Users Say" />
    <TestimonialsLayout :testimonials="customerTestimonials" />

    <SectionDivider title="In The Offer" />
    <OfferCountdown :offer="offerData" class="mb-12" />

    <KeyboardButton
        class="mx-auto"
        size="xl"
        background-colour-class="bg-accent"
        text-background-colour-class="bg-neutral"
        @click="$showModal(() => import('../components/modals/ModalJoinWaitingList.vue'), {})"
    >
        <div class="flex items-center ">
            <p class="whitespace-nowrap mr-6 -mb-1">ACCESS NOW</p>
            <DiamondIcon class="h-12 -mb-1 fill-[#ECE6DF]" />
        </div>
    </KeyboardButton>

    <p class="mx-auto mt-1 max-w-prose text-center font-serif text-primary font-semibold">One-time purchase of <span class="font-bold">{{ offerData.currencySymbol }}{{ offerData.total.final }}</span></p>
    <p class="mx-auto -mt-1 max-w-prose text-center font-serif text-sm text-primary/80 font-medium">30-day money-back guarantee.</p>

    <div class="h-12 sm:h-24" />
    <img src="../assets/images/money-back-guarantee-large.webp" alt="30-day money-back guarantee." class="h-28 mx-auto"/>
</template>

<style scoped>
.border-b-box-3 {
    border-radius: calc(var(--rounded-box) * 3);
}
</style>
