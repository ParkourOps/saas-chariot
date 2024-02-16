<script setup lang="ts">
import PaddedPageLayout from "@/components/layouts/PaddedPageLayout.vue";
import MarkdownContentLayout from "@/components/layouts/MarkdownContentLayout.vue";
import PrivacyPolicy from "@/data/content/markdown/privacy-policy.mdx";
import PageHeaderLayout from "@/components/layouts/PageHeaderLayout.vue";
</script>

<template>
    <PageHeaderLayout title="Privacy Policy" :base-route="{ name: 'landing' }" />
    <PaddedPageLayout>
        <MarkdownContentLayout hide-title>
            <PrivacyPolicy />
        </MarkdownContentLayout>
    </PaddedPageLayout>
</template>
