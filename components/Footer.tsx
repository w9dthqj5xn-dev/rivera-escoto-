import Link from "next/link";
import { Zap, Phone, Mail, MapPin, Camera, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center shrink-0">
                <Zap className="text-gray-900" size={17} />
              </div>
              <span className="text-white font-bold text-base tracking-tight">Rivera Escoto y Asociados SRL</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Empresa especializada en ingeniería eléctrica y electromecánica.
              Instalaciones con los más altos estándares de seguridad.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navegación</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/", label: "Inicio" },
                { href: "/servicios", label: "Servicios" },
                { href: "/proyectos", label: "Proyectos" },
                { href: "/contacto", label: "Contacto" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 hover:text-gray-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-amber-400 shrink-0" />
                <span className="text-gray-500">+505 0000-0000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-amber-400 shrink-0" />
                <span className="text-gray-500">info@riveraescoto.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-gray-500">Nicaragua</span>
              </li>
            </ul>
            {/* Redes sociales */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 hover:bg-amber-400/10 hover:text-amber-400 transition-all"
                aria-label="Instagram"
              >
                <Camera size={17} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 hover:bg-amber-400/10 hover:text-amber-400 transition-all"
                aria-label="Facebook"
              >
                <Globe size={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Rivera Escoto y Asociados SRL. Todos los derechos reservados.</span>
          <span className="text-gray-700">Ingeniería Eléctrica y Electromecánica</span>
        </div>
      </div>
    </footer>
  );
}
