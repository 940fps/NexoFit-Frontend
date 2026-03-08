# 🚀 Guía Rápida de Inicio - NexoFit Frontend

## ⚡ Inicio Rápido

### 1. Iniciar el Backend

```powershell
cd NexoFit-Backend
npm start
```

El backend estará disponible en: `http://localhost:8080`

### 2. Iniciar el Frontend

```powershell
cd NexoFit-Frontend
npm run dev
```

El frontend estará disponible en: `http://localhost:4321`

## 🎯 Flujo de Usuario

### Nuevo Usuario

1. Visita `http://localhost:4321`
2. Haz clic en **"Únete Ahora"** en el navbar
3. Completa el formulario de registro
4. Serás redirigido automáticamente a `/login`
5. Inicia sesión con tus credenciales
6. Accede al dashboard

### Usuario Existente

1. Visita `http://localhost:4321`
2. Haz clic en **"Iniciar Sesión"**
3. Ingresa tus credenciales
4. Accede directamente al dashboard

## 📱 Vistas Disponibles

### Página Principal (/)

- Información del gimnasio
- Servicios ofrecidos
- Modalidades de clases
- Planes de membresía
- Información de contacto
- **Si ya estás logueado:** Botón "Mi Dashboard" en lugar de "Iniciar Sesión"

### Login (/login)

- Formulario de inicio de sesión
- Validación de campos
- Manejo de errores
- Redirección automática al dashboard

### Registro (/signup)

- Formulario completo de registro
- Validación de contraseñas
- Verificación de coincidencia
- Redirección a login tras registro exitoso

### Dashboard (/dashboard)

**Tab: Clases Disponibles**

- Visualiza todas las clases del gimnasio
- Información detallada de cada clase
- Botón para reservar (si hay cupos)
- Indicador de capacidad

**Tab: Mis Reservas**

- Lista de todas tus reservas activas
- Información de cada reserva
- Botón para cancelar reservas

## 🎨 Características de Diseño

### Responsive

- ✅ Móvil (< 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (> 1024px)

### Tema Oscuro

- Fondo: `#121212` y `#1E1E1E`
- Primario: `#FF4500` (Naranja rojizo)
- Secundario: `#00ACC1` (Cyan)
- Texto: `#E0E0E0`

### Animaciones

- Transiciones suaves en botones
- Hover effects en cards
- Spinners de carga
- Alertas animadas

## 🔐 Sistema de Autenticación

### LocalStorage Keys

```javascript
-nexofit_token - // JWT token de acceso
  nexofit_refresh_token - // Token para refrescar sesión
  nexofit_user; // Datos del usuario logueado
```

### Protección de Rutas

- `/dashboard` requiere autenticación
- Si no estás logueado, redirige a `/login`
- Si ya estás logueado en `/login`, redirige a `/dashboard`

## 📋 Funcionalidades Implementadas

### Autenticación

- [x] Registro de usuarios
- [x] Inicio de sesión
- [x] Cierre de sesión
- [x] Almacenamiento seguro de tokens
- [x] Verificación de autenticación
- [x] Redirecciones automáticas

### Gestión de Clases

- [x] Ver todas las clases disponibles
- [x] Ver detalles de cada clase
- [x] Filtrado visual por capacidad
- [x] Diseño de cards responsive

### Gestión de Reservas

- [x] Crear reserva de clase
- [x] Ver mis reservas activas
- [x] Cancelar reserva
- [x] Actualización automática tras operaciones

### UX/UI

- [x] Mensajes de error/éxito
- [x] Estados de carga (spinners)
- [x] Validación de formularios
- [x] Diseño moderno y compacto
- [x] Navegación intuitiva
- [x] Feedback visual inmediato

## 🛠️ Tecnologías

```json
{
  "framework": "Astro 5.17.1",
  "estilos": "Bootstrap 5.3.8",
  "iconos": "@lucide/astro",
  "api": "Fetch API nativa",
  "storage": "LocalStorage",
  "lenguaje": "JavaScript (ES6+)"
}
```

## 📁 Estructura de Archivos

```
NexoFit-Frontend/
├── src/
│   ├── pages/
│   │   ├── index.astro       # Página principal
│   │   ├── login.astro       # Inicio de sesión
│   │   ├── signup.astro      # Registro
│   │   └── dashboard.astro   # Panel de cliente
│   ├── layouts/
│   │   └── Layout.astro      # Layout base
│   ├── components/
│   │   ├── Navbar.astro      # (Existente)
│   │   └── Welcome.astro     # (Existente)
│   └── utils/
│       └── api.js            # ⭐ Utilidades de API
├── ZONA_CLIENTES.md          # ⭐ Documentación completa
├── INICIO_RAPIDO.md          # ⭐ Esta guía
└── package.json
```

## 🐛 Troubleshooting

### Error de CORS

**Síntoma:** Error en consola sobre CORS policy
**Solución:** Verificar que el backend tenga CORS habilitado

### Token expirado

**Síntoma:** Redirige a login constantemente
**Solución:** Limpiar localStorage y volver a iniciar sesión

```javascript
localStorage.clear();
```

### Clases no se cargan

**Síntoma:** Dashboard muestra "No hay clases disponibles"
**Solución:**

1. Verificar que el backend esté corriendo
2. Crear clases en la base de datos
3. Verificar la consola del navegador

### Botón de reserva no funciona

**Síntoma:** Click no hace nada
**Solución:**

1. Abrir la consola del navegador
2. Verificar errores de API
3. Confirmar que el usuario esté autenticado

## 📞 Endpoints de la API Utilizados

| Método | Endpoint             | Descripción         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Registro de usuario |
| POST   | `/api/auth/login`    | Inicio de sesión    |
| POST   | `/api/auth/refresh`  | Refrescar token     |
| GET    | `/api/classes`       | Obtener clases      |
| GET    | `/api/bookings`      | Obtener reservas    |
| POST   | `/api/bookings`      | Crear reserva       |
| DELETE | `/api/bookings/:id`  | Cancelar reserva    |

## ✅ Testing Checklist

- [ ] Backend corriendo en puerto 8080
- [ ] Frontend corriendo en puerto 4321
- [ ] Base de datos inicializada
- [ ] Puedes registrar un usuario nuevo
- [ ] Puedes iniciar sesión
- [ ] Dashboard carga correctamente
- [ ] Puedes ver clases disponibles
- [ ] Puedes crear una reserva
- [ ] Puedes ver tus reservas
- [ ] Puedes cancelar una reserva
- [ ] Puedes cerrar sesión

## 🎉 ¡Listo!

Tu zona de clientes NexoFit está completamente funcional. Sigue los pasos de inicio rápido y comienza a usar la aplicación.

Para más detalles técnicos, consulta el archivo `ZONA_CLIENTES.md`.
