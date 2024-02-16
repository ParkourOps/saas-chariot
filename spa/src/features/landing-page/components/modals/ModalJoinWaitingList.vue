<script setup lang="ts">
import { ref } from "vue";
import { EmailAddress } from "@/_shared_/models";
import useActionLink from "@/libraries/use-action-link";
import getRouteUrl from "@/utilities/get-route-url";
const actionLink = useActionLink();

// const props = defineProps<{
// modal: {
//     headline: string,
//     paragraph: string,
//     callToActionText: string,
// },
// emailMessage: {
//     heading: string,
//     paragraph: string,
//     callToActionText: string,
// },
// resource: {
//     key: string,
//     image: string,
// },
// }>();

const email = ref("");
const emailValid = ref(false);

function sendActionLink(done: () => void) {
    actionLink
        .sendActionLink({
            email: email.value,
            actionSequence: [
                {
                    type: "subscribeToMailingList",
                    mailingListKey: "kbozgt",
                },
                {
                    type: "issueResource",
                    resourceKey: "xrbmvnmbqagf",
                },
            ],
            callToActionText: "Action",
            prompt: {
                heading: "This is a heading",
                paragraph: "something here...",
            },
            successUrl: getRouteUrl({ name: "landingPage" }),
            failUrl: getRouteUrl({ name: "landingPage" }),
        })
        .then(() => {
            done();
        })
        .catch((e) => {
            console.error(e);
        });
}
</script>

<template>
    <Modal>
        <template #default="{ done }">
            <div>
                <TextBox name="email" autocomplete="email" :schema="EmailAddress" v-model="email" v-model:valid="emailValid" />
                <ModalActions>
                    <button class="btn" @click="done">Cancel</button>
                    <button class="btn btn-primary" @click="sendActionLink(done)" :disabled="!emailValid">
                        <i class="fi fi-ss-paper-plane" />
                        Send
                    </button>
                </ModalActions>
            </div>
        </template>
    </Modal>
</template>
