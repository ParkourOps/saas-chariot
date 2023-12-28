<script setup lang="ts">
    import { onMounted } from 'vue';
    import Spinner from '../ui/Spinner.vue';
    
    const props = defineProps<{
        title: string,
        instruction: string,
        mountAction?: ()=>void
    }>();

    onMounted(props.mountAction ? props.mountAction : ()=>{});
</script>

<template>
    <Modal modalClasses="bg-info">
        <template #default="{}">
            <p class="text-xl font-semibold mb-4 text-center text-primary">{{ title }}</p>
            <p class="text-center text-base-content/80">{{ instruction }}</p>
            <Spinner class="mx-auto mt-14 mb-8"/>
        </template>
    </Modal> 
</template>
