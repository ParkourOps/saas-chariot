<script setup lang="ts">
import TermsAndConditions from "@/data/markdown/terms-and-conditions.mdx";
</script>

<template>
    <PageHeader title="Terms and Conditions" :base-route="{ name: '/' }" />
    <PagePaddedWrapper end-of-page>
        <Markdown hide-title>
            <TermsAndConditions />
        </Markdown>
    </PagePaddedWrapper>
    <PageEndSpacer/>
</template>
