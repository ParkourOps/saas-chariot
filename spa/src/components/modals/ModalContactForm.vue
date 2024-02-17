<script setup lang="ts">
import { ref, watch, computed } from "vue";
import configs from "@/configs";
import { NonEmptyString, EmailAddress } from "@/_shared_/models";
import {useIndicators} from "@/state/indicators";
import userData from "@/state/user-data";
import {sendTextOnlyEmail} from "@/libraries/messaging";
import { useToastNotifications } from "@/plugins/toast-notifications";

const indicators = useIndicators();

const subject = ref("");
const subjectValid = ref(false);

const email = ref("");
const emailValid = ref(false);

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

const toastNotifications = useToastNotifications();

async function sendMessage(done: () => void) {
    const token = indicators.registerPendingAction();

    try {
        await Promise.all([
            sendTextOnlyEmail({
                from: configs.application.email, // send from no-reply email
                to: configs.contact.email, // to front-desk email
                replyTo: {
                    address: email.value, // set reply address to user's email
                },
                subject: `${email.value}: ${subject.value}`,
                text: message.value,
            }),
            sendTextOnlyEmail({
                from: configs.application.email,
                to: {
                    address: email.value,
                },
                subject: `[Message Receipt] ${subject.value}`,
                text: `Thank you for reaching out to ${configs.application.title}.\n` + "Please find a copy of your message below:\n\n\n" + message.value,
            }),
        ]);
        done();
        toastNotifications.show({
            type: "success",
            message: "Message sent.",
        });
    } catch (e) {
        console.error(e);
        toastNotifications.show({
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
            <ModalHeader title="Get in Touch" icon-class="fi fi-ss-envelope" />

            <div class="flex flex-col gap-4">
                <InputWrap label="Email" align="start">
                    <TextBox name="email" autocomplete="email" class="w-full" :schema="EmailAddress" v-model:valid="emailValid" v-model="email" :disabled="!!userProfile.document" />
                </InputWrap>

                <InputWrap label="Subject" align="start">
                    <TextBox name="subject" autocomplete="off" class="w-full" :schema="NonEmptyString" v-model:valid="subjectValid" v-model="subject" />
                </InputWrap>

                <InputWrap label="Message" align="start">
                    <TextArea class="w-full leading-none tracking-tighter" :schema="NonEmptyString" v-model:valid="messageValid" v-model="message" :rows="10" />
                </InputWrap>
            </div>

            <ModalActions>
                <button class="btn" @click="done">Cancel</button>
                <button class="btn btn-primary" @click="sendMessage(done)" :disabled="!valid">
                    <i class="fi fi-ss-paper-plane" />
                    Send
                </button>
            </ModalActions>
        </template>
    </Modal>
</template>
