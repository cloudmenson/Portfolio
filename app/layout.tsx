import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Montserrat, Space_Grotesk } from "next/font/google";

import { SITE } from "@/shared/config/site";
import {
  EasterEggs,
  ToastProvider,
  CustomCursor,
  ThemeProvider,
  LenisProvider,
  ScrollProgress,
  CommandPalette,
  themeInitScript,
  AnimatedBackground,
} from "@/shared";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  keywords: [
    "front-end developer",
    "react developer",
    "next.js",
    "typescript",
    "portfolio",
    "Danylo Hrytsenko",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    locale: SITE.locale,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06090a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7f6" },
  ],
};

/** Structured data so search engines can render a rich person result. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.role,
  description: SITE.description,
  sameAs: [
    "https://github.com/cloudmenson",
    "https://www.linkedin.com/in/hrytsenko-danylo/",
    "https://t.me/cloudmenson",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Runs before paint so the stored theme is applied without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>

      <body
        suppressHydrationWarning
        className={`${montserrat.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ToastProvider>
            <LenisProvider>
              <AnimatedBackground />
              <ScrollProgress />
              <CustomCursor />
              <CommandPalette />
              <EasterEggs />

              {children}
            </LenisProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
