# Plan de desarrollo para WordPress – Rivera Escoto y Asociados SRL

## 1. Objetivo general
Crear una web institucional profesional para una empresa de energía eléctrica y electromecánica, con:
- página principal
- servicios
- proyectos o trabajos realizados
- publicaciones o blog
- formulario de contacto
- gestión del contenido desde WordPress
- integración con Instagram
- SEO y seguridad
- diseño responsivo y moderno

---

## 2. Stack recomendado
- WordPress
- Tema personalizado o tema base + customización
- ACF Pro
- CPT UI
- Fluent Forms o WPForms
- Rank Math o Yoast SEO
- WP Mail SMTP
- Wordfence o Solid Security
- Smush o ShortPixel
- UpdraftPlus

---

## 3. Páginas principales
Crear estas páginas:
- Inicio
- Servicios
- Proyectos
- Blog
- Contacto
- Política de privacidad
- Términos y condiciones

Menú principal sugerido:
- Inicio
- Servicios
- Proyectos
- Blog
- Contacto

---

## 4. Estructura del sitio

### 4.1 Inicio
Debe incluir:
- hero con texto principal
- botón de cotización o contacto
- imagen o video de fondo
- servicios destacados
- proyectos recientes
- sección de confianza / experiencia
- CTA final para contacto

### Campos ACF sugeridos para la página Inicio
- hero_title
- hero_subtitle
- hero_button_text
- hero_button_link
- hero_secondary_button_text
- hero_secondary_button_link
- hero_image
- about_title
- about_text
- services_intro
- projects_intro
- cta_title
- cta_text
- cta_button_text
- cta_button_link

### 4.2 Servicios
Crear un Custom Post Type llamado: Servicios

Campos recomendados:
- nombre
- descripción corta
- descripción larga
- icono
- imagen destacada
- categoría
- orden

Taxonomía:
- categoría de servicios

Ejemplos:
- Instalaciones eléctricas residenciales
- Instalaciones eléctricas comerciales
- Mantenimiento
- Proyectos electromecánicos
- Automatización industrial
- Energía solar

### 4.3 Proyectos
Crear un Custom Post Type llamado: Proyectos

Campos recomendados:
- nombre del proyecto
- resumen
- descripción completa
- imagen destacada
- galería
- cliente
- ubicación
- fecha
- categoría
- enlace externo (si aplica)

Taxonomía:
- tipo de proyecto

### 4.4 Blog / publicaciones
Usar Posts de WordPress estándar.

Campos:
- título
- contenido
- imagen destacada
- categoría
- fecha
- autor
- slug

### 4.5 Contacto
Crear página Contacto con:
- formulario
- información de contacto
- teléfono
- correo
- dirección
- horario
- WhatsApp
- mapa

Campos ACF sugeridos:
- phone
- email
- address
- schedule
- whatsapp
- map_embed

---

## 5. Custom Post Types necesarios

### CPT 1: Servicios
- slug: servicios
- icon: wrench
- soporta: título, editor, imagen destacada

### CPT 2: Proyectos
- slug: proyectos
- icon: portfolio
- soporta: título, editor, imagen destacada, galería

### CPT 3: Mensajes de contacto
- slug: mensajes
- icon: email
- soporta: título, editor, fecha
- oculto de menú principal

### CPT 4: Instagram posts (opcional)
- slug: instagram-posts
- soporte: título, imagen, descripción, enlace

---

## 6. Formulario de contacto
Funcionalidad necesaria:
- nombre
- correo
- teléfono
- empresa
- servicio de interés
- mensaje

Acciones:
- enviar email al administrador
- guardar mensaje en CPT Mensajes
- mostrar confirmación de envío
- validar correo y campos obligatorios

Plugin recomendado:
- Fluent Forms o WPForms

---

## 7. Integración con Instagram
Objetivo:
- mostrar publicaciones recientes
- sincronizar contenido desde la API de Instagram

Datos a guardar por publicación:
- caption
- media_url
- permalink
- thumbnail
- fecha
- estado

Sección recomendada:
- 3 a 6 publicaciones recientes
- cards con imagen + texto breve + enlace a Instagram

---

## 8. Panel administrativo para el cliente
El cliente debe poder editar desde WordPress:
- hero y textos de la home
- servicios
- proyectos
- noticias
- contacto
- redes sociales
- imagenes destacadas

