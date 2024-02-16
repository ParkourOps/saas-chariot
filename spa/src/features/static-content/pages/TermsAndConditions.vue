<script setup lang="ts">
import TermsAndConditions from "../data/markdown/terms-and-conditions.mdx";
</script>

<template>
    <PageHeader title="Terms and Conditions" :base-route="{ name: 'landing' }" />
    <PagePaddedContent>
        <MarkdownContent hide-title>
            <TermsAndConditions />
        </MarkdownContent>
    </PagePaddedContent>
</template>
