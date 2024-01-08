<template>
  <div class="w-full flex flex-col overflow-hidden">
    <div class="flex flex-col">
      <div class="p-3 flex flex-col gap-8">
        <!-- Calendar -->
        <div class="space-y-0.5">
          <!-- Months -->
          <div class="grid grid-cols-2 items-center gap-x-3 mx-1.5 pb-3">
            <!-- Prev Button -->
            <!-- div class="col-span-1">
              <button type="button" class="w-8 h-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
            </div -->
            <!-- End Prev Button -->
  
            <!-- Month / Year -->
            <div class="col-span-3 flex justify-center items-center gap-x-1">
              <div class="relative">
                <select v-model="selectedMonth" class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                  <option v-for="month in selectableMonths" :value="month.toISOString()">{{ getMonthLocalized(month) }}</option>
                </select>
              </div>

              <div class="relative">
                <select v-model="selectedYear" class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                  <option v-for="year in selectableYears">{{ year }}</option>
                </select>
              </div>
            </div>
            <!-- End Month / Year -->
  
            <!-- Next Button -->
            <!-- div class="col-span-1 flex justify-end">
              <button type="button" class="opacity-0 w-8 h-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                <svg class="flex-shrink-0 w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div -->
            <!-- End Next Button -->
          </div>
          <!-- Months -->

          <!-- Weeks -->
          <div class="grid grid-cols-7 pb-1.5">
            <span v-for="weekday in weekdays" :key="weekday" class="m-px w-10 block text-center text-sm text-gray-500">
              {{ weekday }}
            </span>
          </div>
          <!-- Weeks -->
  
          <!-- Days -->
          <div class="grid grid-cols-7">
            <!-- Prefix previous month -->
            <div v-for="date in calendar.lastMonth" :key="date.toISOString()">
              <button @click="onDateSelected(date)" type="button" class="calendar-day" :class="isDateToday(date) ? 'today' : ''" disabled>
                {{ date.getDate() }}
              </button>
            </div>

            <!-- Target month -->
            <div v-for="date in calendar.selectedMonth" :key="date.toISOString()">
              <button @click="onDateSelected(date)" type="button" class="calendar-day" :class="isDateToday(date) ? 'today' : ''" :disabled="!isDateEnabled(date)">
                {{ date.getDate() }}
              </button>
            </div>

            <!-- Suffix next month -->
            <div v-for="date in calendar.nextMonth" :key="date.toISOString()">
              <button @click="onDateSelected(date)" type="button" class="calendar-day" :class="isDateToday(date) ? 'today' : ''" disabled>
                {{ date.getDate() }}
              </button>
            </div>
          </div>
        </div>
        <!-- End Calendar -->
      </div>
    </div>
  
    <!-- Footer -->
    <!-- div class="flex justify-end items-center gap-x-2 p-3 border-t dark:border-gray-700">
      <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        Cancel
      </button>
      <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        Apply
      </button>
    </div -->
    <!-- End Footer -->
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<Array<Date>>()
const locale = useLocale().value

// Start with setting todays date with zeroed timestamp.
const today = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
)

function calendarFromDate(date: Date, weekStartsOnSunday: boolean = false) {
  // 1. Get year of a given date
  const year = date.getFullYear();
  // 2. Get month of a given date
  const month = date.getMonth();
  // 3. Get first day of the month
  const firstDay = new Date(year, month, 1).getDay() - (weekStartsOnSunday ? 0 : 1);
  // 4. Get last day of the month
  const lastDay = new Date(year, month + 1, 0).getDate();
  // 5. Number of columns (days) in our 2D array
  const days = 7;
  // 6. Number of rows (weeks) in our 2D array
  const weeks = Math.ceil((firstDay + lastDay) / days);

  // 7. Generate rows (weeks)
  const matrix = Array.from({ length: weeks }).map((_, week) =>
    // 8. Generate columns (days)
    Array.from({ length: days }).map((_, day) => {
      // 9. Convert 2D array index to 1D array index
      const index = week * days + day

      // 10. Get day number, this might be negative or greater that last day in month, which means this day is outside of current month
      const dateDay = index - firstDay + 1;

      // 11. Return day if it's in range, otherwise return 0
      return new Date(year, month, dateDay)
    })
  )

  // Reduce the matrix into a "calendar" object with JS Date's as values.
  return matrix
    .flatMap((week) => week)
    .reduce((c, date) => {
      c.all.push(date)

      // Previous month
      if (date.getFullYear() < year || date.getMonth() < month) {
        c.lastMonth.push(date)
        return c
      }

      // Next month
      if (date.getFullYear() > year || date.getMonth() > month) {
        c.nextMonth.push(date)
        return c
      }

      c.selectedMonth.push(date)
      return c
    }, {
      all: Array<Date>(),
      lastMonth: Array<Date>(),
      selectedMonth: Array<Date>(),
      nextMonth: Array<Date>()
    })
}

const getMonthLocalized = (date: Date): string => {
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date)
}

const isDateToday = (date: Date): boolean => {
  const today = new Date()
  return today.getFullYear() === date.getFullYear()
    && today.getMonth() === date.getMonth()
    && today.getDate() === date.getDate()
}

const isDateEnabled = (date: Date): boolean => {
  return date >= today
}

const selectedMonth = ref(new Date(today.getFullYear(), today.getMonth(), 1).toISOString())
const selectableMonths = Array.from({ length: 12 }).map((_, index) => {
  return new Date(today.getFullYear(), index, 1)
})

const selectedYear = ref(today.getFullYear())
const selectableYears = Array.from({ length: 3 }).map((_, index) => {
  return new Date(today.getFullYear() + index, 0, 1).getFullYear()
})

const calendar = ref(calendarFromDate(new Date(selectedYear.value, new Date(selectedMonth.value).getMonth(), 1)))
const weekdays = calendar.value.all.slice(0, 7).map((date) => {
  return Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date)
})

const onDateSelected = (date: Date) => {
  if (modelValue.value?.includes(date)) {
    const i = modelValue.value?.indexOf(date)
    modelValue.value?.splice(i, 1)
  } else {
    modelValue.value?.push(date)
  }
}

watch([selectedYear, selectedMonth], (yearAndMonth) => {
  calendar.value = calendarFromDate(new Date(yearAndMonth[0], new Date(yearAndMonth[1]).getMonth(), 1))
})
</script>

<style scoped>
.calendar-day {
  @apply m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600;
}

.today {
  @apply border-blue-600;
}
</style>