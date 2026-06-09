import { Zap, Settings, Wind, FlaskConical } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const servicios = [
  {
    icon: Zap,
    titulo: "Instalaciones Eléctricas",
    descripcion:
      "Diseñamos e implementamos sistemas eléctricos confiables y eficientes para residencias, complejos habitacionales, torres empresariales, centros comerciales, naves industriales e infraestructuras institucionales. Incluye diseño eléctrico, distribución de energía, tableros, iluminación, puesta a tierra y sistemas de respaldo.",
  },
  {
    icon: Settings,
    titulo: "Ingeniería Electromecánica",
    descripcion:
      "Desarrollamos soluciones electromecánicas adaptadas a los requerimientos operativos de cada cliente, integrando sistemas que optimizan el rendimiento, la seguridad y la eficiencia de las instalaciones.",
  },
  {
    icon: Wind,
    titulo: "Sistemas HVAC",
    descripcion:
      "Diseñamos e instalamos sistemas de calefacción, ventilación y aire acondicionado para entornos residenciales, comerciales e industriales, garantizando condiciones óptimas de confort, control ambiental y eficiencia energética.",
  },
  {
    icon: FlaskConical,
    titulo: "Laboratorios y Áreas Críticas",
    descripcion:
      "Desarrollamos infraestructura electromecánica para laboratorios, salas limpias y ambientes controlados que cumplen con los más exigentes estándares de calidad y regulación para sectores farmacéutico, médico, biotecnológico, alimentario e industrial.",
  },
];

export default function ServiciosSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-amber-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Lo que hacemos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Nuestros Servicios
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
              Acompañamos a nuestros clientes en cada etapa del proyecto, desde la planificación y el
              diseño hasta la ejecución, supervisión y puesta en marcha.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {servicios.map(({ icon: Icon, titulo, descripcion }, index) => (
            <ScrollReveal key={titulo} delay={index * 80}>
              <div className="relative p-7 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300 group h-full bg-white overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors">
                  <Icon className="text-amber-500" size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2.5 text-lg tracking-tight">{titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{descripcion}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
