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
  title: 'IBA BBA Alumni Directory | University of Dhaka',
  description: 'Search and connect with IBA BBA alumni across the world. Find alumni by name, batch, country, or organization. The official alumni directory for IBA BBA graduates.',
  keywords: 'IBA, BBA, Alumni Directory, University of Dhaka, Business School, IBA Alumni Network, Bangladesh Business School',
  authors: [{ name: 'IBA Alumni Association' }],
  openGraph: {
    title: 'IBA BBA Alumni Directory | University of Dhaka',
    description: 'Connect with IBA BBA alumni worldwide - Search by name, batch, country, or organization',
    type: 'website',
    locale: 'en_US',
    siteName: 'IBA BBA Alumni Directory',
    images: [{
      url: '/thumbnail.jpg', // Correct path to your JPEG thumbnail
      width: 1200,
      height: 630,
      alt: 'IBA BBA Alumni Directory Thumbnail'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IBA BBA Alumni Directory | University of Dhaka',
    description: 'Connect with IBA BBA alumni worldwide - Search by name, batch, country, or organization',
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
