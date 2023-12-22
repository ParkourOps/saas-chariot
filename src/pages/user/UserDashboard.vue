<script setup lang="ts">
    import Page from '@/components/layouts/Page.vue';
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
                <button class="mt-4 btn btn-primary" @click="$router.push({name:'user-demo-profile'})">SEE DEMO</button>
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
                <button class="mt-4 btn btn-primary" @click="$router.push({name:'user-demo-notifications'})">SEE DEMO</button>
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
                <button class="mt-4 btn btn-primary" @click="$router.push({name:'user-demo-modals'})">SEE DEMO</button>
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
                <button class="mt-4 btn btn-primary" @click="$router.push({name:'user-demo-menus'})">SEE DEMO</button>
            </div>
        </div>

        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    Emailer
                </p>
                <p>
                    A demonstration of transactional emailer.
                </p>
                <button class="mt-4 btn btn-primary" @click="$router.push({name:'user-demo-emails'})">SEE DEMO</button>
            </div>
        </div>
    </Page>
</template>
