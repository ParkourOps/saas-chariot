<script setup lang="ts">
import { ref } from "vue";

import { useRouter } from "vue-router";
import useAuth from "@/libraries/firebase/use-auth";
import usePopupAlerts from "@/libraries/use-popup-alerts";
import useBusyCounter from "@/state/use-busy-counter";
import { FirebaseError } from "@/libraries/firebase";

import PaddedPage from "@/components/layouts/PaddedPage.vue";
import Card from "@/components/layouts/Card.vue";
import BoxedTabs from "@/components/inputs/BoxedTabs.vue";
import Textbox from "@/components/inputs/Textbox.vue";
import LabelWrap from "@/components/inputs/LabelWrap.vue";

import { EmailAddress, Password } from "@/_shared_/models";

import { useModalStack } from "@/plugins/modal-stack";
import AwaitingActionModal from "@/components/modals/AwaitingActionModal.vue";

import Logo from "@/assets/images/logo.png";
import configs from "@/configs";

const router = useRouter();
const auth = useAuth();
const alerts = usePopupAlerts();
const busyCounter = useBusyCounter();
const modalStack = useModalStack();

const signInOptions = [
    { key: "link", label: "Link" },
    { key: "password", label: "Password" },
];
const signInOption = ref(signInOptions[0]);

const email = ref("");
const emailValid = ref(false);

const password = ref("");
const passwordValid = ref(false);

function userEmailValid() {
    if (!emailValid.value) {
        alerts.push({
            type: "error",
            message: "Please check that your email address is valid.",
            autoDismiss: true,
        });
        return false;
    } else {
        return true;
    }
}

function userPasswordValid() {
    if (!passwordValid.value) {
        alerts.push({
            type: "error",
            message: "Please check password. A valid password must be at least 6 characters long and contain a lowercase letter (a-z), an uppercase letter (A-Z), a number (0-9), and a symbol.",
            autoDismiss: true,
        });
        return false;
    } else {
        return true;
    }
}

async function getSignInLink() {
    if (!userEmailValid()) {
        return;
    } else {
        busyCounter.increment();
        await auth.signInWithLink.sendLoginLink(email.value, { name: "processSignIn" });
        modalStack.showModal(AwaitingActionModal, {
            // title: "Sign In",
            instruction: "Please check your inbox for a sign in link.",
        });
        busyCounter.decrement();
    }
}

async function signInWithPassword() {
    if (!userEmailValid() || !userPasswordValid()) {
        return;
    }
    try {
        busyCounter.increment();
        await auth.signInWithPassword.signInWithPassword(email.value, password.value);
        await router.push({ name: "user-dashboard" });
    } catch (e) {
        console.error(e);
        if (e instanceof FirebaseError && e.code === "auth/invalid-credential") {
            alerts.push({
                type: "error",
                message: "Incorrect email address or password.",
                autoDismiss: true,
            });
        }
    } finally {
        busyCounter.decrement();
    }
}

async function signUpWithPassword() {
    if (!userEmailValid() || !userPasswordValid()) {
        return;
    }
    try {
        busyCounter.increment();
        await auth.signInWithPassword.createUserWithPassword(email.value, password.value);
        await router.push({ name: "user-dashboard" });
    } catch (e) {
        console.error(e);
        if (e instanceof FirebaseError && e.code === "auth/email-already-in-use") {
            alerts.push({
                type: "error",
                message: "An account with this email address already exists. If attempting to sign in with password for the first time, please click 'Forgot password?' to set a password.",
            });
        }
    } finally {
        busyCounter.decrement();
    }
}

async function resetPassword() {
    if (!userEmailValid()) {
        return;
    }
    busyCounter.increment();
    await auth.signInWithPassword.sendPasswordResetLink(email.value);
    alerts.push({
        type: "info",
        message: "Please check your inbox for a password reset link.",
        autoDismiss: true,
    });
    busyCounter.decrement();
}
</script>

<template>
    <PaddedPage>
        <Card :image="Logo" :image-alt="configs.application.name" image-class="px-6 pt-6" shadow="2xl" class="mx-auto max-w-sm" compact>
            <div class="mb-4 flex flex-col gap-4">
                <BoxedTabs :options="signInOptions" tab-class="font-bold" v-model="signInOption" />

                <p class="mx-auto my-4 max-w-xs text-center leading-snug">
                    {{ signInOption.key === "link" ? "Please enter your email address and we'll send you a sign in link." : "Please enter your email address and password to sign up or sign in." }}
                </p>

                <LabelWrap label="Email" align="center">
                    <template #icon>
                        <i class="fi fi-ss-envelope" />
                    </template>
                    <Textbox name="email" type="text" :schema="EmailAddress" class="w-full text-center" v-model="email" v-model:valid="emailValid" />
                </LabelWrap>

                <LabelWrap v-if="signInOption.key === 'password'" label="Password" label-class="text-primary text-center">
                    <template #icon>
                        <i class="fi fi-ss-key" />
                    </template>
                    <Textbox name="current-password" type="password" :schema="Password" class="w-full text-center" v-model="password" v-model:valid="passwordValid" />
                </LabelWrap>
            </div>

            <template #actions v-if="signInOption.key === 'link'">
                <button class="btn btn-primary grow" @click="getSignInLink">GET SIGN IN LINK</button>
            </template>
            <template #actions v-else-if="signInOption.key === 'password'">
                <button class="btn btn-outline btn-primary grow" @click="signUpWithPassword">CREATE ACCONT</button>
                <button class="btn btn-primary grow" @click="signInWithPassword">SIGN IN</button>
            </template>
        </Card>
    </PaddedPage>
</template>
