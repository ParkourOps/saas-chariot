<script setup lang="ts">
    import { ref, watch } from 'vue';
    import configs from '@/configs';
    import Logo from "@/assets/images/logo.png";
    import { EmailAddress } from '@/_shared_/models';
    import { onMounted } from 'vue';
    import { useAuth } from '@/libraries/firebase/auth';
    import { useAlertStack } from '@/plugins/alert-stack';
    import { useIndicators } from '@/state/indicators';
    import { useModalStack } from '@/plugins/modal-stack';

    const auth = useAuth();
    const route = useRoute();
    const router = useRouter();
    const alerts = useAlertStack();
    const indicators = useIndicators();
    const modals = useModalStack();

    const signInOptions = [
        { key: 'link', label: 'Link' },
        { key: 'password', label: 'Password' }
    ];
    const signInOption = ref(signInOptions[0]);

    const email = ref('');
    const emailValid = ref(false);
    const password = ref('');
    const passwordValid = ref(false);

    async function getSignInLink() {
      if (!emailValid.value) {
        alerts.show({
          type: "error",
          message: "Invalid email address.",
        });
        return;
      }
      try {
        await auth.signInWithLink.sendLink(email.value, route);
        modals.showModal(()=>import("@/components/modals/ModalAwaitUserAction.vue"), {
          instruction: "Please check your inbox for a sign-in link."
        });
      } catch (e) {
        if (e instanceof Error) {
          alerts.show({
            type: "error",
            message: e.message,
          });
        }
      }
    }

    onMounted(async ()=>{
        const token = indicators.registerPendingAction();
        // attempt to catch
        try {
          await auth.signInWithLink.catchAttempt();
        } catch (e) {
          if (e instanceof Error) {
            alerts.show({
              type: "error",
              message: e.message,
            });
          }
        }
        // use email stored from previous attempt if available
        email.value = auth.signInWithLink.getStoredEmail() ?? "";
        //
        token.unregisterPendingAction();
    })

    /* Redirect user automatically as soon as they are signed in. */
    watch(()=>auth.activeUser, (val)=>{
      if (val) {
        router.push({name: "/app/"});
      }
    }, { immediate: true });
</script>

<template>
      <PagePaddedContent>
    <CardLayout
      :image="Logo"
      :image-alt="configs.application.title"
      image-class="px-6 pt-6"
      shadow="2xl"
      class="mx-auto max-w-sm"
      compact
    >
      <div class="mb-4 flex flex-col gap-4">
        <!-- <TabSelect :options="signInOptions" tab-class="font-bold" v-model="signInOption" /> -->

        <p class="mx-auto my-4 max-w-xs text-center">
          {{
            signInOption.key === 'link'
              ? "Please enter your email address and we'll send you a sign-in link."
              : 'Please enter your email address and password to sign up or sign in.'
          }}
        </p>

        <InputWrap label="Email" horizontal-align="centre" icon-left-class="fi fi-ss-envelope">
          <TextBox
            block
            name="email"
            type="text"
            :schema="EmailAddress"
            v-model="email"
            v-model:valid="emailValid"
            horizontal-align="centre"
          />
        </InputWrap>

        <InputWrap
          v-if="signInOption.key === 'password'"
          label="Password"
          align="center"
          icon-left-class="fi fi-ss-key"
        >
          <TextBox
            name="current-password"
            type="password"
            class="w-full text-center"
            v-model="password"
            v-model:valid="passwordValid"
            horizontal-align="centre"
          />
        </InputWrap>
      </div>

      <template #actions v-if="signInOption.key === 'link'">
        <Button variant="primary" block :action="getSignInLink" label="GET SIGN-IN LINK" />
      </template>

      <template #actions v-else-if="signInOption.key === 'password'">
        <button class="btn btn-outline btn-tertiary grow" @click="signUpWithPassword">
          CREATE ACCOUNT
        </button>
        <button class="btn btn-primary grow" @click="signInWithPassword">SIGN IN</button>
      </template>
    </CardLayout>
</PagePaddedContent>
</template>
@/framework_features/firebase/auth