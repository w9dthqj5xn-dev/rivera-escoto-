import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import RemoveNetlifyBadge from "@/components/RemoveNetlifyBadge";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
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
    <html lang="es" className={`${inter.variable} ${raleway.variable} h-full antialiased`}>
      <RemoveNetlifyBadge />
      <LayoutShell>{children}</LayoutShell>
    </html>
  );
}

