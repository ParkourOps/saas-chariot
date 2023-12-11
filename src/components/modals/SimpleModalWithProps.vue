<script setup lang="ts">
    const props = defineProps<{
        name: string
    }>();
</script>

<template>
    <Modal>
        <template #default="{done}">
            <p class="text-lg font-semibold mb-2">Hello, {{ name }},</p>
            <p class="text-sm mb-8">This is a simple modal, it does not return any value back to the invoker.</p>
            
            <div class="flex justify-end">
                <button class="btn btn-primary" @click="done">Done</button>
            </div>
        </template>
    </Modal> 
</template>