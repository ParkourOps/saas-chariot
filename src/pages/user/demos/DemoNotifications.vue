<script setup lang="ts">
    import { useToastNotifications } from "@/libraries/use-toast-notifications";
    import { usePopupAlerts } from '@/libraries/use-popup-alerts';
    import Dropdown from "@/components/form/Dropdown.vue";
    import Textbox from "@/components/form/Textbox.vue";
    import Page from "@/components/layouts/Page.vue";
    import { z } from "zod";
    import { reactive } from "vue";
import Card from "@/components/layouts/Card.vue";
    
    const toasts = useToastNotifications();
    const alerts = usePopupAlerts();

    const notificationTypes = [
        "(none)",
        "info",
        "success",
        "warning",
        "error"
    ];

    // toasts
    const userToast = reactive({
        type: undefined,
        title: "",
        message: "Some message here...",
        messageValid: false
    })

    function showToast() {
        if (!userToast.messageValid) {
            alerts.push({
                type: "error",
                message: "A message is required."
            })
            return;
        }
        toasts.push({
            type: userToast.type,
            title: userToast.title,
            message: userToast.message
        })
    }

    // alerts
    const userAlert = reactive({
        type: undefined,
        message: "Some message here...",
        messageValid: false,
        autoDismiss: false,
    })

    function showAlert() {
        if (!userToast.messageValid) {
            alerts.push({
                type: "error",
                message: "A message is required."
            })
            return;
        }        
        alerts.push({
            type: userAlert.type,
            message: userAlert.message,
            autoDismiss: userAlert.autoDismiss
        })
    }
</script>

<template>
    <Page>

        <!-- Toasts Factory -->
        <Card class="max-w-sm mx-auto">
            <p class="text-lg font-semibold text-primary">
                Toast Notifications
            </p>

            <div class="divider" />

            <Dropdown 
                button-class="btn-accent w-full"
                label="Select an Option" 
                :options="notificationTypes"
                v-model="userToast.type"
            >
                <template #unselected>
                    Select a Type
                </template>
                <template #selected="{option}">
                    <p>{{ option }}</p>
                </template>
                <template #default="{option}">
                    <p>{{ option }}</p>
                </template>
            </Dropdown>

            <div>
                <p class="text-xs mb-1 opacity-50">Title</p>
                <Textbox class="w-full" v-model="userToast.title" />
            </div>

            <div>
                <p class="text-xs mb-1 opacity-50">Message</p>
                <Textbox class="w-full" v-model="userToast.message" :schema="z.string().min(1)" v-model:valid="userToast.messageValid" />
            </div>

            <div class="divider" />

            <button class="btn btn-secondary" @click="showToast">SHOW</button>
        </Card>

        <!-- Alerts Factory -->
        <Card class="max-w-sm mx-auto">
            <p class="text-lg font-semibold text-primary">
                    Pop-Up Alerts
                </p>
                <div class="divider" />
                    <Dropdown 
                        button-class="btn-accent w-full"
                        label="Select an Option" 
                        :options="notificationTypes"
                        v-model="userAlert.type"
                    >
                        <template #unselected>
                            Select a Type
                        </template>
                        <template #selected="{option}">
                            <p>{{ option }}</p>
                        </template>
                        <template #default="{option}">
                            <p>{{ option }}</p>
                        </template>
                    </Dropdown>

                    <div>
                        <p class="text-xs mb-1 opacity-50">Message</p>
                        <Textbox class="w-full" v-model="userAlert.message" :schema="z.string().min(1)" v-model:valid="userAlert.messageValid" />
                    </div>

                    <div class="mt-1">
                        <p class="text-xs mb-1 opacity-50">Automatically Dismiss?</p>
                        <input type="checkbox" class="toggle" v-model="userAlert.autoDismiss" />
                    </div>
                    
                <div class="divider" />
                <button class="btn btn-secondary" @click="showAlert">SHOW</button>
        </Card>
    </Page>
</template>
