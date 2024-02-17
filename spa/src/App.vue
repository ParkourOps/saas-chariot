<script setup lang="ts">
import { RouterView } from "vue-router";

import {useAnalytics} from "@/libraries/analytics";
const analytics = useAnalytics();

// import useAuth from "@/libraries/firebase/use-auth";
// import { watch } from "vue";
import { useModalStack } from "@/plugins/modal-stack";
// const router = useRouter();
// const route = useRoute();
// const auth = useAuth();

const modalStack = useModalStack();
// watch(
//     () => auth.activeUser,
//     async (user) => {
//         if (!user) {
//             analytics.resetIdentity();
//             await router.push({ name: "signIn" });
//         } else {
//             analytics.setIdentity(user.uid);
//             // show modal if email address not verified
//             if (!user.emailVerified) {
//                 modalStack.showModal(() => import("./components/modals/ModalAwaitAction.vue"), {
//                     title: "Email Verification Required",
//                     instruction: "Please check your inbox for a verification link.",
//                     async mountAction() {
//                         await auth.sendEmailVerificationLink(route);
//                     },
//                 });
//             }
//         }
//     },
// );

import { useIndicators } from "./state/indicators";
const indicators = useIndicators();

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
    <ToastNotifications />

    <!-- Popup Alerts -->
    <PopupAlerts />

    <!-- Overlay -->
    <Transition
        enter-active-class="ease-in-out duration-500 sm:duration-700"
        :enter-from-class="modalStack.numModals.value > 0 ? 'opacity-1' : 'opacity-0'"
        enter-to-class="opacity-1"
        leave-active-class="ease-in-out duration-500 sm:duration-700"
        leave-from-class="opacity-1"
        leave-to-class="opacity-0"
    >
        <div class="fixed top-0 flex h-screen w-screen flex-col items-center justify-center bg-base-100/80 pb-16" v-if="indicators.showOverlay || indicators.isBusy || modalStack.numModals.value > 0">
            <BusySpinner v-if="indicators.isBusy" />
        </div>
    </Transition>

    <!-- Modal Manager -->
    <ModalStack />
</template>
