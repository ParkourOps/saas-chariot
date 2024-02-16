<script setup lang="ts">
    import ErrorIcon from '@/assets/icons/ErrorIcon.vue';
    import Dropdown from '@/components/form/Dropdown.vue';
    import Numberbox from '@/components/form/Numberbox.vue';
    import Card from '@/components/layouts/Card.vue';
    import Drawer from '@/components/layouts/Drawer.vue';
    import Page from '@/components/layouts/Page.vue';
    import { ref } from 'vue';
    import { z } from 'zod';

    const show = ref(false);

    const menuWidth = ref(300);
    const menuWidthValid = ref(false);

    const position = ref<'left' | 'right'>("left");
</script>

<template>
    <Page>
        <Card class="max-w-sm mx-auto">
            <p class="text-lg font-semibold text-primary">
                Drawer
            </p>
                
            <div class="divider" />
                
            <Dropdown
                button-class="btn-accent w-full"
                label="Select an Option" 
                :options="['left', 'right']"
                v-model="position"
            >
                <template #unselected>
                    Select Position
                </template>
                <template #selected="{option}">
                    <p>{{ option }}</p>
                </template>
                <template #default="{option}">
                    <p>{{ option }}</p>
                </template>
            </Dropdown>

            <div>
                <p class="text-sm mb-1 opacity-50">Width (in pixels)</p>
                <Numberbox class="w-full" v-model="menuWidth" :schema="z.number().int().gt(0)" v-model:valid="menuWidthValid" />
            </div>

            <div class="divider" />
                
            <button class="btn btn-secondary disabled:bg-error/50" @click="show = !show" :disabled="!menuWidthValid">
                <ErrorIcon v-if="!menuWidthValid"/>
                <span v-if="!menuWidthValid">PLEASE ENTER A VALID WIDTH ABOVE</span>
                <span v-else>SHOW</span>

            </button>
        </Card>
    </Page>

    <!-- Menu -->
    <Drawer v-model="show" :width="`${menuWidth}px`" :position="position">
        <div class="p-6 text-center opacity-50">
            Something Here?
        </div>
    </Drawer>
</template>
