# 📦 Guía de Migración a Nueva Cuenta de Netlify

## Variables de Entorno Requeridas

El proyecto necesita estas 8-10 variables configuradas en Netlify:

### 1. **Autenticación NextAuth**
```
NEXTAUTH_SECRET=<tu-secreto-jwt>
NEXTAUTH_URL=<url-del-nuevo-sitio-en-netlify>
```

### 2. **Firebase (Database)**
```
FIREBASE_PROJECT_ID=<tu-project-id>
FIREBASE_CLIENT_EMAIL=<tu-client-email>
FIREBASE_PRIVATE_KEY=<tu-private-key>
```
⚠️ **Importante**: La `FIREBASE_PRIVATE_KEY` viene con `\n` escapados; Netlify los maneja correctamente.

### 3. **Instagram Integration**
```
INSTAGRAM_APP_ID=<tu-app-id>
INSTAGRAM_ACCESS_TOKEN=<tu-access-token>
INSTAGRAM_USER_ID=<tu-user-id>
INSTAGRAM_SCOPE=user_profile,user_media  (opcional)
INSTAGRAM_REDIRECT_URI=<nueva-url>/admin/instagram/callback  (opcional)
```

---

## Pasos de Migración

### Paso 1: Extraer Variables Actuales
Desde tu cuenta **vieja de Netlify**:
1. Ve a **Site settings** → **Environment variables**
2. Copia el valor de cada variable (no el nombre de variable)
3. Guárdalas en un lugar seguro (nota de texto local o gestor de contraseñas)

### Paso 2: Crear Nuevo Sitio en Netlify Nueva Cuenta
1. Inicia sesión en la **nueva cuenta de Netlify**
2. Click en **Add new site** → **Import an existing project**
3. Selecciona **GitHub** (u otro proveedor de Git)
4. Elige el repositorio: `rivera-escoto`
5. Selecciona la rama: `main` (o la que uses)
6. **NO publiques aún** (deja pendiente)

### Paso 3: Configurar Variables de Entorno
En la nueva cuenta, antes de hacer el primer deploy:
1. Ve a **Site settings** → **Environment variables**
2. Haz click en **Add a variable**
3. Agrega cada variable usando los valores que copiaste:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` ← **Cambiar a la nueva URL de Netlify**
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `INSTAGRAM_APP_ID`
   - `INSTAGRAM_ACCESS_TOKEN`
   - `INSTAGRAM_USER_ID`

### Paso 4: Verificar Build en Netlify
1. Netlify iniciará el build automáticamente
2. Ve a **Deploys** y espera a que termine
3. Revisa los logs si hay errores (se mostrarán en color rojo)

### Paso 5: Probar el Sitio
Una vez deployado:
- ✅ Accede a la nueva URL y prueba: Home, Servicios, Proyectos, Contacto
- ✅ Intenta login admin: `/admin/login`
- ✅ Verifica que se carguen publicaciones desde Firebase
- ✅ Prueba formulario de contacto

### Paso 6: Configurar Dominio (Opcional)
Si quieres mantener tu dominio actual:
1. En la nueva cuenta, ve a **Site settings** → **Domain management**
2. Click en **Add custom domain**
3. Apunta los DNS de tu registrador al dominio de Netlify
4. O transfiere el dominio desde la cuenta vieja

### Paso 7: Desactivar Deploy en Sitio Antiguo (Opcional)
Para evitar confusiones:
1. Ve a la cuenta **vieja**
2. **Site settings** → **Build & deploy** → **Linked site**
3. Click en **Unlink repository** (o deja el sitio como está si quieres mantener versión anterior)

---

## Checklist de Verificación Post-Migración

- [ ] Variables de entorno configuradas en Netlify (8-10 variables)
- [ ] Build completó sin errores
- [ ] Home page carga correctamente
- [ ] Servicios se muestran
- [ ] Proyectos/publicaciones cargan desde Firebase
- [ ] Login admin funciona
- [ ] Formulario de contacto acepta envíos
- [ ] Instagram sync funciona (si está configurado)
- [ ] Dominio personalizado apunta correctamente (si aplica)

---

## Troubleshooting

### Build falla con error de Firebase
**Causa**: Variables Firebase mal configuradas o valores ausentes
**Solución**: Revisa en `netlify.toml` que el build use `npm run build`. Netlify las detecta automáticamente.

### Login admin no funciona
**Causa**: `NEXTAUTH_SECRET` o `NEXTAUTH_URL` incorrectos
**Solución**: Verifica que `NEXTAUTH_URL` sea `https://tu-nuevo-sitio.netlify.app` (con HTTPS)

### Publicaciones no cargan
**Causa**: `FIREBASE_PRIVATE_KEY` mal formateada o credenciales vencidas
**Solución**: Copia nuevamente desde Firebase Console; asegúrate de que esté completa

### Instagram sync falla
**Causa**: Token expirado o `INSTAGRAM_USER_ID` incorrecto
**Solución**: Regenera el token en Instagram App Dashboard

---

## Nota Importante
Todo tu código y configuración versionada (`netlify.toml`, `next.config.ts`, etc.) viajará con el repositorio. Lo único que **no** se copia automáticamente son las variables de entorno y el historial de deployments, por eso este checklist.
