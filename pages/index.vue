<template>
    <div class="flex flex-col gap-y-6">
        <div class="bg-white rounded-xl shadow-lg">
            <InlineDatePicker v-model="selectedDates" />
        </div>

        <div v-if="selectedDates.length > 0" class="bg-white rounded-xl shadow-lg">
            <SelectedDatesList v-model="selectedDates" />
        </div>
    </div>
</template>

<script setup lang="ts">
const selectedDates = ref<Array<Date>>([])
</script>