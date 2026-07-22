"use client";
import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  titulo: z.string().min(1, "El título es requerido"),
  contenido: z.string().optional(),
  imagen: z.string().optional().or(z.literal("")),
  slug: z.string().min(1, "El slug es requerido").regex(/^[a-z0-9-]+$/, "Solo letras minúsculas, números y guiones"),
  publicado: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function PublicacionForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { publicado: true },
  });

  const titulo = watch("titulo");

  const generarSlug = () => {
    const slug = titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setValue("slug", slug);
  };

  const handleImageSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setValue("imagen", result, { shouldDirty: true, shouldValidate: true });
      setSelectedFileName(file.name);
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const res = await fetch("/api/publicaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al guardar");
      }
      router.push("/admin/publicaciones");
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al guardar la publicación");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
        <input
          {...register("titulo")}
          type="text"
          placeholder="Título de la publicación"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        />
        {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">Slug *</label>
          <button
            type="button"
            onClick={generarSlug}
            className="text-xs text-amber-600 hover:text-amber-700 font-medium"
          >
            Generar desde título
          </button>
        </div>
        <input
          {...register("slug")}
          type="text"
          placeholder="url-de-la-publicacion"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        />
        {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
        <textarea
          {...register("contenido")}
          rows={6}
          placeholder="Descripción o cuerpo de la publicación..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL o archivo de imagen (opcional)</label>
        <input
          {...register("imagen")}
          type="text"
          placeholder="Pega una URL o selecciona un archivo"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        />

        <div className="mt-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
          <label htmlFor="imagen-archivo" className="flex cursor-pointer items-center justify-between text-sm text-gray-700">
            <span>Seleccionar imagen desde tu dispositivo</span>
            <span className="font-semibold text-amber-600">Elegir archivo</span>
          </label>
          <input id="imagen-archivo" type="file" accept="image/*" onChange={handleImageSelection} className="sr-only" />

          {selectedFileName && <p className="mt-2 text-xs text-gray-500">Archivo seleccionado: {selectedFileName}</p>}
          {imagePreview && (
            <img src={imagePreview} alt="Vista previa de la imagen" className="mt-3 h-40 w-full rounded-md object-cover" />
          )}
        </div>

        {errors.imagen && <p className="text-red-500 text-xs mt-1">{errors.imagen.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <input
          {...register("publicado")}
          type="checkbox"
          id="publicado"
          className="w-4 h-4 accent-amber-400"
        />
        <label htmlFor="publicado" className="text-sm font-medium text-gray-700">
          Publicar inmediatamente
        </label>
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-amber-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Guardando..." : "Guardar publicación"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
