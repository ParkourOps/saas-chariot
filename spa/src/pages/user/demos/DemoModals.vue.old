<script setup lang="ts">
    import ErrorIcon from '@/assets/icons/ErrorIcon.vue';
    import Textbox from '@/components/form/Textbox.vue';
import Card from '@/components/layouts/Card.vue';
    import Page from '@/components/layouts/Page.vue';
    import { useToastNotifications } from '@/libraries/use-toast-notifications';
    import { useModalStack } from '@/plugins/modal-stack';
    import { ref } from 'vue';
    import { z } from 'zod';
    const modalStack = useModalStack();
    const toasts = useToastNotifications();

async function getBooleanResultFromModal() {
    const result = await modalStack.showModal(()=>import('@/components/modals/ConfirmationModal.vue'), {});
    if (result) {
        toasts.push({
            type: "success",
            message: "You pressed 'Done'"
        })
    } else {
        toasts.push({
            type: "info",
            message: "You pressed 'Cancel'"
        })
    }
}

async function getTextResultFromModal() {
    const result = await modalStack.showModal(()=>import('@/components/modals/TextInputModal.vue'), {});
    if (result) {
        toasts.push({
            type: "success",
            message: `You entered: ${result}`
        })
    } else {
        toasts.push({
            type: "info",
            message: "You pressed 'Cancel'"
        })
    }
}
const nameInput = ref("");
const nameInputValid = ref(false);
</script>

<template>
    <Page>

        <Card class="max-w-sm mx-auto">
            <p class="text-lg font-semibold text-primary">
                Simple Modal
            </p>
            <div class="divider" />
            <button class="btn btn-secondary" @click="$showModal(()=>import('@/components/modals/SimpleModal.vue'), {})">SHOW</button>
        </Card>
        
        <Card class="max-w-sm mx-auto">
            <p class="text-lg font-semibold text-primary">
                Simple Modal With Props
            </p>

            <p class="text-xs text-primary">
                In this scenario, data is provisioned by the invoker to the invoked modal component before it is rendered.
            </p>

            <div class="divider" />

            <div>
                <p class="text-sm mb-1 opacity-50">What is your name?</p>
                <Textbox class="w-full" v-model="nameInput" :schema="z.string().min(1)" v-model:valid="nameInputValid" />
            </div>

            <div class="divider" />

            <button 
                class="btn btn-secondary disabled:bg-error/50"
                :disabled="!nameInputValid"
                @click="$showModal(()=>import('@/components/modals/SimpleModalWithProps.vue'), {
                    name: nameInput
                })"
            >
                <ErrorIcon v-if="!nameInputValid"/>
                <span v-if="!nameInputValid">PLEASE ENTER A VALID NAME</span>
                <span v-if="nameInputValid">SHOW</span>
            </button>

        </Card>

        <Card class="max-w-sm mx-auto">
            <p class="text-lg font-semibold text-primary">
                Confirmation Modal
            </p>
            <p class="text-xs text-primary">
                In this scenario, boolean data is provisioned by the <em>invoked</em> modal component back to the invoker depending on which button is pressed.
            </p>                
            <div class="divider" />
            <button class="btn btn-secondary" @click="getBooleanResultFromModal">SHOW</button>
        </Card>

        <Card class="max-w-sm mx-auto">
            <p class="text-lg font-semibold text-primary">
                Text Input Modal
            </p>
            <p class="text-xs text-primary">
                In this scenario, text data is provisioned by the <em>invoked</em> modal component back to the invoker if <strong>Done</strong> is pressed.
            </p>
            <div class="divider" />
            <button class="btn btn-secondary" @click="getTextResultFromModal">SHOW</button>
        </Card>  

    </Page>
</template>
