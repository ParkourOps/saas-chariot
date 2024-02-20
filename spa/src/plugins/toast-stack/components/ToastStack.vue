<script setup lang="ts">
import {useToastStack} from "../state";
const toastStack = useToastStack();
</script>

<template>
        <div class="toast toast-end toast-top cursor-pointer">
        <div
            v-for="n in toastStack.toastStack"
            :key="n.id"
            :class="[
                `alert shadow-2xl`,
                { 'alert-info': n.type === 'info' },
                { 'alert-success': n.type === 'success' },
                { 'alert-warning': n.type === 'warning' },
                { 'alert-error': n.type === 'error' },
                {
                    'bg-base-100': n.type && !['info', 'success', 'warning', 'error'].includes(n.type),
                },
            ]"
            @click="toastStack.pop(n.id)"
        >
            <div>
                <p class="text-sm font-semibold">{{ n.title }}</p>
                <p>{{ n.message }}</p>
            </div>
        </div>
    </div>
</template>
