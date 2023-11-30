<script setup lang="ts">
import { useAuth } from '@/libraries/firebase';
import { useBusyStatus } from '@/state/busy-status';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

    const router = useRouter();
    async function goToUserHome() {
        await router.push({name: 'user'});
    }
    async function goToSignInPage() {
        await router.push({name: 'getSignInLink'});
    }

    const auth = useAuth();
    const busyStatus = useBusyStatus();
    const error = ref(false);

    onMounted(async ()=>{
        busyStatus.increment();
        try {
            await auth.catchLoginAttempt();
            await goToUserHome();
        } catch (e) {
            console.error(e);
            if (!auth.activeUser) {
                error.value = true;
                await goToSignInPage();
            } else {
                // rescue the app if user is still signed in from previous attempt
                await goToUserHome();
            }
        } finally {
            busyStatus.decrement();
        }
    })
</script>

<template>
    <div class="mt-20">
        <div v-if="!error">
            <p class="text-2xl text-center">
                Signing in...
            </p>
        </div>
        <div v-else>
            <p class="text-2xl text-center">
                Failed to sign in.
            </p>
        </div>
    </div>
</template>