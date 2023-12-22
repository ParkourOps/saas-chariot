<script setup lang="ts">
    import Page from '@/components/layouts/Page.vue';
import appConfigs from '@/configs/app';
    import { useEmailer } from '@/libraries/use-emailer';
    import { useToastNotifications } from '@/libraries/use-toast-notifications';
    import { useUserProfile } from '@/state/user-profile';

    const emailer = useEmailer();
    const toasts = useToastNotifications();
    const userProfile = useUserProfile();

    async function sendEmail() {
        if (!userProfile.document) return;
        try {
            await emailer.send({
                to: userProfile.document.email,
                from: "admin@parkourops.com",
                subject: "Test Email",
                text: "This is a test email.\n\nSomething.",
            });
            toasts.push({
                title: "Message Sent",
                message: "Please check your inbox.",
                type: "success"
            });
        } catch (e) {
            console.error(e);
            toasts.push({
                title: "Message Not Sent",
                message: "Failed to send email.",
                type: "error"
            });
        }
    }

    async function sendTemplatedEmail() {
        if (!userProfile.document) return;
        try {
            await emailer.sendTemplated({
                to: userProfile.document.email,
                from: "admin@parkourops.com",
                subject: "Test Email",
                text: "This is a test email.\n\nSomething.",
                templateName: "default",
                templateSubstitution: {
                    contentHeader: "Hey there!",
                    htmlContent: `This is a test email.
                                  <br/>
                                  Just a little something...
                                `,
                    appName: appConfigs.appName,
                    appLink: appConfigs.appUrl
                }
            });
            toasts.push({
                title: "Message Sent",
                message: "Please check your inbox.",
                type: "success"
            });
        } catch (e) {
            console.error(e);
            toasts.push({
                title: "Message Not Sent",
                message: "Failed to send email.",
                type: "error"
            });
        }
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
@/libraries/use-emailer/use-emailer