# Rivera Escoto y Asociados SRL - Copilot Instructions

## Proyecto
Página web institucional para **Rivera Escoto y Asociados SRL**, empresa de energía eléctrica y electromecánica que ofrece servicios de instalaciones eléctricas residenciales y técnicas.

## Stack Tecnológico
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Estilos**: Tailwind CSS
- **Base de datos**: PostgreSQL + Prisma 7 ORM (`app/generated/prisma`)
- **Autenticación**: NextAuth.js v4 (CredentialsProvider + JWT)
- **Integración Instagram**: Instagram Basic Display API
- **Deploy**: Vercel + base de datos externa (Railway/Supabase/Neon)

## Estructura del proyecto
```
app/
├── page.tsx              # Home (Hero + Servicios + Publicaciones recientes)
├── servicios/page.tsx    # Página de servicios
├── proyectos/page.tsx    # Publicaciones + Instagram
├── contacto/page.tsx     # Formulario de contacto
├── admin/
│   ├── page.tsx          # Dashboard admin (requiere login)
│   ├── login/page.tsx    # Login admin
│   ├── publicaciones/    # CRUD publicaciones
│   ├── instagram/        # Sincronización Instagram
│   └── mensajes/         # Mensajes de contacto
└── api/
    ├── auth/[...nextauth]/
    ├── publicaciones/
    ├── instagram/sync/
    └── contacto/
components/
├── Navbar.tsx, Footer.tsx, HeroSection.tsx, ServiciosSection.tsx
├── PublicacionCard.tsx, ContactForm.tsx
└── admin/ (AdminSignOutButton, PublicacionForm, AdminPublicacionesTable, AdminInstagramSync)
lib/
├── prisma.ts, auth.ts, instagram.ts, session.ts
prisma/schema.prisma      # Modelos: AdminUser, Publicacion, Contacto
```

## Convenciones
- Idioma: Español
- Colores: Ámbar (#F59E0B) + gris oscuro (#1F2937) — tema eléctrico
- Importar cliente Prisma desde `@/generated/prisma`
- Proteger rutas admin con `requireAdmin()` de `@/lib/session`
- Validar API inputs con Zod

## Variables de entorno requeridas
- `DATABASE_URL` — Conexión PostgreSQL
- `NEXTAUTH_SECRET` — Secreto para JWT
- `NEXTAUTH_URL` — URL del sitio
- `INSTAGRAM_ACCESS_TOKEN` — Token de Instagram Basic Display API
- `INSTAGRAM_USER_ID` — ID de usuario de Instagram
