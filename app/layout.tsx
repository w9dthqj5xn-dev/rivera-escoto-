import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rivera Escoto y Asociados SRL | Ingeniería Eléctrica y Electromecánica",
  description:
    "Empresa especializada en instalaciones eléctricas para sectores residenciales y técnicos. Soluciones eléctricas confiables y seguras.",
  keywords: "instalaciones eléctricas, energía eléctrica, electromecánica, residencial, técnico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

