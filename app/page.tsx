import HeroSection from "@/components/HeroSection";
import ServiciosSection from "@/components/ServiciosSection";
import PublicacionCard from "@/components/PublicacionCard";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export default async function HomePage() {
  let publicaciones: Awaited<ReturnType<typeof prisma.publicacion.findMany>> = [];

  try {
    publicaciones = await prisma.publicacion.findMany({
      where: { publicado: true },
      orderBy: { creadoEn: "desc" },
      take: 3,
    });
  } catch {
    // La DB puede no estar configurada aún
  }

  return (
    <>
      <HeroSection />
      <ServiciosSection />

      {publicaciones.length > 0 && (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="inline-block text-amber-500 text-xs font-semibold uppercase tracking-widest mb-2">
                    Nuestro trabajo
                  </span>
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Proyectos Recientes</h2>
                  <p className="text-gray-500 mt-1.5 text-sm">Conoce nuestros últimos trabajos</p>
                </div>
                <Link href="/proyectos" className="text-amber-600 hover:text-amber-700 font-semibold text-sm hidden sm:block hover:underline underline-offset-2 transition-all">
                  Ver todos →
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {publicaciones.map((pub, index) => (
                <ScrollReveal key={pub.id} delay={index * 100}>
                  <PublicacionCard id={pub.id} titulo={pub.titulo} contenido={pub.contenido} imagen={pub.imagen} fuente={pub.fuente} instagramUrl={pub.instagramUrl} creadoEn={pub.creadoEn} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-amber-400/8 rounded-full blur-3xl" />
        </div>
        <ScrollReveal className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Trabajemos juntos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">Construimos Infraestructuras para el Futuro</h2>
          <p className="text-gray-400 mb-8 text-base leading-relaxed max-w-xl mx-auto">
            Ingeniería, innovación y confianza para cada proyecto. Contáctenos y reciba una cotización sin compromiso.
          </p>
          <Link href="/contacto" className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 font-bold px-8 py-3.5 rounded-lg hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20">
            Solicitar cotización
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
