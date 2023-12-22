<script setup lang="ts">
import Textbox from '@/components/form/Textbox.vue';
import { useAuth } from '@/libraries/firebase/use-auth';
import { ref } from 'vue';
import Email from "@m/Email";
import Password from "@m/Password"; 
import { usePopupAlerts } from '@/libraries/use-popup-alerts';
import { useBusyStatus } from '@/state/busy-status';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'vue-router';
    
    const router = useRouter();
    const auth = useAuth();
    const alerts = usePopupAlerts();
    const busyStatus = useBusyStatus();

    const signInOption = ref<"password" | "link">("password");

    const email = ref("");
    const emailValid = ref(false);

    const password = ref("");
    const passwordValid = ref(false);

    function userEmailValid() {
        if (!emailValid.value) {
            alerts.push({
                type: "error",
                message: "Please check that your email address is valid.",
                autoDismiss: true
            });
            return false;
        } else {
            return true;
        }
    }

    function userPasswordValid() {
        if (!passwordValid.value) {
            alerts.push({
                type: "error",
                message: "Please check password. A valid password must be at least 6 characters long and contain a lowercase letter (a-z), an uppercase letter (A-Z), a number (0-9), and a symbol.",
                autoDismiss: true
            });
            return false;
        } else {
            return true;
        }
    }

    async function sendLink() {
        if (!userEmailValid()) {
            return;
        }
        else {
            busyStatus.increment();
            await auth.signInWithLink.sendLoginLink(email.value, {name: "processSignIn"});
            busyStatus.decrement();
            alerts.push({
                type: "info",
                message: "Please check your inbox for a sign in link."
            })
        }
    }

    async function signInWithPassword() {
        if (!userEmailValid() || !userPasswordValid()) {
            return;
        }
        try {
            busyStatus.increment();
            await auth.signInWithPassword.signInWithPassword(email.value, password.value);
            await router.push({name: 'selectProject'});
        } catch (e) {
            console.error(e);
            if (e instanceof FirebaseError && e.code === 'auth/invalid-credential') {
                alerts.push({
                    type: "error",
                    message: "Incorrect email address or password.",
                    autoDismiss: true
                });
            }
        } finally {
            busyStatus.decrement();
        }
    }

    async function signUpWithPassword() {
        if (!userEmailValid() || !userPasswordValid()) {
            return;
        }
        try {
            busyStatus.increment();
            await auth.signInWithPassword.createUserWithPassword(email.value, password.value);
            await router.push({name: 'selectProject'});
        } catch (e) {
            console.error(e);
            if (e instanceof FirebaseError && e.code === 'auth/email-already-in-use') {
                alerts.push({
                    type: "error",
                    message: "An account with this email address already exists. If attempting to sign in with password for the first time, please click 'Forgot password?' to set a password."
                });
            }
        } finally {
            busyStatus.decrement();
        }        
    }

    async function resetPassword() {
        if (!userEmailValid()) {
            return;
        }
        busyStatus.increment();
        await auth.signInWithPassword.sendPasswordResetLink(email.value);
        busyStatus.decrement();
        alerts.push({
            type: "info",
            message: "Please check your inbox for a password reset link.",
            autoDismiss: true
        });
    }
</script>

<template>
    <div class="card card-compact rounded-t-none sm:rounded-t-2xl sm:w-96 shadow-xl mx-auto sm:mt-20 bg-neutral glass">
        <figure class="pt-6 px-6 pb-1">
            <img src="@/assets/images/logo.png" alt="The 'SaaS Champion' Logo" />
        </figure>

        <div class="join rounded-none mb-4 justify-around py-2">
            <input class="join-item btn btn-outline btn-primary" type="radio" name="sign-in-options" aria-label="Sign In with Password" v-model="signInOption" value="password"/>
            <input class="join-item btn btn-outline btn-primary" type="radio" name="sign-in-options" aria-label="Sign In with Link" v-model="signInOption" value="link"/>
        </div>

        <div class="card-body gap-4" v-if="signInOption === 'link'">
            <p class="text-center mx-auto sm:w-72 text-lg leading-snug max-w-xs">
                    Please enter your email address and we'll send you a sign in link.
                </p>

                <div>
                    <p class="text-sm mb-1 opacity-50 text-center">Email Address</p>
                    <Textbox v-model="email" :schema="Email" v-model:valid="emailValid" centered class="bg-opacity-80 font-medium tracking-wider mb-4 w-full" />
                </div>
                
                
                <button class="btn btn-primary block" @click="sendLink">GET SIGN IN LINK</button>
        </div>

        <div class="card-body gap-4" v-else-if="signInOption === 'password'">
            <p class="text-center mx-auto sm:w-72 text-lg leading-snug max-w-xs">
                Please enter your email address and password to sign up or sign in.
            </p>

            <div>
                <p class="text-sm mb-1 opacity-50 text-center">Email Address</p>
                <Textbox v-model="email" :schema="Email" v-model:valid="emailValid" centered class="bg-opacity-80 font-medium tracking-wider w-full" />
            </div>
            
            <div class="flex flex-col">
                <p class="text-sm mb-1 opacity-50 text-center">Password</p>
                <Textbox v-model="password" :schema="Password" v-model:valid="passwordValid" centered class="bg-opacity-80 font-medium tracking-wider" type="password" />
                <button class="btn btn-sm btn-link ml-auto" @click="resetPassword">Forgot password?</button>
            </div>

            <div class="flex w-full gap-4">
                <button class="btn btn-primary btn-outline grow" @click="signUpWithPassword">CREATE ACCONT</button>
                <button class="btn btn-primary grow" @click="signInWithPassword">SIGN IN</button>
            </div>
        </div>


    </div>
</template>
