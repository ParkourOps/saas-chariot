<!-- MAKE SURE TO ADD THIS TO MAIN VUE COMPONENT (typically: App.vue) -->
<!-- MAKE SURE THERE IS A <div id='modals'></div> UNDER index.html's BODY TAG -->

<script setup lang="ts">
import { modalStack, concludeModal } from "../";

</script>

<template>
    <Teleport to="#modals">
        <component v-for="[id, e] in modalStack" :key="id" :is="e.component" :ref="id" @done="(value?: unknown) => concludeModal(id, value)" v-bind="e.props" />
    </Teleport>
</template>
