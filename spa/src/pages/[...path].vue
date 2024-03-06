<template>
    <PagePaddedContent>
        <div class="flex flex-col justify-center items-center">
            <h1 class="text-2xl mb-8 text-center w-72 sm:w-auto font-light">
                The resource you have requested does not exist.
            </h1>
            <Button variant="primary" size="lg" icon-left-class="fi fi-ss-home" :action="()=>$router.push({name:'/'})">Home</Button>
        </div>
        
    </PagePaddedContent>
</template>
