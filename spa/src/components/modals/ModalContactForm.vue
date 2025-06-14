<script setup lang="ts">
import { ref, watch, computed } from "vue";
import configs from "@/configs";
import { NonEmptyString, EmailAddress } from "shared/models";
import {useIndicators} from "@/state/indicators";
import userData from "@/state/user-data";
import {sendTextOnlyEmail} from "framework/email-messaging";
import { useToastStack } from "@/plugins/toast-stack";
import dayjs from "@/libraries/dayjs";

const indicators = useIndicators();

const email = ref("");
const emailValid = ref(false);

const subject = ref("");
const subjectValid = ref(false);

const message = ref("");
const messageValid = ref(false);

const userProfile = userData.userProfile();

watch(
    () => userProfile.document,
    (doc) => {
        email.value = doc?.email ?? "";
    },
    { immediate: true },
);

const valid = computed(() => subjectValid.value && emailValid.value && messageValid.value);

const toastStack = useToastStack();

const sentDateTimeString = dayjs().format("ddd Do MMM @ h:mma");

async function sendMessage(done: () => void) {
    const token = indicators.registerPendingAction();

    try {
        await Promise.all([
            sendTextOnlyEmail({
                from: configs.application.email, // send from no-reply email
                to: configs.contact.email, // to front-desk email
                replyTo: {
                    email: email.value, // set reply address to user's email
                },
                subject: `${email.value}: ${subject.value}`,
                text: message.value,
            }),
            sendTextOnlyEmail({
                from: configs.application.email,
                to: {
                    email: email.value,
                },
                subject: `[Message Receipt] ${subject.value}`,
                text: `Thank you for reaching out to ${configs.application.title}.\n` + "Please find a copy of your message below:\n\n\n" + message.value + "\n\n\n" + `Sent: ${sentDateTimeString}`
            }),
        ]);
        done();
        toastStack.show({
            type: "success",
            message: "Message sent.",
        });
    } catch (e) {
        console.error(e);
        toastStack.show({
            type: "error",
            message: "Failed to send message.",
        });
    } finally {
        token.unregisterPendingAction();
    }
}
</script>

<template>
<Modal>
        <template #default="{ done }">
            <ModalHeader title="Get in Touch" icon="fi-ss-envelope" />

            <div class="flex flex-col gap-4">
                <InputWrap label="Email" align="start">
                    <InputTextBox name="email" autocomplete="email" class="w-full" :schema="EmailAddress" v-model:valid="emailValid" v-model="email" :disabled="!!userProfile.document" />
                </InputWrap>

                <InputWrap label="Subject" align="start">
                    <InputTextBox name="subject" autocomplete="off" class="w-full" :schema="NonEmptyString" v-model:valid="subjectValid" v-model="subject" />
                </InputWrap>

                <InputWrap label="Message" align="start">
                    <InputTextArea name="message" class="w-full" :schema="NonEmptyString" v-model:valid="messageValid" v-model="message" :rows="10" />
                </InputWrap>
            </div>

            <ModalActions>
                <Button :action="()=>done()" label="Cancel" />
                <Button variant="primary" :action="()=>sendMessage(done)" :disabled="!valid" icon-left="fi-ss-paper-plane" label="Send" />
            </ModalActions>
        </template>
    </Modal>
</template>
