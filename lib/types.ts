export interface Publicacion {
  id: string;
  titulo: string;
  contenido?: string | null;
  imagen?: string | null;
  slug: string;
  fuente: "MANUAL" | "INSTAGRAM";
  instagramId?: string | null;
  instagramUrl?: string | null;
  publicado: boolean;
  creadoEn: string;
}

export interface Contacto {
  id: string;
  nombre: string;
  email: string;
  telefono?: string | null;
  mensaje: string;
  leido: boolean;
  creadoEn: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  nombre: string;
  creadoEn: string;
}
