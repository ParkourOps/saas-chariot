<script setup lang="ts">
import LogoStamp from "@/assets/images/LogoStamp.vue";

import valuePropCatalogue from "../data/flat-catalogue-value-props";
// import syllabusCatalogue from "../data/tiered-catalogue-syllabus";
import featuresCatalogue from "../data/tiered-catalogue-features";
import foundersMessage from "../data/founders-message";
import offer from "../data/offer";

import TieredCatalogue from "../components/TieredCatalogue.vue";
import NumberedList from "../components/NumberedList.vue";
import TestimonialsLayout from "../components/TestimonialsLayout.vue";
import OfferCountdown from "../components/OfferCountdown.vue";

import CallToActionButton from "../components/CallToActionButton.vue";

const finalPrice = offer.priceStrings.final;

seo.allowIndex();
</script>

<template>
    <div class="flex flex-col items-center justify-center bg-primary px-4 py-14 font-serif sm:py-28">

        <!-- Logo and Subtitle -->
        <LogoStamp class="mb-2" colour-class="fill-base-100 text-base-100" show-title dark hide-subtitle/>
        <div class="text-center text-accent text-xl max-w-80 sm:max-w-xl sm:text-4xl font-bold">
            <p class="whitespace-nowrap smallcaps w-fit mx-auto mb-2 sm:mb-4">
                <span class=" border-b-accent border-b sm:border-b-2">Transform Ideas into Reality</span>
            </p>
            <p class="">Rapidly Build and Launch Digital Products and Services</p>
        </div>
        <div class="max-w-sm text-center text-accent sm:max-w-screen-md text-2xl sm:text-5xl">
            <p class="whitespace-nowrap text-xl sm:text-4xl smallcaps"></p>
            
        </div>

        <div class="mt-12 flex flex-col gap-6 sm:flex-row">
            <KeyboardButton
                background-colour="neutral"
                foreground-colour="secondary"
                :action="() => $router.push({name: '/', hash: '#how-it-works', force: true})"
            >
                <span class="font-black font-mono">Learn More</span>
            </KeyboardButton>

            <KeyboardButton
                background-colour="accent"
                foreground-colour="neutral"
                :action="() => $router.push({name: '/', hash: '#the-offer', force: true})"
            >
                <span class="font-black font-mono mr-4">Access Now</span>
                <SvgIcon name="diamond" class="h-8 inline" />
            </KeyboardButton>
        </div>
    </div>

    <div class="bg-secondary py-14 sm:py-16">
        <div class="mx-auto max-w-3xl px-4 text-neutral sm:px-6">

            <div
                class="mb-8 w-fit mx-auto fill-neutral text-neutral border-4 border-neutral/20 p-4 rounded-xl flex flex-col sm:grid sm:grid-cols-6 items-center"
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

            <ul class="mb-6 flex flex-col items-center gap-4 text-lg sm:text-xl text-center">
                <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100 shadow-sm">Ship features fast.</li>
                <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100 shadow-sm">Elevate user experience.</li>
                <li class="w-fit bg-accent/80 px-3 py-2 font-medium text-base-100 shadow-sm">Galvanise your brand.</li>
                <li class="w-fit bg-accent/80 px-6 py-4 text-2xl font-bold text-base-100 shadow-lg -rotate-2">Outsource the drudge.</li>
            </ul>
        </div>
    </div>

    <div class="mb-10 bg-neutral px-2 py-20 shadow-xl sm:px-10 sm:py-24 lg:mb-0" style="border-bottom-left-radius: calc(var(--rounded-box) * 1.5); border-bottom-right-radius: calc(var(--rounded-box) * 1.5)">
        <div class="mx-4 flex flex-col gap-10 fill-accent/70 text-center text-secondary lg:flex-row">
            <div v-for="(item, idx) in valuePropCatalogue($router)" :key="`value-prop#${idx}`" class="flex text-center flex-col first:mt-0 last:mb-0 my-6 lg:my-0 max-w-lg mx-auto">
                <SvgIcon v-if="item.icon" :name="item.icon" class="mx-auto mb-4 h-auto w-32"/>
                <p class="mb-2 font-serif text-xl font-semibold text-accent text-center">
                    {{ item.title }}
                </p>
                <div class="flex flex-grow flex-col items-center justify-center">
                    <p class="text-base font-medium">
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

    <PageDivider id="how-it-works" title="How It Works"/>
    <div class="px-2">
        <div class="flex justify-center items-center bg-primary text-base-100 p-4 rounded-btn text-center font-semibold text-xl w-fit mx-auto">
            <p class="mx-4">👇</p>
            <p class="leading-tight">Build a product or service in <span class="whitespace-nowrap">9 simple steps!</span></p>
            <p class="mx-4">👇</p>
        </div>
    </div>

    <NumberedList
        class="mt-12 mb-12"
        text-size="lg"
        :items="[
            `<mark>Initiate project codebase</mark> by cloning the template.`,
            '<mark>Create a configuration file</mark> with information about your company, the application, and necessary third-party accounts (e.g. billing and analytics).',
            '<mark>Bring your brand to life</mark> by defining colour scheme(s), visual properties, typefaces, icon sets, transitions, and more. Add brand assets such as photographs, videos, animations, and illustrations.',
            // '<mark>Implement static content layouts.</mark> Add functional tests to verify layout consistency.',
            '<mark>Model and implement business logic;</mark> add unit tests to verify logical consistency.',
            // '<mark>Implement content layouts and user workflows.</mark> Add functional tests to verify layout consistency.',
            '<mark>Build user workflows and content layouts</mark> by leveraging common application elements such as modals, pop-up alerts, notifications, transactional emails, action links, and more. Define functional tests and end-to-end tests to corroborate requirements.',
            '<mark>Optimise application for search engine indexing, crawling, and social media sharing</mark> using the built-in SEO library.',
            '<mark>Check auto-generated audit report</mark> for issues and possible improvements.',
            `<mark>Deploy to staging environment.</mark> Execute manual and automated test suites.`,
            `<mark>Approve for release</mark> to production environment.`,
            `Repeat as necessary from step 3 or beyond.`
        ]"
    />
    <CallToActionButton :price="finalPrice" class="sm:mb-24" />

    <!--
    <SectionDivider id="syllabus" title="Syllabus" />
    <TieredCatalogue :catalogue="syllabusCatalogue" />
    -->

    <PageDivider id="features" title="Features" />
    <div class="max-w-screen-xl mx-auto">
        <TieredCatalogue :catalogue="featuresCatalogue">
            <template #tier-footer>
                <CallToActionButton :price="finalPrice" />
            </template>
        </TieredCatalogue>
    </div>

    <PageDivider id="founders-message" title="Founder's Message" />
    <TestimonialsLayout :testimonials="foundersMessage" />

    <PageDivider id="the-offer" title="The Offer" />
    <OfferCountdown :offer="offer" class="mb-12" />

    <CallToActionButton :price="finalPrice" />

    <div class="h-12 sm:h-24" />
    <!-- <img src="../assets/images/money-back-guarantee-large.webp" alt="30-day money-back guarantee." class="mx-auto" /> -->
</template>

<style scoped>
.border-b-box-3 {
    border-radius: calc(var(--rounded-box) * 3);
}
</style>
