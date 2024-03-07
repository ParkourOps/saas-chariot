<script setup lang="ts">
import { ref } from "vue";
import { EmailAddress } from "shared/models";
import {sendActionLink} from "framework/action-links";
import getRouteUrl from "@/utilities/get-route-url";
import ResourceInfo from "framework/resource-delivery/components/ResourceInfo.vue";
import { useIndicators } from "@/state/indicators";
import { useToastStack } from "@/plugins/toast-stack";
import { useAlertStack } from "@/plugins/alert-stack";
import dayjs from "@/libraries/dayjs";
import { useAnalytics } from "@/framework_features/analytics";
import type BusySpinnerVue from "@/components/indicators/BusySpinner.vue";

    const props = defineProps<{
        mailingListKey: string
        leadMagnetResourceKey: string,
        lockInPrice: string,
    }>();

    const email = ref("");
    const emailValid = ref(false);
    const emailTouched = ref(false);

    const indicators = useIndicators();
    const alertStack = useAlertStack();
    const toastStack = useToastStack();

    const analytics = useAnalytics();

    function sendLink(done: () => void, title: string, thumbnailUrl?: string) {
        if (!emailValid.value) {
            return;
        }

        const token = indicators.registerPendingAction();

        const expiryDateTimeString = dayjs().add(1, 'hour').format("ddd Do MMM @ h:mma");

        sendActionLink({
            email: email.value,
            actionSequence: [
                {
                    type: "subscribe_to_mailing_list",
                    mailingListKey: props.mailingListKey,
                },
                {
                    type: "issue_resource",
                    resourceKey: props.leadMagnetResourceKey,
                },
            ],
            callToAction: {
                text: "Access",
                caption: `(Link expires on ${expiryDateTimeString}.)`
            },
            prompt: {
                heading: `Your Download Is Ready!`,
                paragraphs: [
                    "Thank you for joining the SaaS Chariot waiting list.",
                    `Please click the 'Access' button below to download:`,
                    title
                ],
            },
            successUrl: getRouteUrl({ name: "/" }),
            failUrl: getRouteUrl({ name: "/" }),
        })
            .then(() => {
                analytics.trackEvent("join-mailing-list")({
                    mailingListKey: props.mailingListKey,
                    leadMagnet: {
                        key: props.leadMagnetResourceKey,
                        title,
                        thumbnailUrl,
                    }
                })
                done();
                alertStack.show({
                    type: "success",
                    message: "Please check your inbox."
                });
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(()=> {
                token.unregisterPendingAction();
            })
    }
</script>

<template>

    <Modal size="md" class="bg-neutral">
        <template #default="{ done }">
            <StaticAlert type="warning" class="mb-8">
                Unfortunately, due to high demand, we've reached our maximum capacity. We're working diligently to expand and accommodate more customers!
            </StaticAlert>

            <ResourceInfo :resource-key="leadMagnetResourceKey">

                <template #default="{title, description, thumbnails}">
                    <div class="flex flex-col gap-4 sm:gap-8">
                        <p class="font-bold text-center text-lg mx-auto sm:text-2xl tracking-tighter sm:tracking-normal">
                            Please join the waiting list.
                        </p>

                        <InputWrap label="Email" horizontal-align="centre" icon-left="fi fi-ss-envelope" width="md">
                            <InputTextBox
                                block
                                name="email"
                                type="text"
                                :schema="EmailAddress"
                                v-model="email"
                                v-model:valid="emailValid"
                                v-model:touched="emailTouched"
                                horizontal-align="centre"
                            />
                            <DynamicAlert type="error" :show="emailTouched && !emailValid" message="A valid email address is required to join the waiting list." class="mt-2" />
                        </InputWrap>
                                
                        <p class="text-center w-[17.5rem] mx-auto leading-none sm:-mb-4">As a gesture of appreciation, we will send you:</p>

                        <div class="flex flex-col lg:flex-row h-80 sm:h-96 bg-cover rounded-box px-4 pb-4" :style="{'background-image': `url(${thumbnails?.[0] ?? '#'})`}">
                            <div class="mx-auto h-fit text-center bg-tertiary/90 sm:bg-tertiary/60 rounded-box rounded-t-none p-4 text-primary" >
                                <p class="font-serif font-extrabold text-xl max-w-md md:text-2xl mx-auto">{{ title }}</p>
                                <!-- <p>{{ description }}</p> -->
                            </div>
                        </div>



                        <ModalActions justify="space-between">
                            <Button :action="()=>done()" size="lg" variant="ghost" label="Cancel" />
                            <Button :action="()=>sendLink(done, title, thumbnails?.[0])" :disabled="!emailValid" size="lg" variant="primary" icon-left-class="fi fi-ss-square-plus" label="Join" />
                        </ModalActions>
                    </div>             
                </template>

                <template #loading>
                    <BusySpinner colour="secondary" class="my-16 mx-auto" />
                </template>

                <template #error>
                    <ModalActions justify="centre">
                        <Button :action="()=>done()" size="lg" variant="ghost" label="Close" />
                    </ModalActions>
                </template>
            </ResourceInfo>

        </template>
    </Modal>
</template>

