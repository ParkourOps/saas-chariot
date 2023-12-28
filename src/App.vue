<script setup lang="ts">
  import { RouterView, useRoute, useRouter } from 'vue-router'
  import { useToastNotifications } from './libraries/use-toast-notifications';
  import { usePopupAlerts } from './libraries/use-popup-alerts';
  import Spinner from '@/components/ui/Spinner.vue';
  import { useBusyStatus } from './state/busy-status';
  import { useAuth } from './libraries/firebase/use-auth';
  import { watch } from 'vue';
  import { useAnalytics } from './libraries/use-analytics';
  import Footer from './components/layouts/Footer.vue';
  import Alert from './components/ui/Alert.vue';
  import { useOverlay } from './state/overlay';
  import { useModalStack } from './plugins/modal-stack';
  import AwaitingActionModal from './components/modals/AwaitingActionModal.vue';

  const toasts = useToastNotifications();
  const alerts = usePopupAlerts();
  const busyStatus = useBusyStatus();
  const overlay = useOverlay();

  // on activeUser change
  const router = useRouter();
  const route = useRoute();
  const auth = useAuth();
  const analytics = useAnalytics();
  const modalStack = useModalStack();
  watch(()=>auth.activeUser, async (user)=>{
    if (!user) {
      analytics.identify();
      await router.push({name: 'signIn'});
    } else {
      analytics.identify(user.uid);
      // show modal if email address not verified
      if (!user.emailVerified) {
        modalStack.showModal(AwaitingActionModal, {
          title: "Email Verification Required",
          instruction: "Please check your inbox for a verification link.",
          async mountAction() {
            await auth.sendEmailVerificationLink(route);
            console.log("Mount action!")
          },
        }); 
      }
    }
  });

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
  <div class="flex flex-col min-h-screen bg-neutral">
    <div class="grow overflow-hidden">
      <RouterView />
    </div>
    <Footer class="grow-0"/>
  </div>

  <!-- Toast Notifications -->
  <div class="toast toast-top toast-end cursor-pointer">
    <div 
      v-for="n in toasts.toasts" :key="n.id"
      :class="[
        `alert shadow-2xl`,
        { 'alert-info': n.type === 'info' },
        { 'alert-success': n.type === 'success' },
        { 'alert-warning': n.type === 'warning' },
        { 'alert-error': n.type === 'error' },
        { 'bg-base-100': n.type && !['info', 'success', 'warning', 'error'].includes(n.type) }
      ]"
      @click="toasts.pop(n.id)"
    >
      <div>
        <p class="font-semibold text-sm">{{ n.title }}</p>
        <p>{{ n.message }}</p>
      </div>
    </div>
  </div>

  <!-- Popup Alerts -->
  <div class="toast toast-top w-full">
    <Alert 
      v-for="a in alerts.alerts" :key="a.id"
      :type="a.type"
      :on-dismiss="() => alerts.pop(a.id)"
      show
    >
      {{ a.message }}
    </Alert>
   
  </div>
  
  <!-- Overlay -->
  <Transition
    enter-active-class="ease-in-out duration-500 sm:duration-700"
    :enter-from-class=" modalStack.modalStack.size > 0 ? 'opacity-1' : 'opacity-0'"
    enter-to-class="opacity-1"
    leave-active-class="ease-in-out duration-500 sm:duration-700"
    leave-from-class="opacity-1"
    leave-to-class="opacity-0"
  >
    <div class="bg-base-100/80 fixed h-screen w-screen top-0 flex flex-col justify-center items-center pb-16" v-if="overlay.overlay || busyStatus.busy || modalStack.modalStack.size > 0">
        <Spinner v-if="busyStatus.busy" />
    </div>
  </Transition>

  <!-- Modal Manager -->
  <ModalStack />
</template>
