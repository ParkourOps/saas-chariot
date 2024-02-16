<script setup lang="ts">
import PrivacyPolicy from "../data/markdown/privacy-policy.mdx";
</script>

<template>
    <PageHeader title="Privacy Policy" :base-route="{ name: 'landing' }" />
    <PagePaddedContent>
        <MarkdownContent hide-title>
            <PrivacyPolicy />
        </MarkdownContent>
    </PagePaddedContent>
</template>
