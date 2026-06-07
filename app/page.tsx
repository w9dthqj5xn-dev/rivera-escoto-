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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">Proyectos Recientes</h2>
                  <p className="text-gray-500 mt-2">Conoce nuestros últimos trabajos</p>
                </div>
                <Link href="/proyectos" className="text-amber-600 hover:text-amber-700 font-semibold text-sm hidden sm:block">
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

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-400">
        <ScrollReveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Construimos Infraestructuras para el Futuro</h2>
          <p className="text-gray-800 mb-8 text-lg">
            Ingeniería, innovación y confianza para cada proyecto. Contáctenos y reciba una cotización sin compromiso.
          </p>
          <Link href="/contacto" className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Solicitar cotización
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
