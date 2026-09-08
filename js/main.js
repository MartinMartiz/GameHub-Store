// ==========================================
// 1. INICIO Y PRODUCTOS DESTACADOS
// ==========================================
function cargarProductosDestacados() {
  const contenedor = document.getElementById("contenedor-destacados");
  if (!contenedor) return;

  const destacados = productos.filter(p => p.destacado);
  contenedor.innerHTML = "";

  destacados.forEach(prod => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-producto");

    const sinStock = prod.stock === 0;
    const textoBoton = sinStock ? "Sin Stock" : "Agregar al Carrito";
    const estadoBoton = sinStock ? "disabled" : "";

    const precioHTML = prod.precioOferta
      ? `<p class="precio"><del style="color: #888; font-size: 0.85rem;">$${prod.precio.toLocaleString("es-CL")}</del> <strong>$${prod.precioOferta.toLocaleString("es-CL")}</strong></p>`
      : `<p class="precio">$${prod.precio.toLocaleString("es-CL")}</p>`;

    tarjeta.innerHTML = `
      <a href="detalle.html?id=${prod.id}">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
      </a>
      <p class="descripcion">${prod.descripcion}</p>
      ${precioHTML}
      <button class="boton-primario" ${estadoBoton} onclick="agregarAlCarrito(${prod.id})">${textoBoton}</button>
      <a href="detalle.html?id=${prod.id}" style="display: block; margin-top: 0.5rem; text-align: center; color: var(--color-acento);">Ver detalle</a>
    `;

    contenedor.appendChild(tarjeta);
  });
}

// ==========================================
// 2. CATÁLOGO Y FILTROS
// ==========================================
function poblarFiltroCategorias() {
  const selectCat = document.getElementById("filtro-categoria");
  if (!selectCat || selectCat.children.length > 1) return;

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.nombre;
    selectCat.appendChild(option);
  });
}

function renderizarCatalogo() {
  const contenedor = document.getElementById("contenedor-catalogo");
  if (!contenedor) return;

  poblarFiltroCategorias();

  const categoriaSel = document.getElementById("filtro-categoria").value;
  const precioMin = parseFloat(document.getElementById("precio-min").value) || 0;
  const precioMax = parseFloat(document.getElementById("precio-max").value) || Infinity;
  const ordenSel = document.getElementById("filtro-orden").value;
  const errorFiltro = document.getElementById("error-filtro-precio");

  if (precioMin > precioMax) {
    if (errorFiltro) errorFiltro.textContent = "El precio mínimo no puede ser mayor que el máximo.";
    return;
  } else if (errorFiltro) {
    errorFiltro.textContent = "";
  }

  let filtrados = productos.filter(p => {
    const coincideCat = categoriaSel === "todas" || p.categoria === categoriaSel;
    const precioEfectivo = p.precioOferta ? p.precioOferta : p.precio;
    const coincidePrecio = precioEfectivo >= precioMin && precioEfectivo <= precioMax;
    return coincideCat && coincidePrecio;
  });

  filtrados.sort((a, b) => {
    const pA = a.precioOferta ? a.precioOferta : a.precio;
    const pB = b.precioOferta ? b.precioOferta : b.precio;
    if (ordenSel === "precio-asc") return pA - pB;
    if (ordenSel === "precio-desc") return pB - pA;
    if (ordenSel === "nombre-asc") return a.nombre.localeCompare(b.nombre);
    if (ordenSel === "nombre-desc") return b.nombre.localeCompare(a.nombre);
    return 0;
  });

  contenedor.innerHTML = "";

  if (filtrados.length === 0) {
    contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No se encontraron productos.</p>`;
    return;
  }

  filtrados.forEach(prod => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-producto");

    const sinStock = prod.stock === 0;
    const textoBoton = sinStock ? "Agotado" : "Agregar al Carrito";
    const estadoBoton = sinStock ? "disabled" : "";

    const precioHTML = prod.precioOferta
      ? `<p class="precio"><del style="color: #888; font-size: 0.85rem;">$${prod.precio.toLocaleString("es-CL")}</del> <strong>$${prod.precioOferta.toLocaleString("es-CL")}</strong></p>`
      : `<p class="precio">$${prod.precio.toLocaleString("es-CL")}</p>`;

    tarjeta.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p class="descripcion">${prod.descripcion}</p>
      ${precioHTML}
      <button class="boton-primario" ${estadoBoton} onclick="agregarAlCarrito(${prod.id})">${textoBoton}</button>
      <a href="detalle.html?id=${prod.id}" style="display: block; margin-top: 0.5rem; text-align: center; color: var(--color-acento);">Ver detalle</a>
    `;

    contenedor.appendChild(tarjeta);
  });
}

