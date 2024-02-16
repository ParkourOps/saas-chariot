<script setup lang="ts">
import useAuth from "@/libraries/firebase/use-auth";
import useBusyCounter from "@/state/use-busy-counter";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
async function goToUserHome() {
    await router.push({ name: "user" });
}
async function goToSignInPage() {
    await router.push({ name: "signIn" });
}

const auth = useAuth();
const busyCounter = useBusyCounter();
const error = ref(false);

onMounted(async () => {
    busyCounter.increment();
    try {
        await auth.signInWithLink.catchLoginAttempt();
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
        busyCounter.decrement();
    }
});
</script>

<template>
    <div class="mt-20">
        <div v-if="!error">
            <p class="text-center text-2xl">Signing in...</p>
        </div>
        <div v-else>
            <p class="text-center text-2xl">Failed to sign in.</p>
        </div>
    </div>
</template>