Esto se logra con:
- WordPress admin estándar
- ACF
- CPT UI
- permisos por roles

Roles sugeridos:
- Administrador
- Editor
- Autor

---

## 9. Seguridad y mantenimiento
Instalar y configurar:
- Wordfence o Solid Security
- WP Mail SMTP
- UpdraftPlus para backups
- limitación de login
- copias de seguridad automáticas
- bloqueo de archivos sensibles

---

## 10. SEO
Instalar y configurar:
- Rank Math o Yoast SEO

Configurar:
- meta título por página
- meta descripción
- slugs amigables
- sitemap XML
- schema básico
- alt text en imágenes
- optimización de velocidad

---

## 11. Diseño esperado
Estilo sugerido:
- paleta: ámbar / amarillo eléctrico + gris oscuro
- sensación premium y técnica
- enfoque industrial
- secciones claras y visuales
- diseño elegante y serio

Tipografía sugerida:
- Poppins, Manrope, Montserrat o Inter

---

## 12. Plugins recomendados
- ACF Pro
- CPT UI
- Fluent Forms o WPForms
- Rank Math
- WP Mail SMTP
- Wordfence
- Smush o ShortPixel
- UpdraftPlus
- LiteSpeed Cache o WP Rocket
- Redirection

---

## 13. Estructura recomendada del tema
### Opción A: Tema personalizado desde cero
Ventajas:
- total control del diseño
- mejor branding
- mejor performance

### Opción B: Tema base + personalización
Ventajas:
- más rápido de desarrollar
- menor costo

Recomendación:
Para una empresa institucional, una buena opción es:
- tema hijo de Astra o GeneratePress
- o tema custom completo si se quiere un resultado más premium

---

## 14. Flujo de desarrollo recomendado
### Fase 1: Planeación
- definir páginas
- definir servicios y proyectos
- definir contenido base
- definir branding

### Fase 2: Diseño
- wireframes
- mockups
- estilos globales
- responsive

### Fase 3: CMS
- instalar WordPress
- configurar tema
- crear CPTs
- crear campos ACF

### Fase 4: Funcionalidades
- formulario de contacto
- guardar mensajes
- Instagram
- SEO
- seguridad

### Fase 5: Pruebas
- responsive
- performance
- formularios
- email
- navegación

### Fase 6: Lanzamiento
- dominio
- SSL
- backups
- revisión final

---

## 15. Mapeo de funciones del proyecto actual a WordPress

| Función actual | Equivalente en WordPress |
|---|---|
| Landing page | Página Inicio |
| Servicios | CPT Servicios |
| Proyectos | CPT Proyectos |
| Blog / noticias | Posts |
| Contacto | Página Contacto + formulario |
| Admin custom | WordPress admin |
| CRUD de contenido | CPT + ACF |
| Mensajes | CPT Mensajes |
| Instagram | Feed sincronizado |
| SEO | Rank Math |
| Seguridad | Wordfence |
| Email | WP Mail SMTP |

---

## 16. Recomendación final
La mejor forma de construir esta web desde cero en WordPress es:
- WordPress como CMS central
- tema personalizado o base personalizada
- CPT para servicios y proyectos
- ACF para contenido editable
- formulario de contacto con almacenamiento
- RSS/Instagram integrados
- SEO y seguridad configurados desde el inicio

Esta estructura permite que la empresa administre la web sin tocar código, mientras conserva un diseño profesional e institucional.

---

## 17. Checklist final antes del lanzamiento
- [ ] WordPress instalado y configurado
- [ ] Tema activo y responsive
- [ ] Páginas creadas
- [ ] CPT de Servicios creados
- [ ] CPT de Proyectos creados
- [ ] CPT de Mensajes creados
- [ ] ACF configurado
- [ ] Formulario funcionando
- [ ] Emails funcionando
- [ ] Instagram integrado
- [ ] SEO configurado
- [ ] Backup configurado
- [ ] Seguridad activada
- [ ] SSL activo
- [ ] Dominio apuntando correctamente

---

## 18. Comentario clave
Si lo que se quiere es una web fácil de actualizar para un cliente no técnico, WordPress es una buena opción. Si la prioridad es un sistema más personalizado y complejo, entonces Next.js seguiría siendo mejor.

Este diseño en WordPress debe pensarse como una versión institucional y administrable del proyecto original, no como una copia literal del mismo.
