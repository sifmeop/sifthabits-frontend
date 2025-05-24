import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

const locales = ['en', 'ru']

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  let locale = cookieStore.get('lang')?.value ?? 'en'

  if (!locales.includes(locale)) {
    locale = 'en'
  }

  return {
    locale,
    messages: (await import(`../../locale/${locale}.json`)).default
  }
})
