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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Acompañamos a nuestros clientes en cada etapa del proyecto, desde la planificación y el
              diseño hasta la ejecución, supervisión y puesta en marcha.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {servicios.map(({ icon: Icon, titulo, descripcion }, index) => (
            <ScrollReveal key={titulo} delay={index * 80}>
              <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all group h-full">
                <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-400/20 transition-colors">
                  <Icon className="text-amber-500" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{descripcion}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
