"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-white/5"
          : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg group">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-amber-300 transition-colors">
              <Zap className="text-gray-900" size={18} />
            </div>
            <span className="text-white tracking-tight">Rivera Escoto</span>
            <span className="text-gray-500 text-xs font-normal hidden sm:block">
              & Asociados SRL
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5 transition-all"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="ml-3 bg-amber-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-300 transition-colors shadow-sm shadow-amber-400/20"
            >
              Cotizar
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-white p-1.5 rounded-md hover:bg-white/5 transition-all"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-900/98 backdrop-blur-md border-t border-white/5">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-md transition-all text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="bg-amber-400 text-gray-900 px-4 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-amber-300 transition-colors mt-2"
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
