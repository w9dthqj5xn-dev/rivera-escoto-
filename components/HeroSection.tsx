import Link from "next/link";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="inline-block bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            Ingeniería Eléctrica y Electromecánica
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Energía Eléctrica y{" "}
            <span className="text-amber-400">Soluciones Electromecánicas</span>
          </h1>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl">
            Ofrecemos soluciones integrales de ingeniería eléctrica y electromecánica para proyectos
            residenciales, comerciales, corporativos e industriales. Nuestro compromiso es desarrollar
            infraestructuras seguras, eficientes y sostenibles, respaldadas por altos estándares de
            calidad y un enfoque orientado a la excelencia técnica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors"
            >
              Solicitar cotización <ArrowRight size={18} />
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 border border-gray-600 text-gray-300 font-semibold px-6 py-3 rounded-lg hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              Ver nuestros servicios
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
            {[
              { icon: Shield, label: "Instalaciones seguras", value: "100%" },
              { icon: Clock, label: "Años de experiencia", value: "10+" },
              { icon: Award, label: "Proyectos completados", value: "500+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="text-amber-400 mx-auto mb-2" size={22} />
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
