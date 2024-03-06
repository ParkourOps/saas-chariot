<script setup lang="ts">
import PrivacyPolicy from "@/data/markdown/privacy-policy.mdx";
</script>

<template>
    <PageHeader title="Privacy Policy" :base-route="{ name: '/' }" />
    <PagePaddedWrapper end-of-page>
        <Markdown hide-title>
            <PrivacyPolicy />
        </Markdown>
    </PagePaddedWrapper>
</template>
