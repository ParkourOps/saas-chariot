<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    variant?: "neutral" | "base" | "accent" | "primary" | "secondary";
    size?: "xs" | "sm" | "base" | "lg" | "xl";
    fontWeight?: "medium" | "semibold" | "bold" | "extrabold" | "black";
}>();

const bgColourClass = computed(() => {
    switch (props.variant) {
    case "base":
        return "bg-base-100";
    case "neutral":
        return "bg-neutral";
    case "accent":
        return "bg-accent";
    case "primary":
        return "bg-primary";
    case "secondary":
        return "bg-secondary";
    default:
        return "bg-base-100";
    }
});

const txtColourClass = computed(() => {
    switch (props.variant) {
    case "base":
        return "bg-secondary";
    case "neutral":
        return "bg-secondary";
    case "accent":
        return "bg-neutral";
    case "primary":
        return "bg-base-100";
    case "secondary":
        return "bg-base-100";
    default:
        return "bg-secondary";
    }
});

const sizeClass = computed(() => {
    switch (props.size) {
    case "xs":
        return "text-[1rem] p-0.5";
    case "sm":
        return "text-[1.3rem] p-0.5";
    case "lg":
        return "text-[1.55rem] p-2";
    case "xl":
        return "text-[1.85rem] p-3";
    case "base":
    default:
        return "text-[1.3rem] p-1.5";
    }
});
</script>

<template>
    <button class="button" :class="[bgColourClass]">
        <div class="button__content">
            <p class="button__text font-bold" :class="[txtColourClass, sizeClass]">
                <slot />
            </p>
        </div>
    </button>
</template>

<style scoped lang="scss">
* {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

.button {
    display: block;
    position: relative;
    flex-shrink: 0;
    outline: none;

    // base shadow
    border: 2px solid #888888;

    border-radius: 20px;
    transition: 0.13s ease-in-out;
    cursor: pointer;
    &:active {
        box-shadow: none;
        .button__content {
            box-shadow: none;
            .button__text,
            .button__icon {
                transform: translate3d(0px, 0px, 0px);
            }
        }
    }
    &__content {
        padding: 0.55rem 1rem;

        box-shadow:
            inset 0px -4px 0px #00000022,
            0px -4px 0px #ffffff;
        border-radius: 20px;
        transition: 0.13s ease-in-out;

        z-index: 1;
    }

    &__text {
        position: relative;

        transform: translate3d(0px, -4px, 0px);

        text-align: center;
        color: transparent;
        text-shadow: 2px 2px 3px #ffffff44;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        transition: 0.13s ease-in-out;
    }
}
</style>
