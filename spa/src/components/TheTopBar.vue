<script setup lang="ts">
import configs from "@/configs";
import {useAuth} from "@/libraries/firebase/auth";

const auth = useAuth();
</script>

<template>
    <div class="flex flex-row items-center justify-between bg-primary p-4 shadow">
        <p class="cursor-pointer text-3xl font-bold text-white" @click="$router.push({ name: '/app' })">
            {{ configs.application.title }}
        </p>
        <Button size="sm" :action="auth.logout" class="opacity-70 hover:opacity-100" icon-left-class="fi fi-ss-leave">SIGN OUT</Button>
    </div>
</template>
