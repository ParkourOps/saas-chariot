<template>
    <PagePaddedWrapper>
        <div class="flex flex-col justify-center items-center gap-6 my-6">
            <h1 class="text-4xl text-center font-bold title">404</h1>
            <h2 class="text-2xl text-center w-80 sm:w-auto font-light pb-5">
                The resource you requested does not exist.
            </h2>
            <Button variant="primary" size="lg" icon-left="fi-ss-home" :action="()=>$router.push({name:'/'})">Home</Button>
        </div>
        
    </PagePaddedWrapper>
    <PageEndSpacer />
</template>
