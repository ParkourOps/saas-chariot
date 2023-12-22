<script setup lang="ts">
    import ErrorIcon from '@/assets/icons/ErrorIcon.vue';
    import Textbox from '@/components/form/Textbox.vue';
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

        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold mb-4">
                    Simple Modal
                </p>
                <button class="btn btn-secondary" @click="$showModal(()=>import('@/components/modals/SimpleModal.vue'), {})">SHOW</button>
            </div>
        </div>

        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    Simple Modal With Props
                </p>
                <p>
                    In this scenario, data is provisioned by the invoker to the invoked modal component before it is rendered.
                </p>
                <div class="divider" />
                <div>
                    <p class="text-sm mb-1 opacity-50">What is your name?</p>
                    <Textbox class="mb-4 w-full" v-model="nameInput" :schema="z.string().min(1)" v-model:valid="nameInputValid" />
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
                <span v-if="!nameInputValid">PLEASE ENTER A VALID NAME ABOVE</span>
                <span v-if="nameInputValid">SHOW</span>
                    
                </button>
            </div>
        </div>

        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    Confirmation Modal
                </p>
                <p class="mb-4">
                    In this scenario, boolean data is provisioned by the <em>invoked</em> modal component back to the invoker depending on which button is pressed.
                </p>                
                <button class="btn btn-secondary" @click="getBooleanResultFromModal">SHOW</button>
            </div>
        </div>

        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    Text Input Modal
                </p>
                <p class="mb-4">
                    In this scenario, text data is provisioned by the <em>invoked</em> modal component back to the invoker if <strong>Done</strong> is pressed.
                </p>
                <button class="btn btn-secondary" @click="getTextResultFromModal">SHOW</button>
            </div>
        </div>        

    </Page>
</template>
