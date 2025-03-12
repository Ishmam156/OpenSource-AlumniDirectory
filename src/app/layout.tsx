import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'University Alumni Directory',
  description: 'Search and connect with university alumni across the world. Find alumni by name, batch, country, or organization. The official alumni directory for graduates.',
  keywords: 'Alumni Directory, University, Higher Education, Alumni Network, Academic Institution',
  authors: [{ name: 'Alumni Association' }],
  openGraph: {
    title: 'University Alumni Directory',
    description: 'Connect with university alumni worldwide - Search by name, batch, country, or organization',
    type: 'website',
    locale: 'en_US',
    siteName: 'University Alumni Directory',
    images: [{
      url: '/thumbnail.jpg', // Correct path to your JPEG thumbnail
      width: 1200,
      height: 630,
      alt: 'IBA BBA Alumni Directory Thumbnail'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'University Alumni Directory',
    description: 'Connect with university alumni worldwide - Search by name, batch, country, or organization',
    images: ['/thumbnail.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
