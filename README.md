# 📚 Plataforma Educativa

Sistema de gestión educativa multi-tenant con arquitectura híbrida (PostgreSQL + MongoDB), diseñado para centros educativos, docentes y estudiantes.

## 🚀 Tecnologías

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| **Backend** | Next.js API Routes, NextAuth.js v5 |
| **Bases de datos** | PostgreSQL (Prisma ORM), MongoDB (Mongoose) |
| **Pagos** | Lemon Squeezy |
| **Despliegue** | Vercel |
| **Iconos** | Lucide React |

## 📋 Estado del proyecto

✅ **En producción activa** - [mieducacion.edu.do](https://mieducacion.edu.do)

## 🏗️ Arquitectura

### Base de datos híbrida

**PostgreSQL (Prisma) - Gestión principal**
- Usuarios (docentes, estudiantes, admins)
- Centros educativos
- Materias y competencias
- Periodos académicos
- Evaluaciones y calificaciones
- Suscripciones y pagos

**MongoDB (Mongoose) - Contenido dinámico**
- Planificaciones pedagógicas
- Diario del docente
- Asistencia diaria
- Notificaciones
- Pendientes ignorados

## 👥 Roles y permisos

| Rol | Responsabilidad | Ruta principal |
|-----|-----------------|----------------|
| **superadmin** | Gestión global del sistema | `/admin` |
| **admin** | Gestión nacional | `/admin` |
| **admin_centro** | Gestión de un centro educativo | `/admin/centro/[id]` |
| **coordinador** | Supervisión académica | `/admin/centro/[id]/coordinador` |
| **tecnico_distrital** | Supervisión distrital | `/admin/distrital` |
| **registro** | Inscripciones y matrículas | `/admin/registro` |
| **docente** | Gestión de clases | `/admin/docente` |
| **estudiante** | Consulta de contenido | `/dashboard` |

## 📁 Estructura de rutas agrupadas

app/admin/
├── (protected)/ # Autenticación + rol (sin plan)
│ ├── materias/
│ ├── usuarios/
│ └── centros/
├── (pro)/ # Auth + rol + plan Pro/Premium
│ ├── diario/
│ ├── asistencia/
│ ├── evaluaciones/
│ └── planificaciones/
├── centro/ # Rutas específicas de centro
│ └── [id]/
│ ├── coordinador/
│ └── page.tsx
├── docente/ # Oficina virtual del docente
│ └── page.tsx
└── layout.tsx


## 💰 Sistema de suscripciones

| Plan | Precio | Características |
|------|--------|-----------------|
| **Gratis** | $0 | Asistencia, gestión básica, hasta 10 estudiantes |
| **Docente Pro** | $5/mes o $50/año | Diario, evaluaciones, planificaciones ilimitadas, hasta 200 estudiantes |
| **Docente Premium** | $10/mes o $100/año | Analytics avanzado, exportación de reportes, estudiantes ilimitados |

## 🔐 Seguridad implementada

- ✅ Autenticación con NextAuth.js (JWT)
- ✅ Autorización por rol y plan
- ✅ Protección por grupos de rutas (`(protected)`, `(pro)`)
- ✅ Webhooks con verificación de firma
- ✅ Rate limiting en login
- ✅ Contraseñas hasheadas con bcrypt

## 🔄 Integraciones

| Servicio | Estado | Propósito |
|----------|--------|-----------|
| **Lemon Squeezy** | ✅ Completado | Pagos y suscripciones |
| **Resend** | ⏳ Pendiente | Envío de emails |
| **Cloudflare** | ❌ No utilizado | No recomendado para Vercel |

## 📦 Comandos útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Generar cliente Prisma
npx prisma generate

# Migración de base de datos
npx prisma migrate dev --name nombre_migracion

# Desplegar en Vercel
vercel --prod

# Base de datos
DATABASE_URL=postgresql://...
MONGODB_URI=mongodb+srv://...

# NextAuth
AUTH_SECRET=...
AUTH_TRUST_HOST=true

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=...
LEMON_SQUEEZY_STORE_ID=...
LEMON_SQUEEZY_WEBHOOK_SECRET=...
LEMON_VARIANT_DOCENTE_PRO_MENSUAL=...
LEMON_VARIANT_DOCENTE_PRO_ANUAL=...
LEMON_VARIANT_DOCENTE_PREMIUM_MENSUAL=...
LEMON_VARIANT_DOCENTE_PREMIUM_ANUAL=...

## 📅 Actualización - 18/05/2026

### ✅ Restablecimiento de contraseña
- Modelo `PasswordResetToken` en Prisma
- API endpoints: `forgot-password`, `reset-password`, `validate-reset-token`
- Páginas: `/auth/forgot-password` y `/auth/reset-password`
- Integración con Resend para envío de emails
- Template de email profesional y responsive
- Enlace seguro con expiración de 1 hora
- Validación de token y manejo de errores