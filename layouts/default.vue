<template>
    <main class="min-h-screen">
        <div class="container max-w-sm mx-auto p-3">
            <AppHeader />
            <slot />
            <AppFooter />
        </div>
    </main>
</template>

<script setup lang="ts">
useHead({
    bodyAttrs: {
        class: 'bg-slate-100'
    }
})
</script>