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

    tarjeta.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p class="descripcion">${prod.descripcion}</p>
      <p class="precio">$${prod.precio.toLocaleString("es-CL")}</p>
      <button class="boton-primario" ${estadoBoton}>${textoBoton}</button>
    `;

    contenedor.appendChild(tarjeta);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductosDestacados();
});