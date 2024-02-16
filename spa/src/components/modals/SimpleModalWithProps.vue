<script setup lang="ts">
defineProps<{
    name: string;
}>();
</script>

<template>
    <Modal>
        <template #default="{ done }">
            <p class="mb-2 text-lg font-semibold">Hello, {{ name }},</p>
            <p class="mb-8 text-sm">This is a simple modal, it does not return any value back to the invoker.</p>

            <div class="flex justify-end">
                <button class="btn btn-primary" @click="done">Done</button>
            </div>
        </template>
    </Modal>
</template>
