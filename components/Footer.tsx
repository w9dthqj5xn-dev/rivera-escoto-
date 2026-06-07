import Link from "next/link";
import { Zap, Phone, Mail, MapPin, Camera, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-amber-400" size={22} />
              <span className="text-white font-bold text-lg">Rivera Escoto y Asociados SRL</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empresa especializada en ingeniería eléctrica y electromecánica.
              Instalaciones residenciales y técnicas con los más altos estándares de seguridad.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Inicio" },
                { href: "/servicios", label: "Servicios" },
                { href: "/proyectos", label: "Proyectos" },
                { href: "/contacto", label: "Contacto" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-amber-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <span>+505 0000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <span>info@riveraescoto.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>Nicaragua</span>
              </li>
            </ul>
            {/* Redes sociales */}
            <div className="flex gap-4 mt-5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <Camera size={20} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Rivera Escoto y Asociados SRL. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
