<script setup lang="ts"></script>

<template>
    <Modal>
        <template #default="{ done }">
            <p class="mb-2 text-lg font-semibold">Confirmation Modal</p>
            <p class="mb-8 text-sm">
                This is a simple input modal. It returns a boolean <code>true</code> or
                <code>false</code>
                depending on which button is pressed.
            </p>
            <div class="flex justify-end gap-4">
                <button class="btn-base-100 btn" @click="done(false)">Cancel</button>
                <button class="btn btn-primary" @click="done(true)">Done</button>
            </div>
        </template>
    </Modal>
</template>
