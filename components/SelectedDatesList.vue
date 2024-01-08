<template>
    <div>
        <ul class="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
            <li
                v-for="date in dates"
                :key="date.toISOString()"
                class="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 dark:text-white"
            >
                <div class="flex items-center justify-between w-full px-6">
                    <span>{{ localizedDateString(date) }}</span>
                    <span>#</span>
                </div>
                
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<Array<Date>>()

const dates = computed(() => {
    return modelValue.value?.toSorted((a, b) => {
        return a.getTime() - b.getTime()
    }) ?? []
})

const localizedDateString = (date: Date): string => {
    const displayYear = date.getFullYear() !== new Date().getFullYear()

    return Intl.DateTimeFormat('default', {
        year: displayYear ? 'numeric' : undefined,
        month: 'long',
        day: 'numeric'
    }).format(date)
}
</script>
