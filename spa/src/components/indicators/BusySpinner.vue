<template>
    <div class="spinner border-[7px] border-[#00000000] border-r-white"></div>
</template>

<style scoped lang="scss">
.spinner {
    width: 88px;
    height: 88px;
    display: grid;
    // border: 7px solid;
    border-radius: 50%;
    // border-right-color: ; // oklch(var(--p));
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
