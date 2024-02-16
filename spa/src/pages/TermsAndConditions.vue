<script setup lang="ts">
import PaddedPage from "@/components/layouts/PaddedPage.vue";
import MarkdownContent from "@/components/layouts/MarkdownContent.vue";
import TermsAndConditions from "@/data/content/markdown/terms-and-conditions.mdx";
import PageHeader from "@/components/layouts/PageHeader.vue";
</script>

<template>
    <PageHeader title="Terms and Conditions" :base-route="{ name: 'landing' }" />
    <PaddedPage>
        <MarkdownContent hide-title>
            <TermsAndConditions />
        </MarkdownContent>
    </PaddedPage>
</template>
