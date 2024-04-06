
export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('Creating a new calendar if needed')

    const { data } = await useFetch('/api/calendar', { method: 'POST' })
    const calendarId = unref(data)?.id

    if (!calendarId) {
        // TODO: Handle this? Display error page perhaps..
        return
    }

    return await navigateTo(`/${calendarId}`)
})
