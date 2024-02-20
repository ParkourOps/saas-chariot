<script setup lang="ts">
import { useAlertStack } from "../state";
import Alert from "./Alert.vue";

const alertStack = useAlertStack();
</script>

<template>
    <div class="fixed top-0 flex w-full flex-col gap-4 p-4 sm:gap-8 sm:p-8" v-if="alertStack.alertStack.length > 0">
        <Alert v-for="a in alertStack.alertStack" :key="a.id" :type="a.type" @dismiss="() => alertStack.pop(a.id)" show>
            <span>{{ a.message }}</span>
        </Alert>
    </div>
</template>
