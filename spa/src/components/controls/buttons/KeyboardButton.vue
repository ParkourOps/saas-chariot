<script setup lang="ts">
import type { Action, ControlSize, ThemeColour } from "@/types";
import { useIndicators } from "@/state/indicators";
import { ref } from "vue";
import { computed } from "vue";

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<{
    name?: string,
    backgroundColour?: ThemeColour,
    foregroundColour?: ThemeColour,
    size?: ControlSize,
    fontWeight?: "medium" | "semibold" | "bold" | "extrabold" | "black",
    action?: Action | Action[],
}>();

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
    case "md":
    default:
        return "text-[1.3rem] p-1.5";
    }
});

const indicators = useIndicators();
const _loading = ref();

async function handleAction() {
    if (!props.action) return;
    const token = indicators.registerPendingAction();
    _loading.value = true;
    if (Array.isArray(props.action)) {
        for (const p of props.action) {
            await p();
        }
    } else {
        await props.action();
    }
    _loading.value = false;
    token.unregisterPendingAction();
}
</script>

<template>
    <button class="button"
        :class="[
            {[`bg-${backgroundColour}`] : backgroundColour}
        ]" 
        @click="handleAction"
    >
        <div class="button__content">
            <p class="button__text" 
            :class="[
                {[`bg-${foregroundColour} fill-${foregroundColour}`] : foregroundColour},
                sizeClass
            ]"
            >
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
