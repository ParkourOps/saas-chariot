<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getResourceInfo } from "../index";
import { watch } from 'vue';

    const props = defineProps<{
        resourceKey: string,
    }>();

    const response = ref<Awaited<ReturnType<typeof getResourceInfo>>["result"]>();
    onMounted(async ()=>{
        response.value = (await getResourceInfo({
            resourceKey: props.resourceKey,
        })).result;
    });

    function loadImage(url: string) {
        return new Promise<string>((resolve)=>{
            const img = new Image();
            img.src = url;
            img.onload = ()=>{
                resolve(img.src);
            }
        });
    }

    function loadImages(urls: string[]) {
        return Promise.all(
            urls.map((url) => loadImage(url))
        );
    }

    const info = computed(()=>{
        if (response.value?.type === "not_found") {
            return null; // not found state
        }
        if (response.value?.type === "found") {
            return {
                title: response.value.title,
                description: response.value.description,
                thumbnails: response.value.thumbnails,
            }
        } else {
            return undefined; // waiting state or error state
        }
    });

    const loadedThumbnails = ref<string[]>();
    watch(info, async (i)=>{
        if (i?.thumbnails) {
            loadedThumbnails.value = await loadImages(i.thumbnails);
        }
    })
</script>

<template>
    <slot v-if="info" :title="info.title" :description="info.description" :thumbnails="loadedThumbnails" />
    <slot v-if="info === undefined" name="loading" />
    <slot v-if="info === null" name="error" />
</template>
