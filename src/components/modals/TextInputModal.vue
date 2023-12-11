<script setup lang="ts">
import { ref } from 'vue';
import Textbox from '../form/Textbox.vue';
import { z } from 'zod';
import Alert from '../ui/Alert.vue';

    const emailAddress = ref("");
    const emailAddressValid = ref(false);
    const emailAddressTouched = ref(false);

</script>

<template>
    <Modal>
        <template #default="{done}">
            <p class="text-lg font-semibold mb-2">Text Input Modal</p>
            <p class="text-sm mb-6">
                This is a text input modal. It will return the entry below back to the invoker if you press <strong>Done</strong>,
                otherwise it will simply return nothing.
            </p>

            <p class="text-sm mb-1 opacity-50">Email Address</p>
            <Textbox class="w-full" :schema="z.string().email()" v-model="emailAddress" v-model:valid="emailAddressValid" v-model:touched="emailAddressTouched" />
            
            <Alert type="error" :show="!emailAddressValid" class="mt-2 transition-opacity" :class="[{'opacity-50': !emailAddressTouched}]">
                Please enter a valid email address.
            </Alert>

            <div class="flex justify-end gap-4 mt-8">
                <button class="btn btn-base-100" @click="done(false)">Cancel</button>
                <button class="btn btn-primary" @click="done(emailAddress)" :disabled="!emailAddressValid">Done</button>
            </div>
        </template>
    </Modal> 
</template>
