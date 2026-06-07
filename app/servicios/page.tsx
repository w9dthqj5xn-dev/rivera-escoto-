import ServiciosSection from "@/components/ServiciosSection";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Servicios | Rivera Escoto y Asociados SRL",
};

const diferenciadores = [
  "Experiencia en proyectos residenciales, corporativos e industriales.",
  "Cumplimiento de normas nacionales e internacionales.",
  "Personal técnico altamente capacitado.",
  "Soluciones personalizadas para cada necesidad.",
  "Compromiso con la seguridad, calidad y eficiencia energética.",
  "Gestión integral desde el diseño hasta la entrega final.",
];

export default function ServiciosPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Nuestros Servicios</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Soluciones integrales de ingeniería eléctrica y electromecánica para proyectos
          residenciales, comerciales, corporativos e industriales.
        </p>
      </div>

      <ServiciosSection />

      {/* Propuesta de Valor */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
              Nuestra Propuesta de Valor
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              En Rivera Escoto y Asociados, S.R.L. entendemos que cada proyecto representa una
              inversión estratégica. Combinamos conocimiento técnico, planificación eficiente y
              ejecución precisa para ofrecer soluciones duraderas y de alto desempeño.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {diferenciadores.map((item) => (
                <li key={item} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle className="text-amber-500 mt-0.5 shrink-0" size={20} />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Cierre */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white text-center">
        <ScrollReveal className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Construimos Infraestructuras para el Futuro</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Nuestro objetivo es proporcionar soluciones eléctricas y electromecánicas que impulsen
            la productividad, la continuidad operativa y el crecimiento de nuestros clientes,
            con los más altos niveles de calidad, innovación y confiabilidad.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-amber-500 transition-colors"
          >
            Solicitar cotización
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
