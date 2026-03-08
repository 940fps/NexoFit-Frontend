// API Base URL
const API_BASE_URL = "http://localhost:8080/api";

// LocalStorage keys
const TOKEN_KEY = "nexofit_token";
const REFRESH_TOKEN_KEY = "nexofit_refresh_token";
const USER_KEY = "nexofit_user";

/**
 * Guardar datos de autenticación
 */
export function saveAuth(token, refreshToken, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Obtener token de acceso
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Obtener usuario actual (convierte snake_case a camelCase para compatibilidad)
 */
export function getUser() {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;

  const user = JSON.parse(userStr);

  // Convertir snake_case a camelCase para compatibilidad con el frontend
  return {
    ...user,
    firstName: user.first_name || user.firstName,
    lastName: user.last_name || user.lastName,
    birthDate: user.birth_date || user.birthDate,
    isActive: user.is_active || user.isActive,
    createdAt: user.created_at || user.createdAt,
    imageUrl: user.image_url || user.imageUrl,
  };
}

/**
 * Verificar si está autenticado
 */
export function isAuthenticated() {
  return !!getToken();
}

/**
 * Cerrar sesión
 */
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = "/login";
}

/**
 * Hacer request a la API
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Si la respuesta no es JSON, manejar error
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: "Error en la respuesta del servidor" };
    }

    if (!response.ok) {
      // Si es error 401 (no autorizado), limpiar sesión y redirigir
      if (response.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        // Redirigir inmediatamente sin lanzar error
        setTimeout(() => {
          window.location.href = "/login";
        }, 100);

        throw new Error("Sesión expirada");
      }

      throw new Error(data.message || "Error en la petición");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// ============ AUTH API ============

/**
 * Registrar nuevo usuario
 */
export async function register(userData) {
  const data = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  // Auto-login después del registro exitoso
  if (data.success && data.data) {
    saveAuth(data.data.accessToken, data.data.refreshToken, data.data.user);
  }

  return data;
}

/**
 * Iniciar sesión
 */
export async function login(email, password) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.success && data.data) {
    saveAuth(data.data.accessToken, data.data.refreshToken, data.data.user);
  }

  return data;
}

/**
 * Refrescar token
 */
export async function refreshToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const data = await apiRequest("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  if (data.success && data.data) {
    // Actualizar tokens en localStorage
    localStorage.setItem(TOKEN_KEY, data.data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken);
  }

  return data;
}

// ============ CLASSES API ============

/**
 * Obtener todas las clases
 */
export async function getClasses() {
  return apiRequest("/classes");
}

/**
 * Obtener clase por ID
 */
export async function getClassById(id) {
  return apiRequest(`/classes/${id}`);
}

// ============ BOOKINGS API ============

/**
 * Obtener todas las reservas
 */
export async function getBookings() {
  return apiRequest("/bookings");
}

/**
 * Crear nueva reserva
 */
export async function createBooking(bookingData) {
  return apiRequest("/bookings", {
    method: "POST",
    body: JSON.stringify(bookingData),
  });
}

/**
 * Obtener reserva por ID
 */
export async function getBookingById(id) {
  return apiRequest(`/bookings/${id}`);
}

/**
 * Eliminar reserva
 */
export async function deleteBooking(id) {
  return apiRequest(`/bookings/${id}`, {
    method: "DELETE",
  });
}

// ============ MODALITIES API ============

/**
 * Obtener todas las modalidades
 */
export async function getModalities() {
  return apiRequest("/modalities");
}

// ============ CATEGORIES API ============

/**
 * Obtener todas las categorías
 */
export async function getCategories() {
  return apiRequest("/categories");
}
