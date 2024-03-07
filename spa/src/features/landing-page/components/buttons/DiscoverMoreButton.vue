<script setup lang="ts">
</script>

<template>
    <div class="flex flex-col items-center my-8">
        <KeyboardButton
            class="font-bold"
            size="xl"
            background-colour="secondary"
            foreground-colour="neutral"
            :action="()=>$router.push({name:'/discover', hash: '#list-of-features', force: true})"
        >
            <div class="flex items-center -mb-1 font-bold font-serif">
                <p class="whitespace-nowrap mr-6">Discover More</p>
                <SvgIcon name="discover" class="h-12" />
            </div>
        </KeyboardButton>
    </div>
</template>