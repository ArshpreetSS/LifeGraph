import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "LifeGraph — Map your mind. Govern your growth.",
  description:
    "An ambient 3D cognitive operating system. Transform notes, repositories, and learning paths into a living intelligence graph.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#070809] text-white selection:bg-[#D4FF00] selection:text-black">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#070809] antialiased overflow-x-hidden" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        {/* Film grain overlay for premium feel */}
        <div className="noise-overlay" aria-hidden="true" />
        {/* Radial depth vignette */}
        <div className="scene-vignette" aria-hidden="true" />
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
