<script setup lang="ts"></script>

<template>
    <Modal>
        <template #default="{ done }">
            <p class="mb-2 text-lg font-semibold">Simple Modal</p>
            <p class="mb-8 text-sm">This is a simple modal, it does not return any value back to the invoker.</p>
            <div class="flex justify-end">
                <button class="btn btn-primary" @click="done">Done</button>
            </div>
        </template>
    </Modal>
</template>
