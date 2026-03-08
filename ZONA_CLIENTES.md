# Zona de Clientes NexoFit - Frontend

## 📋 Resumen

Se ha implementado una zona de clientes completa para NexoFit con las siguientes funcionalidades:

## ✨ Características Implementadas

### 1. **Página de Inicio de Sesión** (`/login`)

- Formulario de login con validación
- Diseño moderno con gradientes
- Manejo de errores y mensajes de éxito
- Redirección automática al dashboard tras login exitoso
- Almacenamiento seguro de tokens en localStorage

### 2. **Página de Registro** (`/signup`)

- Formulario completo de registro con:
  - Nombre y apellido
  - Email
  - Teléfono (opcional)
  - Contraseña con confirmación
  - Checkbox de términos y condiciones
- Validación de contraseñas (mínimo 6 caracteres)
- Verificación de coincidencia de contraseñas
- Diseño responsive con Bootstrap

### 3. **Dashboard de Clientes** (`/dashboard`)

- **Vista de Clases Disponibles:**
  - Grid responsive de tarjetas de clases
  - Información detallada: instructor, horario, duración, capacidad
  - Botón para reservar clases
  - Indicador de clases llenas
- **Vista de Mis Reservas:**
  - Lista de reservas activas del cliente
  - Información de cada reserva
  - Botón para cancelar reservas
- **Navbar personalizado:**
  - Nombre del usuario logueado
  - Botón de cerrar sesión
- **Sistema de tabs** para cambiar entre vistas
- **Alertas interactivas** para feedback del usuario

### 4. **Utilidad API** (`utils/api.js`)

- Funciones para todas las operaciones del backend:
  - Autenticación (login, register, refresh token)
  - Gestión de clases (getClasses, getClassById)
  - Gestión de reservas (getBookings, createBooking, deleteBooking)
  - Modalidades y categorías
- Manejo centralizado de tokens JWT
- Interceptor de errores
- Funciones de utilidad (logout, isAuthenticated, getUser)

### 5. **Actualización de la Página de Inicio** (`/`)

- Botones de "Iniciar Sesión" y "Únete Ahora" en el navbar
- Enlaces actualizados para dirigir a las páginas correspondientes

## 🎨 Diseño

### Colores del tema:

- **Primario:** `#FF4500` (Naranja rojizo)
- **Secundario:** `#00ACC1` (Cyan)
- **Fondo oscuro:** `#121212` y `#1E1E1E`
- **Texto:** `#E0E0E0`

### Características visuales:

- Tema oscuro moderno
- Gradientes en headers de tarjetas
- Animaciones suaves en hover
- Diseño completamente responsive
- Bootstrap 5.3 para componentes
- Iconos de Lucide-Astro

## 🔐 Seguridad

- Tokens JWT almacenados en localStorage
- Verificación de autenticación en rutas protegidas
- Redirección automática si no está autenticado
- Logout seguro que limpia todo el almacenamiento local

## 🚀 Cómo Usar

### 1. Iniciar el Backend

```bash
cd NexoFit-Backend
npm start
```

### 2. Iniciar el Frontend

```bash
cd NexoFit-Frontend
npm run dev
```

### 3. Flujo de Usuario

1. Visitar `http://localhost:4321/`
2. Hacer clic en "Únete Ahora" o "Iniciar Sesión"
3. Registrar una cuenta nueva o iniciar sesión
4. Acceder al dashboard en `/dashboard`
5. Explorar clases disponibles
6. Reservar clases
7. Gestionar reservas desde "Mis Reservas"

## 📁 Estructura de Archivos Creados/Modificados

```
NexoFit-Frontend/src/
├── pages/
│   ├── index.astro          # Actualizado con nuevos enlaces
│   ├── login.astro          # Nueva página de login
│   ├── signup.astro         # Nueva página de registro
│   └── dashboard.astro      # Nuevo dashboard de clientes
└── utils/
    └── api.js               # Nueva utilidad para API
```

## 🔧 Tecnologías Utilizadas

- **Astro 5.17.1** - Framework principal
- **Bootstrap 5.3.8** - Componentes y estilos
- **Lucide-Astro** - Iconos
- **Fetch API** - Peticiones HTTP
- **LocalStorage** - Almacenamiento de sesión

## 📝 Notas de Implementación

### Buenas Prácticas Aplicadas:

1. **Separación de concerns:** API en archivo separado
2. **Reutilización de layout:** Uso del Layout.astro base
3. **Validación client-side:** Antes de enviar al backend
4. **Feedback al usuario:** Alertas y spinners de carga
5. **Responsive design:** Mobile-first con Bootstrap
6. **Accesibilidad:** Labels, ARIA attributes
7. **Manejo de errores:** Try-catch en todas las peticiones
8. **UX mejorada:** Transiciones, animaciones, estados de carga

### Pendiente (Mejoras futuras):

- Tests unitarios
- Internacionalización (i18n)
- PWA capabilities
- Cargos y facturación
- Perfil de usuario editable
- Historial de reservas pasadas
- Sistema de notificaciones
- Chat con instructores

## 🐛 Resolución de Problemas

### El login no funciona:

- Verificar que el backend esté corriendo en `http://localhost:8080`
- Revisar la consola del navegador para errores
- Verificar que la base de datos esté inicializada

### Las clases no se cargan:

- Asegurarse de que haya clases creadas en la base de datos
- Verificar el token de autenticación en localStorage
- Revisar la respuesta de la API en Network tab

### CORS errors:

- Verificar que el backend tenga CORS configurado correctamente
- Confirmar que el frontend esté en el puerto correcto

## 📞 API Endpoints Utilizados

```
POST   /api/auth/register      - Registro de usuario
POST   /api/auth/login         - Inicio de sesión
POST   /api/auth/refresh       - Refrescar token
GET    /api/classes            - Obtener todas las clases
GET    /api/classes/:id        - Obtener clase por ID
GET    /api/bookings           - Obtener reservas del usuario
POST   /api/bookings           - Crear nueva reserva
DELETE /api/bookings/:id       - Cancelar reserva
```
