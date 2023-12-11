<script setup lang="ts">
</script>

<template>
    <Modal>
        <template #default="{done}">
            <p class="text-lg font-semibold mb-2">Confirmation Modal</p>
            <p class="text-sm mb-8">
                This is a simple input modal. It returns a boolean <code>true</code> or <code>false</code>
                depending on which button is pressed.
            </p>
            <div class="flex justify-end gap-4">
                <button class="btn btn-base-100" @click="done(false)">Cancel</button>
                <button class="btn btn-primary" @click="done(true)">Done</button>
            </div>
        </template>
    </Modal> 
</template>
