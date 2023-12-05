<script setup lang="ts">
import { useAuth } from '@/libraries/firebase/use-auth';
import { useUserProfile } from '@/state/user-profile';
import readableDateTime from '@/utilities/readableDateTime';
    
    const auth = useAuth();
    const userProfile = useUserProfile();
</script>

<template>
    <div class="max-w-prose mx-auto mt-12 px-4 sm:px-0 flex flex-col gap-12">
        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    User Information
                </p>
                <p>
                    A demonstration of user information retrieval directly from
                    the auth token <em>and</em> realtime user information retrieval from the database.
                </p>
                <button class="mt-4 btn btn-secondary" @click="$router.push({name:'user-profile'})">SEE DEMO</button>
            </div>
        </div>

        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    Notifications
                </p>
                <p>
                    A demonstration of toasts and pop-up alerts.
                </p>
                <button class="mt-4 btn btn-secondary" @click="$router.push({name:'user-notifications'})">SEE DEMO</button>
            </div>
        </div>

        <p class="mb-4">
            
        </p>
    </div>
</template>
