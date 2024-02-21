<script setup lang="ts">
    import { ref } from 'vue';
    import configs from '@/configs';
    import Logo from "@/assets/images/logo.png";
    import { EmailAddress } from '@/_shared_/models';
    
    const signInOptions = [
        { key: 'link', label: 'Link' },
        { key: 'password', label: 'Password' }
    ];
    const signInOption = ref(signInOptions[0]);

    const email = ref('')
    const emailValid = ref(false)
    const password = ref('')
    const passwordValid = ref(false)
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

        <p class="mx-auto my-4 max-w-xs text-center leading-snug">
          {{
            signInOption.key === 'link'
              ? "Please enter your email address and we'll send you a sign in link."
              : 'Please enter your email address and password to sign up or sign in.'
          }}
        </p>

        <InputWrap label="Email" align="center" icon-class="fi fi-ss-envelope">
          <TextBox
            name="email"
            type="text"
            :schema="EmailAddress"
            class="w-full text-center"
            v-model="email"
            v-model:valid="emailValid"
          />
        </InputWrap>

        <InputWrap
          v-if="signInOption.key === 'password'"
          label="Password"
          align="center"
          icon-class="fi fi-ss-key"
        >
          <TextBox
            name="current-password"
            type="password"
            class="w-full text-center"
            v-model="password"
            v-model:valid="passwordValid"
          />
        </InputWrap>
      </div>

      <template #actions v-if="signInOption.key === 'link'">
        <button class="btn btn-primary grow" @click="getSignInLink">GET SIGN IN LINK</button>
      </template>
      
      <template #actions v-else-if="signInOption.key === 'password'">
        <button class="btn btn-outline btn-primary grow" @click="signUpWithPassword">
          CREATE ACCOUNT
        </button>
        <button class="btn btn-primary grow" @click="signInWithPassword">SIGN IN</button>
      </template>
    </CardLayout>
</PagePaddedContent>
</template>