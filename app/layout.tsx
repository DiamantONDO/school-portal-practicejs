import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "School Portal",
  description: "Next.js frontend for the school portal API",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-serif"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-black">
        {/* AuthProvider must wrap everything so any page can call useAuth() */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
