import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Bajeko Sekuwa — Authentic Nepalese Cuisine",
  description: "Savoring the original taste of Nepalese charcoal-grilled delicacies and Himalayan spices.",
  icons: {
    icon: "/icon.jpg",
  },
};

import LocationInitializer from "@/components/layout/LocationInitializer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${plusJakartaSans.variable} bg-white text-gray-900 font-body`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <LocationInitializer />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
