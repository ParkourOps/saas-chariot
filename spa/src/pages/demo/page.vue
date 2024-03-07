<script setup lang="ts">
import { ref } from 'vue';

    const showLeftSlideInContent = ref(false);
    const showRightSlideInContent = ref(false);
</script>

<template>
    <PageHeader 
        :base-route="{name:'/'}" 
        title="Page" 
        :path="[
            {
                label: 'Demo',
                route: {name: '/demo/'}
            }
        ]" 
    />

    <PageDivider title="This is a page divider." />
    <PageDivider title="This is a page divider." colour="secondary" />
    <PageDivider title="This is a page divider." colour="accent" />

    <PagePaddedWrapper class="hover:bg-accent/20 transition-all">
        <div class="text-center max-w-prose mx-auto ">
            <p>
                This is some content inside page padding.
            </p>
            <p>
                Hover over me to visualise the padding.
            </p>
        </div>
        <PageDivider title="This is a page divider in page padding." />
        <PageDivider title="This is a page divider in page padding." colour="secondary" />
        <PageDivider title="This is a page divider in page padding." colour="accent" />
    </PagePaddedWrapper>

    <PagePaddedWrapper>
        <section title="Page Slide-In Panel Demonstration">
            <CenteredColumn>
                <p class="heading">Page Slide-In Panel</p>
                <p>A page slide-in panel allows content to slide-in from the sides.</p>
                <PageSlideInPanel
                    position="right"
                    width="300px"
                    v-model="showRightSlideInContent"
                >
                    <div class="p-4 flex flex-col gap-4">
                        <p class="text-center">This is some content</p>
                        <StaticAlert type="info">
                            <strong>Responsive:</strong>
                            If you change the width of the viewport below tablet width, this slide-in panel will fill the screen.
                        </StaticAlert>
                    </div>
                </PageSlideInPanel>
                <Button :action="() => showRightSlideInContent = !showRightSlideInContent" label="Toggle" />
            </CenteredColumn>
        </section>
    
    </PagePaddedWrapper>
    <PageEndSpacer/>
</template>

<style scoped></style>