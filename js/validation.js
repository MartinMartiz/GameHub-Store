// Manejador principal de validaciones
document.addEventListener("DOMContentLoaded", () => {
    inicializarValidacionCheckout();
    inicializarValidacionFiltros();
});

// 1. Validaciones para el Formulario de Checkout (Datos de despacho)
function inicializarValidacionCheckout() {
    const formCheckout = document.getElementById("form-checkout");
    if (!formCheckout) return;

    formCheckout.addEventListener("submit", (e) => {
        let esValido = true;

        // Campos a validar
        const nombre = document.getElementById("nombre");
        const email = document.getElementById("email");
        const telefono = document.getElementById("telefono");
        const direccion = document.getElementById("direccion");

        // Reglas de validación
        if (nombre && nombre.value.trim().length < 3) {
            mostrarError(nombre, "El nombre debe tener al menos 3 caracteres.");
            esValido = false;
        } else {
            limpiarError(nombre);
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !regexEmail.test(email.value.trim())) {
            mostrarError(email, "Ingrese un correo electrónico válido.");
            esValido = false;
        } else {
            limpiarError(email);
        }

        const regexTelefono = /^[0-9]{9,}$/;
        if (telefono && !regexTelefono.test(telefono.value.trim())) {
            mostrarError(telefono, "El teléfono debe contener al menos 9 números.");
            esValido = false;
        } else {
            limpiarError(telefono);
        }

        if (direccion && direccion.value.trim() === "") {
            mostrarError(direccion, "La dirección de despacho es obligatoria.");
            esValido = false;
        } else {
            limpiarError(direccion);
        }

        // Si hay errores, se bloquea el envío
        if (!esValido) {
            e.preventDefault();
        } else {
            e.preventDefault(); // Simulación para EP1
            alert("¡Orden enviada con éxito!");
        }
    });
}

// 2. Validaciones para el Formulario de Filtros de Catálogo (Rangos de precio)
function inicializarValidacionFiltros() {
    const formFiltro = document.getElementById("form-filtro");
    if (!formFiltro) return;

    const minInput = document.getElementById("precio-min");
    const maxInput = document.getElementById("precio-max");
    const contenedorError = document.getElementById("error-filtro-precio");

    const validarRangos = () => {
        const min = parseFloat(minInput.value) || 0;
        const max = parseFloat(maxInput.value) || Infinity;

        if (min < 0 || max < 0) {
            contenedorError.textContent = "Los precios no pueden ser valores negativos.";
            return false;
        } else if (min > max) {
            contenedorError.textContent = "El precio mínimo no puede ser mayor que el máximo.";
            return false;
        } else {
            contenedorError.textContent = "";
            return true;
        }
    };

    if (minInput && maxInput) {
        minInput.addEventListener("input", validarRangos);
        maxInput.addEventListener("input", validarRangos);
    }
}

// Funciones auxiliares para manipular el DOM
function mostrarError(elemento, mensaje) {
    let errorSpan = elemento.nextElementSibling;
    
    // Si no existe el contenedor de error, se crea dinámicamente
    if (!errorSpan || !errorSpan.classList.contains("mensaje-error")) {
        errorSpan = document.createElement("span");
        errorSpan.className = "mensaje-error";
        elemento.parentNode.insertBefore(errorSpan, elemento.nextSibling);
    }
    
    errorSpan.textContent = mensaje;
    elemento.style.borderColor = "var(--color-error)";
}

function limpiarError(elemento) {
    let errorSpan = elemento.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains("mensaje-error")) {
        errorSpan.textContent = "";
    }
    elemento.style.borderColor = "";
}
