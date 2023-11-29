<script setup lang="ts">
import Textbox from '@/components/form/Textbox.vue';
import { useAuth } from '@/libraries/firebase';
import { onBeforeMount, ref } from 'vue';
import Email from "@/models/Email";
import { useAlerts } from '@/state/alerts';
import { useBusyStatus } from '@/state/busy-status';
import { useRouter } from 'vue-router';

    const auth = useAuth();
    const router = useRouter();
    const alerts = useAlerts();
    const busyStatus = useBusyStatus();

    const email = ref("");
    const emailValid = ref(false);

    async function sendLink() {
        if (!emailValid.value) {
            alerts.push({
                type: "error",
                message: "Please check email address.",
                autoDismiss: true
            })        
        } 
        else {
            busyStatus.increment();
            await auth.sendLoginLink(email.value, {name: "processSignIn"});
            busyStatus.decrement();
            alerts.push({
                type: "info",
                message: "Please check your inbox for a sign in link."
            })
        }
    }
</script>

<template>
    {{ auth.activeUser?.email }}
    <div class="card card-compact sm:w-96 bg-base-100 shadow-xl mx-auto mt-20">
        <div class="card-body gap-4">
            <p class="text-center mx-auto sm:w-72">
                Please enter your email address and we'll send you a sign in link.
            </p>
            <Textbox v-model="email" :schema="Email" v-model:valid="emailValid" centered />
            <button class="btn block" @click="sendLink">Get sign in link</button>
        </div>
    </div>
    <!-- <div class="card card-compact sm:w-96 bg-base-100 shadow-xl mx-auto mt-20" v-else>
        <div class="card-body gap-4">
            <div>
                <p class="text-center mx-auto sm:w-72">
                    You are signed in with the email address:
                </p> 
                <p class="font-semibold text-center">
                    {{ auth.activeUser.email }}
                </p>
            </div>
            
            <button class="btn block" @click="auth.logout">Sign out</button>
        </div>
    </div> -->
</template>
