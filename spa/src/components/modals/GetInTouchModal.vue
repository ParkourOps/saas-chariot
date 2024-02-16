<script setup lang="ts">
import { ref, watch, computed } from "vue";
import configs from "@/configs";
import LabelWrap from "@/components/inputs/LabelWrap.vue";
import Textbox from "@/components/inputs/Textbox.vue";
import Textarea from "@/components/inputs/Textarea.vue";
import ModalTitle from "@/components/layouts/ModalTitle.vue";
import ModalActions from "@/components/layouts/ModalActions.vue";
import { NonEmptyString, EmailAddress } from "@/_shared_/models";
import useBusyCounter from "@/state/use-busy-counter";
import useUserProfile from "@/state/use-user-profile";
import useMessaging from "@/libraries/use-messaging";
import useToastNotifications from "@/libraries/use-toast-notifications";

const messaging = useMessaging();
const toasts = useToastNotifications();
const busyCounter = useBusyCounter();

const subject = ref("");
const subjectValid = ref(false);

const email = ref("");
const emailValid = ref(false);

const message = ref("");
const messageValid = ref(false);

const user = useUserProfile();
watch(
    () => user.document,
    (doc) => {
        email.value = doc?.email ?? "";
    },
    { immediate: true },
);

const valid = computed(() => subjectValid.value && emailValid.value && messageValid.value);

async function sendMessage(done: () => void) {
    busyCounter.increment();

    try {
        await Promise.all([
            messaging.email.sendTextOnlyEmail({
                from: configs.application.email, // send from no-reply email
                to: configs.contact.email, // to front-desk email
                replyTo: {
                    address: email.value, // set reply address to user's email
                },
                subject: `${email.value}: ${subject.value}`,
                text: message.value,
            }),
            messaging.email.sendTextOnlyEmail({
                from: configs.application.email,
                to: {
                    address: email.value,
                },
                subject: `[Message Receipt] ${subject.value}`,
                text: `Thank you for reaching out to ${configs.application.name}.\n` + "Please find a copy of your message below:\n\n\n" + message.value,
            }),
        ]);
        done();
        toasts.push({
            type: "success",
            message: "Message sent.",
        });
    } catch (e) {
        console.error(e);
        toasts.push({
            type: "error",
            message: "Failed to send message.",
        });
    } finally {
        busyCounter.decrement();
    }
}
</script>

<template>
    <Modal>
        <template #default="{ done }">
            <ModalTitle title="Get in Touch" icon-class="fi fi-ss-envelope" />

            <div class="flex flex-col gap-4">
                <LabelWrap label="Email" align="start">
                    <Textbox name="email" autocomplete="email" class="w-full" :schema="EmailAddress" v-model:valid="emailValid" v-model="email" :disabled="!!user.document" />
                </LabelWrap>

                <LabelWrap label="Subject" align="start">
                    <Textbox name="subject" autocomplete="off" class="w-full" :schema="NonEmptyString" v-model:valid="subjectValid" v-model="subject" />
                </LabelWrap>

                <LabelWrap label="Message" align="start">
                    <Textarea class="w-full leading-none tracking-tighter" :schema="NonEmptyString" v-model:valid="messageValid" v-model="message" :rows="10"> </Textarea>
                </LabelWrap>
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
