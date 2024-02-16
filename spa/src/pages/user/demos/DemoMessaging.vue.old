<script setup lang="ts">
    import Card from '@/components/layouts/Card.vue';
    import Page from '@/components/layouts/Page.vue';
    import appConfigs from '@/configs/app';
    import { useMessaging } from '@/libraries/use-messaging';
    import { useToastNotifications } from '@/libraries/use-toast-notifications';
    import { useUserProfile } from '@/state/user-profile';

    const messaging = useMessaging();
    const toasts = useToastNotifications();
    const userProfile = useUserProfile();

    async function sendTextOnlyEmail() {
        if (!userProfile.document) return;
        try {
            await messaging.email.sendTextOnlyEmail({
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
            await messaging.email.sendTemplatedEmail({
                to: userProfile.document.email,
                from: "admin@parkourops.com",
                subject: "Test Email",
                text: "This is a test email.\n\nSomething.",
                templateName: "default",
                templateSubstitutions: {
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
        <Card class="max-w-sm mx-auto">
            <p class="text-lg font-semibold text-primary">
                Text Email
            </p>
            <div class="divider" />
            <button class="btn btn-secondary" @click="sendTextOnlyEmail">SHOW</button>
        </Card>

        <Card class="max-w-sm mx-auto">
            <p class="text-lg font-semibold text-primary">
                HTML Email
            </p>
            <div class="divider" />
            <button class="btn btn-secondary" @click="sendTemplatedEmail">SHOW</button>
        </Card>
    </Page>
</template>
