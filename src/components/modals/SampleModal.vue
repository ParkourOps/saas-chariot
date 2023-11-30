<script setup lang="ts">
    import {useUserProfile} from '@/state/user-profile';
    
    defineProps<{
        emailAddress: string
    }>();

    const userProfile = useUserProfile();
</script>

<template>
    <Modal #default="{hideModal}">
        <div class="mb-4">
            <p>This is a test modal.</p>
            <p>Your email address is: {{ emailAddress }}</p>
        </div>
        
        <div class="card shadow-xl max-w-sm mx-auto mb-10 overflow-hidden">
            <div class="card-body">
                {{ userProfile.document }}
            </div>
        </div>

        <div class="flex flex-row justify-end">
            <button class="btn" @click="hideModal">Close</button>
        </div>
    </Modal>
</template>