<script setup lang="ts">
import {watch} from "vue";
import {useAuth} from "@/libraries/firebase/auth";
import {useAnalytics} from "@/libraries/analytics";
import {useModalStack} from "@/plugins/modal-stack";

const auth = useAuth();
const analytics = useAnalytics();
const router = useRouter();
const route = useRoute();
const modalStack = useModalStack();

/* Handle application-wide actions that are triggered by change in auth status: */
watch(
    () => auth.activeUser,
    async (user) => {
        if (user === null) {
            analytics.resetIdentity();
            if (route.meta.requiresAuth) {
                router.push("/app/sign-in");
            }
        } else if (typeof user === "object") {
            analytics.setIdentity(user.uid);
        }
    }
);

/* When busy, disable the entire page using overlay to prevent user activity: */
import { useIndicators } from "./state/indicators";
const indicators = useIndicators();
watch(()=>indicators.isBusy, (isBusy)=>{
    if (isBusy) {
        document.getElementsByTagName("html")[0].classList.add("overflow-hidden", "pointer-events-none");
    } else {
        document.getElementsByTagName("html")[0].classList.remove("overflow-hidden", "pointer-events-none");
    }
});

/* Append initial SEO tags: */
seo.initialise();
</script>

<template>
    <!-- Foreground Layer -->
    <div class="flex flex-col min-h-screen">
        <div class="grow overflow-x-clip">
            <RouterView/>
        </div>
        <TheFooter class="grow-0" show-email="button" />
    </div>

    <!-- Overlay -->
    <Transition
        enter-active-class="ease-in-out duration-500 sm:duration-700"
        :enter-from-class="modalStack.numModals.value > 0 ? 'opacity-1' : 'opacity-0'"
        enter-to-class="opacity-1"
        leave-active-class="ease-in-out duration-500 sm:duration-700"
        leave-from-class="opacity-1"
        leave-to-class="opacity-0"
    >
        <div class="fixed top-0 flex h-screen w-screen flex-col items-center justify-center bg-black/80 pb-16" v-if="indicators.isOverlayVisible || modalStack.numModals.value > 0">
            <BusySpinner colour="base-100" v-if="indicators.isBusy" />
        </div>
    </Transition>

    <!-- Toast Notifications -->
    <ToastStack />

    <!-- Popup Alerts -->
    <AlertStack />

    <!-- Modal Manager -->
    <ModalStack />
</template>
