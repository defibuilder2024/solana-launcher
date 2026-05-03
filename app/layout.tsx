import type { Metadata } from "next"
import { JetBrains_Mono, Manrope } from "next/font/google"
import { DemoBanner } from "@/components/demo-banner"
import { Providers } from "@/components/providers"
import { TopBar } from "@/components/top-bar"
import { Toaster } from "@/components/ui/toast"
import { ConfirmHost } from "@/components/ui/confirm"
import { chain } from "@/lib/chain"
import { suiteItem } from "@/lib/suite"
import "./globals.css"

const sans = Manrope({ subsets: ["latin"], variable: "--font-app-sans" })
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-app-mono" })

const DESCRIPTION = `${(chain as { description?: string }).description ?? `${(chain as { features?: { sameBlock?: boolean } }).features?.sameBlock ? "Launch, bundle and trade" : "Launch and trade"} ${chain.launchpad} coins with Trench Launcher`}${process.env.NEXT_PUBLIC_DEMO === "1" ? ", from your browser" : ""}.`
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? suiteItem(chain.suiteId)?.url ?? "http://localhost:3000"),
  openGraph: { type: "website", siteName: "Trench Launcher", title: `${chain.appName} · Trench Launcher`, description: DESCRIPTION, images: [{ url: "/og.png", width: 1280, height: 640, alt: `${chain.appName} · Trench Launcher` }] },
  twitter: { card: "summary_large_image", title: `${chain.appName} · Trench Launcher`, description: DESCRIPTION, images: ["/og.png"] },
  title: { default: `${chain.appName} · Trench Launcher`, template: `%s · ${chain.appName}` },
  description: DESCRIPTION,
  icons: { icon: "/icon.svg" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-background text-foreground min-h-dvh font-sans antialiased">
        <Providers>
          <TopBar />
          <DemoBanner />
          <main className="mx-auto w-full max-w-6xl px-3 py-3 sm:px-6 sm:py-6">{children}</main>
          <Toaster />
          <ConfirmHost />
        </Providers>
      </body>
    </html>
  )
}