// ==========================================
// 3. DETALLE DE PRODUCTO
// ==========================================
function cargarDetalleProducto() {
  const contenedor = document.getElementById("contenedor-detalle");
  if (!contenedor) return;

  const params = new URLSearchParams(window.location.search);
  const idProd = parseInt(params.get("id"));
  const prod = productos.find(p => p.id === idProd);

  if (!prod) {
    contenedor.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  const precioHTML = prod.precioOferta
    ? `<p><del style="color: #888;">$${prod.precio.toLocaleString("es-CL")}</del> <strong>$${prod.precioOferta.toLocaleString("es-CL")}</strong></p>`
    : `<p><strong>$${prod.precio.toLocaleString("es-CL")}</strong></p>`;

  contenedor.innerHTML = `
    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
      <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 300px; max-width: 100%;">
      <div>
        <h2>${prod.nombre}</h2>
        <p>${prod.descripcion}</p>
        ${precioHTML}
        <p>Stock disponible: ${prod.stock}</p>
        <button class="boton-primario" ${prod.stock === 0 ? "disabled" : ""} onclick="agregarAlCarrito(${prod.id})">
          ${prod.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// 4. MANEJO DEL CARRITO DE COMPRAS
// ==========================================
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito_gamehub")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito_gamehub", JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto, cantidad = 1) {
  const prod = productos.find(p => p.id === idProducto);
  if (!prod) return;

  let carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === idProducto);

  if (index !== -1) {
    const nuevaCantidad = carrito[index].cantidad + cantidad;
    if (nuevaCantidad > prod.stock) {
      alert(`No puedes agregar más de ${prod.stock} unidades.`);
      return;
    }
    carrito[index].cantidad = nuevaCantidad;
  } else {
    if (cantidad > prod.stock) {
      alert(`No puedes agregar más de ${prod.stock} unidades.`);
      return;
    }
    carrito.push({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precioOferta ? prod.precioOferta : prod.precio,
      imagen: prod.imagen,
      stock: prod.stock,
      cantidad: cantidad
    });
  }

  guardarCarrito(carrito);
  alert(`"${prod.nombre}" fue agregado al carrito.`);
  renderizarCarrito();
}

function renderizarCarrito() {
  const contenedorLineas = document.getElementById("lineas-carrito");
  const contenedorResumen = document.getElementById("resumen-carrito");
  const mensajeVacio = document.getElementById("carrito-vacio");

  if (!contenedorLineas || !contenedorResumen || !mensajeVacio) return;

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedorLineas.innerHTML = "";
    contenedorResumen.style.display = "none";
    mensajeVacio.style.display = "block";
    return;
  }

  mensajeVacio.style.display = "none";
  contenedorResumen.style.display = "block";
  contenedorLineas.innerHTML = "";

  carrito.forEach(item => {
    const subtotalLinea = item.precio * item.cantidad;
    const fila = document.createElement("article");
    fila.classList.add("tarjeta-producto");
    fila.style.marginBottom = "1rem";

    fila.innerHTML = `
      <div style="display: flex; gap: 1rem; align-items: center; justify-content: space-between; flex-wrap: wrap;">
        <img src="${item.imagen}" alt="${item.nombre}" style="width: 80px; height: auto;">
        <div style="flex: 1; min-width: 200px;">
          <h3>${item.nombre}</h3>
          <p>Precio Unitario: $${item.precio.toLocaleString("es-CL")}</p>
        </div>
        <div>
          <label for="cant-${item.id}">Cantidad:</label>
          <input type="number" id="cant-${item.id}" value="${item.cantidad}" min="1" max="${item.stock}" 
                 onchange="actualizarCantidad(${item.id}, this.value)" style="width: 60px; padding: 0.3rem;">
        </div>
        <p><strong>Subtotal: $${subtotalLinea.toLocaleString("es-CL")}</strong></p>
        <button class="boton-primario" type="button" onclick="eliminarDelCarrito(${item.id})" style="background-color: var(--color-error); color: white;">
          Quitar
        </button>
      </div>
    `;

    contenedorLineas.appendChild(fila);
  });

  calcularTotalesCarrito();
}

function actualizarCantidad(idProducto, nuevaCant) {
  let cantidad = parseInt(nuevaCant);
  let carrito = obtenerCarrito();
  const item = carrito.find(p => p.id === idProducto);

  if (!item) return;

  if (isNaN(cantidad) || cantidad < 1) {
    cantidad = 1;
  } else if (cantidad > item.stock) {
    alert(`La cantidad no puede superar el stock disponible (${item.stock}).`);
    cantidad = item.stock;
  }

  item.cantidad = cantidad;
  guardarCarrito(carrito);
  renderizarCarrito();
}

function eliminarDelCarrito(idProducto) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(p => p.id !== idProducto);
  guardarCarrito(carrito);
  renderizarCarrito();
}

function vaciarCarrito() {
  if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
    localStorage.removeItem("carrito_gamehub");
    sessionStorage.removeItem("cupon_aplicado");
    renderizarCarrito();
  }
}

function aplicarCuponDescuento() {
  const inputCupon = document.getElementById("input-cupon");
  const mensajeCupon = document.getElementById("mensaje-cupon");
  if (!inputCupon || !mensajeCupon) return;

  const codigo = inputCupon.value.trim().toUpperCase();
  const cuponEncontrado = cupones.find(c => c.codigo === codigo && c.activo);

  if (cuponEncontrado) {
    sessionStorage.setItem("cupon_aplicado", JSON.stringify(cuponEncontrado));
    mensajeCupon.style.color = "var(--color-acento)";
    mensajeCupon.textContent = `¡Cupón ${cuponEncontrado.codigo} aplicado! (${cuponEncontrado.porcentaje}% de descuento)`;
  } else {
    sessionStorage.removeItem("cupon_aplicado");
    mensajeCupon.style.color = "var(--color-error)";
    mensajeCupon.textContent = "Cupón inválido o inexistente.";
  }

  calcularTotalesCarrito();
}

function calcularTotalesCarrito() {
  const carrito = obtenerCarrito();
  const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  let descuento = 0;

  const cuponGuardado = JSON.parse(sessionStorage.getItem("cupon_aplicado"));
  if (cuponGuardado) {
    descuento = Math.round((subtotal * cuponGuardado.porcentaje) / 100);
    if (descuento > cuponGuardado.tope) {
      descuento = cuponGuardado.tope;
    }
  }

  const total = Math.max(0, subtotal - descuento);

  const subtotalEl = document.getElementById("resumen-subtotal");
  const descuentoEl = document.getElementById("resumen-descuento");
  const totalEl = document.getElementById("resumen-total");

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString("es-CL")}`;
  if (descuentoEl) descuentoEl.textContent = `-$${descuento.toLocaleString("es-CL")}`;
  if (totalEl) totalEl.textContent = `$${total.toLocaleString("es-CL")}`;
}

// ==========================================
// 5. MIS ÓRDENES
// ==========================================
function renderizarMisOrdenes() {
  const contenedor = document.getElementById("contenedor-ordenes");
  if (!contenedor) return;

  const ordenes = JSON.parse(localStorage.getItem("ordenes_gamehub")) || [];

  if (ordenes.length === 0) {
    contenedor.innerHTML = "<p>No tienes órdenes registradas todavía.</p>";
    return;
  }

  contenedor.innerHTML = "";
  ordenes.forEach(ord => {
    const elem = document.createElement("div");
    elem.classList.add("tarjeta-producto");
    elem.style.marginBottom = "1rem";
    elem.innerHTML = `
      <h3>Órden #${ord.id}</h3>
      <p>Fecha: ${ord.fecha}</p>
      <p>Total pagado: $${ord.total.toLocaleString("es-CL")}</p>
      <p>Estado: <strong>${ord.estado}</strong></p>
    `;
    contenedor.appendChild(elem);
  });
}

// ==========================================
// 6. INICIALIZACIÓN POR VISTA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  cargarProductosDestacados();
  renderizarCatalogo();
  cargarDetalleProducto();
  renderizarCarrito();
  renderizarMisOrdenes();
});
