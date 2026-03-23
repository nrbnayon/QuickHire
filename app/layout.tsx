// app\layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import StoreProvider from "@/redux/StoreProvider";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME || "Your App"}`,
    template: "%s | ",
  },
  description:
    "Streamline your workflow with our intuitive admin panel. Manage users, monitor analytics, and customize settings with ease. Empower your team to make data-driven decisions and optimize performance. Experience the future of administration today.",
  keywords: [
    "Admin Panel",
    "User Management",
    "career",
    ""
  ],
  // PWA Configuration
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon-96x96.png",
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Nayon" }],
  creator: "Nayon",
  publisher: "Nayon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: process.env.NEXT_PUBLIC_APP_NAME || "Your App",
    title: `${process.env.NEXT_PUBLIC_APP_NAME || "Your App"} - Site Panel`,
    description:
      "Streamline your workflow with our intuitive admin panel. Manage users, monitor analytics, and customize settings with ease. Empower your team to make data-driven decisions and optimize performance. Experience the future of administration today.",
    images: [
      {
        url: "/icons/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${process.env.NEXT_PUBLIC_APP_NAME || "Your App"} - Site Panel`,
    description:
      "Streamline your workflow with our intuitive admin panel. Manage users, monitor analytics, and customize settings with ease. Empower your team to make data-driven decisions and optimize performance. Experience the future of administration today.",
    images: ["/icons/logo.png"],
    creator: "@nrbnayon",
  },
  alternates: {
    canonical: "/",
  },
  category: "Software",
  classification: "Modern Web Application",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: process.env.NEXT_PUBLIC_APP_NAME || "Your App",
              applicationCategory: "Dashboard Management System",
              operatingSystem: "Web",
              description:
                "Streamline your workflow with our intuitive admin panel. Manage users, monitor analytics, and customize settings with ease. Empower your team to make data-driven decisions and optimize performance. Experience the future of administration today.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                ratingCount: "1",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-background font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          <StoreProvider>
              {children}
              <Toaster richColors position="top-center" />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
