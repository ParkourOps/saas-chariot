<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import Textbox from "@/components/inputs/Textbox.vue";
import Alert from "@/components/indicators/Alert.vue";

const emailAddress = ref("");
const emailAddressValid = ref(false);
const emailAddressTouched = ref(false);
</script>

<template>
    <Modal>
        <template #default="{ done }">
            <p class="mb-2 text-lg font-semibold">Text Input Modal</p>
            <p class="mb-6 text-sm">
                This is a text input modal. It will return the entry below back to the invoker if you press
                <strong>Done</strong>, otherwise it will simply return nothing.
            </p>

            <p class="mb-1 text-sm opacity-50">Email Address</p>
            <Textbox name="email" autocomplete="email" class="w-full" :schema="z.string().email()" v-model="emailAddress" v-model:valid="emailAddressValid" v-model:touched="emailAddressTouched" />

            <Alert type="error" :show="!emailAddressValid" class="mt-2 transition-opacity" :class="[{ 'opacity-50': !emailAddressTouched }]"> Please enter a valid email address. </Alert>

            <div class="mt-8 flex justify-end gap-4">
                <button class="btn-base-100 btn" @click="done(false)">Cancel</button>
                <button class="btn btn-primary" @click="done(emailAddress)" :disabled="!emailAddressValid">Done</button>
            </div>
        </template>
    </Modal>
</template>
