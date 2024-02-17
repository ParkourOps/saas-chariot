<script setup lang="ts">
import configs from "@/configs";
import { computed } from "vue";
import { useRoute, type RouteLocationRaw } from "vue-router";
const route = useRoute();

type PathSegment = {
    label: string;
    route: RouteLocationRaw;
};

type PageAction = {
    label: string;
    action: (...args: unknown[]) => unknown | Promise<unknown>;
    iconClass?: string;
    main?: boolean;
};

const props = defineProps<{
    title: string;
    path?: PathSegment[];
    baseRoute: RouteLocationRaw;
    actions?: PageAction[];
}>();

const firstSegment: PathSegment = {
    label: configs.application.title,
    route: props.baseRoute,
};

const lastSegment: PathSegment = {
    label: props.title,
    route,
};

const fullPath: PathSegment[] = [firstSegment, ...(props.path ?? []), lastSegment];

const backSegment = computed(() => {
    const lastIdx = fullPath.length - 1;
    const goToIdx = lastIdx - 1 >= 0 ? lastIdx - 1 : 0;
    return fullPath[goToIdx];
});
</script>

<template>
    <div class="border-b p-8">
        <div>
            <nav class="sm:hidden" aria-label="Back">
                <RouterLink :to="backSegment.route" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                    <svg class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>
                    Back
                </RouterLink>
            </nav>
            <nav class="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" class="flex items-center space-x-4">
                    <li v-for="(segment, segmentIdx) in fullPath" :key="`breadcrumb-segment-#${segmentIdx}`">
                        <div class="flex">
                            <div class="flex items-center">
                                <svg v-if="segmentIdx > 0" class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                                <RouterLink :to="segment.route" class="text-sm font-medium text-gray-500 hover:text-gray-700" :class="{ 'ml-4': segmentIdx > 0 }">
                                    {{ segment.label }}
                                </RouterLink>
                            </div>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
            <div class="min-w-0 flex-1">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-ellipsis sm:text-3xl sm:tracking-tight">
                    {{ title }}
                </h2>
            </div>
            <div class="mt-4 flex flex-shrink-0 flex-wrap gap-3 md:ml-4 md:mt-0 md:gap-4" v-if="actions">
                <button v-for="(action, actionIdx) in actions" :key="`page-action-${actionIdx}`" class="btn btn-sm shadow-sm sm:btn-md" :class="[{ 'bg-white hover:bg-gray-50': !action.main }, { 'btn-primary': action.main }]">
                    <i v-if="action.iconClass" class="leading-none" :class="action.iconClass" />
                    {{ action.label }}
                </button>
            </div>
        </div>
    </div>
</template>
