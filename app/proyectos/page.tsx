import PublicacionCard from "@/components/PublicacionCard";
import { db, docsToData } from "@/lib/firebase";
import type { Publicacion } from "@/lib/types";
import { Camera } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Proyectos | Rivera Escoto y Asociados SRL",
  description: "Conoce nuestros proyectos y trabajos realizados en instalaciones eléctricas.",
};

export default async function ProyectosPage() {
  let publicaciones: Publicacion[] = [];

  try {
    const snap = await db
      .collection("publicaciones")
      .where("publicado", "==", true)
      .orderBy("creadoEn", "desc")
      .get();
    publicaciones = docsToData<Publicacion>(snap);
  } catch {
    // DB no configurada aún
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Proyectos y Noticias</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Mantente al día con nuestros proyectos, trabajos realizados y novedades del sector eléctrico.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-pink-500 text-sm">
            <Camera size={16} />
            <span>Publicaciones sincronizadas con Instagram</span>
          </div>
        </div>

        {publicaciones.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Próximamente publicaremos nuestros proyectos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicaciones.map((pub) => (
              <PublicacionCard
                key={pub.id}
                id={pub.id}
                titulo={pub.titulo}
                contenido={pub.contenido}
                imagen={pub.imagen}
                fuente={pub.fuente}
                instagramUrl={pub.instagramUrl}
                creadoEn={pub.creadoEn}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
