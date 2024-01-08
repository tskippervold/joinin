import type { Ref } from 'vue'

export const useLocale = () => useState<string>('locale', () => useDefaultLocale().value)

export const useDefaultLocale = (fallback = 'en-US') => {
    const locale = ref(fallback)

    if (process.server) {
        const requestLocale = useRequestHeaders()['accept-language']?.split(',')[0]
        
        if (requestLocale) {
            locale.value = requestLocale
        }
        
        console.log('Server locale', requestLocale)
    } else if (process.client) {
        const navigatorLanguage = navigator.language

        if (navigatorLanguage) {
            locale.value = navigatorLanguage
        }
        
        console.log('Browser locale', navigatorLanguage)
    }

    return locale
}
