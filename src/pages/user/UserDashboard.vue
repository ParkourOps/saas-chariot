<script setup lang="ts">
import Page from '@/components/layouts/Page.vue';
import { useAuth } from '@/libraries/firebase/use-auth';
import { useUserProfile } from '@/state/user-profile';
import readableDateTime from '@/utilities/readableDateTime';
    
    const auth = useAuth();
    const userProfile = useUserProfile();
</script>

<template>
    <Page>
    
        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    User Information
                </p>
                <p>
                    A demonstration of user information retrieval directly from
                    the auth token <em>and</em> realtime user information retrieval from the database.
                </p>
                <button class="mt-4 btn btn-primary" @click="$router.push({name:'user-profile'})">SEE DEMO</button>
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
                <button class="mt-4 btn btn-primary" @click="$router.push({name:'user-notifications'})">SEE DEMO</button>
            </div>
        </div>

        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    Modals
                </p>
                <p>
                    A demonstration of ephemeral, on-demand pop-up modals and prompts.
                </p>
                <button class="mt-4 btn btn-primary" @click="$router.push({name:'user-modals'})">SEE DEMO</button>
            </div>
        </div>


        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    Menus
                </p>
                <p>
                    A demonstration of menus.
                </p>
                <button class="mt-4 btn btn-primary" @click="$router.push({name:'user-menus'})">SEE DEMO</button>
            </div>
        </div>
    </Page>
</template>
