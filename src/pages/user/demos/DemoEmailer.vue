<script setup lang="ts">
    import Page from '@/components/layouts/Page.vue';
    import { useEmailer } from '@/libraries/use-emailer';
    const emailer = useEmailer();

    async function sendEmail() {
        const reply = await emailer.send({
            to: "tejbirring@gmail.com",
            from: "admin@parkourops.com",
            subject: "Test Email",
            text: "This is a test email.\n\nSomething.",
        });
        
    }

    async function sendTemplatedEmail() {
        const reply = await emailer.sendTemplated({
            to: "tejbirring@gmail.com",
            from: "admin@parkourops.com",
            subject: "Test Email",
            text: "This is a test email.\n\nSomething.",
            templateName: "default",
            templateSubstitution: {
                contentHeader: "Hi, Tej!",
                htmlContent: "This is a test email.<br/>Something.",
                appName: "SaaS Chariot"
            }
        });
        
    }
</script>


<template>
    <Page>
        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    Text Email
                </p>
                <p class="mb-4">
                    
                </p>                
                <button class="btn btn-secondary" @click="sendEmail">SHOW</button>
            </div>
        </div>

        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <p class="text-xl font-bold">
                    HTML Email
                </p>
                <p class="mb-4">
                    
                </p>                
                <button class="btn btn-secondary" @click="sendTemplatedEmail">SHOW</button>
            </div>
        </div>

    </Page>
</template>
