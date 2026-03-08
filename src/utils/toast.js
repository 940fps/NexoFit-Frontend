/**
 * Sistema global de toasts para NexoFit
 * Usa Bootstrap 5 Toasts para mostrar notificaciones
 */

let toastContainer = null;

/**
 * Inicializar el contenedor de toasts
 */
export function initToastContainer() {
  if (toastContainer) return;

  toastContainer = document.createElement("div");
  toastContainer.id = "nexofit-toast-container";
  toastContainer.className = "toast-container position-fixed top-0 end-0 p-3";
  toastContainer.style.zIndex = "9999";
  document.body.appendChild(toastContainer);
}

/**
 * Mostrar un toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de toast: success, error, warning, info
 * @param {number} duration - Duración en ms (0 para no auto-cerrar)
 */
export function showToast(message, type = "info", duration = 5000) {
  // Asegurar que el contenedor existe
  if (!toastContainer) {
    initToastContainer();
  }

  // Configuración de iconos y colores según el tipo
  const config = {
    success: {
      icon: "✓",
      bgClass: "bg-success",
      title: "Éxito",
      borderColor: "#10b981",
    },
    error: {
      icon: "✗",
      bgClass: "bg-danger",
      title: "Error",
      borderColor: "#ef4444",
    },
    warning: {
      icon: "⚠",
      bgClass: "bg-warning",
      title: "Advertencia",
      borderColor: "#f59e0b",
    },
    info: {
      icon: "ℹ",
      bgClass: "bg-info",
      title: "Información",
      borderColor: "#3b82f6",
    },
  };

  const toastConfig = config[type] || config.info;

  // Crear el elemento del toast
  const toastId = `toast-${Date.now()}`;
  const toastElement = document.createElement("div");
  toastElement.id = toastId;
  toastElement.className = "toast";
  toastElement.setAttribute("role", "alert");
  toastElement.setAttribute("aria-live", "assertive");
  toastElement.setAttribute("aria-atomic", "true");
  toastElement.style.minWidth = "300px";
  toastElement.style.borderLeft = `4px solid ${toastConfig.borderColor}`;
  toastElement.style.animation = "slideInRight 0.3s ease-out";

  toastElement.innerHTML = `
    <div class="toast-header ${toastConfig.bgClass} text-white">
      <strong class="me-auto d-flex align-items-center gap-2">
        <span style="font-size: 1.2rem;">${toastConfig.icon}</span>
        ${toastConfig.title}
      </strong>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" style="background-color: var(--bg-secondary); color: var(--text-primary); border-bottom-left-radius: 0.375rem; border-bottom-right-radius: 0.375rem;">
      ${message}
    </div>
  `;

  // Agregar al contenedor
  toastContainer.appendChild(toastElement);

  // Inicializar el toast de Bootstrap
  const bsToast = new bootstrap.Toast(toastElement, {
    autohide: duration > 0,
    delay: duration,
  });

  // Mostrar el toast
  bsToast.show();

  // Eliminar el elemento del DOM cuando se oculte
  toastElement.addEventListener("hidden.bs.toast", () => {
    toastElement.remove();
  });

  return toastId;
}

/**
 * Mostrar toast de éxito
 */
export function showSuccess(message, duration = 5000) {
  return showToast(message, "success", duration);
}

/**
 * Mostrar toast de error
 */
export function showError(message, duration = 5000) {
  return showToast(message, "error", duration);
}

/**
 * Mostrar toast de advertencia
 */
export function showWarning(message, duration = 5000) {
  return showToast(message, "warning", duration);
}

/**
 * Mostrar toast de información
 */
export function showInfo(message, duration = 5000) {
  return showToast(message, "info", duration);
}

// Agregar animaciones CSS para los toasts
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
