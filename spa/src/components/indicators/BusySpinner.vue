<script setup lang="ts">
    import type { ControlSize, ThemeColour } from '@/types';

    defineProps<{
        colour?: ThemeColour,
        size?: ControlSize
    }>();
</script>

<template>
    <div 
        class="spinner border-[7px] border-[#00000000]"
        :class="[
            {[`border-r-${colour}`]: colour},
            {[`border-r-primary`]: !colour},
            {'size-14': size === 'xs'},
            {'size-16': size === 'sm'},
            {'size-20': !size || size === 'md'},
            {'size-28': size === 'lg'},
            {'size-36': size === 'xl'},
        ]"
    />
</template>

<style scoped lang="scss">
.spinner {
    display: grid;
    // border: 7px solid;
    border-radius: 50%;
    animation: spinner-a4dj62 1s infinite linear;
}

.spinner::before,
.spinner::after {
    content: "";
    grid-area: 1/1;
    margin: 3.5px;
    border: inherit;
    border-radius: 50%;
    animation: spinner-a4dj62 2s infinite;
}

.spinner::after {
    margin: 14px;
    animation-duration: 3s;
}

@keyframes spinner-a4dj62 {
    100% {
        transform: rotate(1turn);
    }
}
</style>
