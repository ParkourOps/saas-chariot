<script setup lang="ts">
    import {useToasts} from "../../libraries/toasts";
    import {useAlerts} from "../../libraries/alerts";
import Dropdown from "@/components/form/Dropdown.vue";
import { ref } from "vue";
import type { NotificationType } from "@/types/notification-type";
import Textbox from "@/components/form/Textbox.vue";
import { z } from "zod";
import { reactive } from "vue";
    const toasts = useToasts();
    const alerts = useAlerts();

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
    <div class="max-w-prose mx-auto mt-12 px-4 sm:px-0">
        <!-- Toasts Factory -->
        <div class="card max-w-sm bg-neutral shadow-xl mx-auto mb-12">
            <div class="card-body">
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
                            <p class="mr-4">{{ option }}</p>
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
            </div>
        </div>

        <!-- Alerts Factory -->
        <div class="card max-w-sm bg-neutral shadow-xl mx-auto mb-8">
            <div class="card-body">
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
                            <p class="mr-4">{{ option }}</p>
                        </template>
                    </Dropdown>

                    <div>
                        <p class="text-xs mb-1 opacity-50">Message</p>
                        <Textbox class="w-full" v-model="userAlert.message" :schema="z.string().min(1)" v-model:valid="userAlert.messageValid" />
                    </div>

                    <div>
                        <p class="text-xs mb-1 opacity-50">Automatically Dismiss?</p>
                        <input type="checkbox" class="toggle" v-model="userAlert.autoDismiss" />
                    </div>
                    
                <div class="divider" />
                <button class="btn btn-secondary" @click="showAlert">SHOW</button>
            </div>
        </div>
        
        
    </div>
</template>