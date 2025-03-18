import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Djimmy Poliard | Full-Stack Software Developer",
  description:
    "Full-stack Developer with 8+ years of experience building scalable web applications and internal tools that drastically improve efficiency.",
    icons: {
      icon: "/favicon.ico", // This points to the favicon in your public folder
    },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Explicitly adding the favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Alternatively, if you're using a PNG */}
        {/* <link rel="icon" href="/favicon.png" type="image/png" /> */}
        
        <meta name="image" property="og:image" content={'/favicon/android-chrome-192x192.png'} key="image" />
        <meta property="og:image:width" content="300" key="og:image:width" />
        <meta property="og:image:height" content="300" key="og:image:height" />
      
      </head>
      
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'