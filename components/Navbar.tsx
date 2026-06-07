"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Zap className="text-amber-400" size={24} />
            <span className="text-white">Rivera Escoto</span>
            <span className="text-amber-400 text-xs font-normal hidden sm:block">
              & Asociados SRL
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="bg-amber-400 text-gray-900 px-4 py-2 rounded-md text-sm font-semibold hover:bg-amber-500 transition-colors"
            >
              Cotizar
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <nav className="flex flex-col px-4 py-3 gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-300 hover:text-amber-400 transition-colors py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="bg-amber-400 text-gray-900 px-4 py-2 rounded-md text-sm font-semibold text-center hover:bg-amber-500 transition-colors"
              onClick={() => setOpen(false)}
            >
              Cotizar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
