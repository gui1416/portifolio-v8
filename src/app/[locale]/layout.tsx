import type React from "react"
import { notFound } from "next/navigation"
import { Inter } from "next/font/google"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-provider"
import { Sidebar } from "@/components/sidebar"
import { SonnerProvider } from "@/components/sonner-provider"
import { routing } from "@/i18n/routing"

import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/app/favicon.ico",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <SidebarProvider>
              <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 p-6 md:p-10 ml-0 lg:ml-20 pt-safe transition-all duration-300 w-full">
                  {children}
                </main>
              </div>
            </SidebarProvider>
            <SonnerProvider />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
