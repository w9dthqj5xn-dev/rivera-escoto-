import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gray-950 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient glow layers */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute -top-48 -left-48 w-120 h-120 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              Ingeniería Eléctrica y Electromecánica
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Energía Eléctrica y{" "}
              <span className="text-amber-400">Soluciones Electromecánicas</span>
            </h1>

            <p className="text-base text-gray-400 mb-8 leading-relaxed max-w-lg">
              Ofrecemos soluciones integrales de ingeniería eléctrica y electromecánica para proyectos
              residenciales, comerciales, corporativos e industriales. Nuestro compromiso es desarrollar
              infraestructuras seguras, eficientes y sostenibles.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30"
              >
                Solicitar cotización <ArrowRight size={17} />
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-2 border border-gray-700 text-gray-400 font-semibold px-6 py-3 rounded-lg hover:border-gray-500 hover:text-gray-200 transition-all"
              >
                Ver nuestros servicios
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800/80">
              {[
                { icon: Shield, label: "Instalaciones seguras", value: "100%" },
                { icon: Clock, label: "Años de experiencia", value: "10+" },
                { icon: Award, label: "Proyectos completados", value: "500+" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center group">
                  <Icon className="text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" size={21} />
                  <div className="text-2xl font-extrabold text-white tracking-tight">{value}</div>
                  <div className="text-xs text-gray-500 mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-3/4 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-amber-400/15">
              <Image
                src="/hombre.avif"
                alt="Ingeniero Rivera Escoto y Asociados"
                fill
                className="object-cover"
                priority
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-gray-950/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
