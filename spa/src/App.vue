<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import useToastNotifications from "@/libraries/use-toast-notifications";
import usePopupAlerts from "@/libraries/use-popup-alerts";
import useAnalytics from "@/libraries/use-analytics";
import useBusyCounter from "./state/use-busy-counter";

import useAuth from "@/libraries/firebase/use-auth";
import { watch } from "vue";

import { useOverlay } from "@/state/overlay";
import { useModalStack } from "@/plugins/modal-stack";

const toasts = useToastNotifications();
const alerts = usePopupAlerts();
const busyCounter = useBusyCounter();
const overlay = useOverlay();

// on activeUser change
const router = useRouter();
const route = useRoute();
const auth = useAuth();
const analytics = useAnalytics();
const modalStack = useModalStack();
watch(
    () => auth.activeUser,
    async (user) => {
        if (!user) {
            analytics.resetIdentity();
            await router.push({ name: "signIn" });
        } else {
            analytics.setIdentity(user.uid);
            // show modal if email address not verified
            if (!user.emailVerified) {
                modalStack.showModal(() => import("./components/modals/ModalAwaitAction.vue"), {
                    title: "Email Verification Required",
                    instruction: "Please check your inbox for a verification link.",
                    async mountAction() {
                        await auth.sendEmailVerificationLink(route);
                    },
                });
            }
        }
    },
);

// react to global query params
// const route = useRoute();
// watch(route, (to)=>{
//   // get query params
//   //
//   const mode = to.query.mode;
//   const actionCode = to.query.oobCode;
//   const continueUrl = to.query.continueUrl;
//   // const lang = to.query.lang;
//   switch (mode) {
//     case "resetPassword":
//       break;
//     case "verifyEmail":
//       if (actionCode && typeof actionCode === "string") {
//         auth.applyActionCode(actionCode)
//           .then(()=>{
//             toasts.push({
//               type: "success",
//               message: "Email address has been verified."
//             })
//           });
//       }
//       break;
//   }
// });
</script>

<template>
    <!-- Foreground Layer -->
    <div class="flex min-h-screen flex-col">
        <div class="grow overflow-hidden">
            <RouterView />
        </div>
        <TheFooter class="grow-0" show-email="button" />
    </div>

    <!-- Toast Notifications -->
    <div class="toast toast-end toast-top cursor-pointer">
        <div
            v-for="n in toasts.toasts"
            :key="n.id"
            :class="[
                `alert shadow-2xl`,
                { 'alert-info': n.type === 'info' },
                { 'alert-success': n.type === 'success' },
                { 'alert-warning': n.type === 'warning' },
                { 'alert-error': n.type === 'error' },
                {
                    'bg-base-100': n.type && !['info', 'success', 'warning', 'error'].includes(n.type),
                },
            ]"
            @click="toasts.pop(n.id)"
        >
            <div>
                <p class="text-sm font-semibold">{{ n.title }}</p>
                <p>{{ n.message }}</p>
            </div>
        </div>
    </div>

    <!-- Popup Alerts -->
    <div class="fixed top-0 flex w-full flex-col gap-4 p-4 sm:gap-8 sm:p-8" v-if="alerts.alerts.length > 0">
        <AlertLayout v-for="a in alerts.alerts" :key="a.id" :type="a.type" @dismiss="() => alerts.pop(a.id)" show>
            <span>{{ a.message }}</span>
        </AlertLayout>
    </div>

    <!-- Overlay -->
    <Transition
        enter-active-class="ease-in-out duration-500 sm:duration-700"
        :enter-from-class="modalStack.modalStack.size > 0 ? 'opacity-1' : 'opacity-0'"
        enter-to-class="opacity-1"
        leave-active-class="ease-in-out duration-500 sm:duration-700"
        leave-from-class="opacity-1"
        leave-to-class="opacity-0"
    >
        <div class="fixed top-0 flex h-screen w-screen flex-col items-center justify-center bg-base-100/80 pb-16" v-if="overlay.showOverlay || busyCounter.isBusy || modalStack.modalStack.size > 0">
            <BusySpinner v-if="busyCounter.isBusy" />
        </div>
    </Transition>

    <!-- Modal Manager -->
    <ModalStack />
</template>
