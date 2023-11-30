<script setup lang="ts">
    defineProps<{
        emailAddress: string
    }>();
</script>

<template>
    <Modal #default="{hideModal}">
        <div class="mb-4">
            <p>This is a test modal.</p>
            <p>Your email address is: {{ emailAddress }}</p>
        </div>
        <div class="flex flex-row justify-end">
            <button class="btn" @click="hideModal">Close</button>
        </div>
    </Modal>
</template>