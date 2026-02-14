function obtenerVehiculoStorage() {
    return JSON.parse(localStorage.getItem("vehiculoSeleccionado"));
}

const formCompra = document.getElementById("form-compra");
const detalleVehiculo = document.getElementById("detalle-vehiculo");
const resumenCompra = document.getElementById("resumen-compra");

const vehiculo = obtenerVehiculoStorage();

if (vehiculo) {
    detalleVehiculo.innerHTML = `
        <h3>${vehiculo.modelo}</h3>
        <p>Precio base: $${vehiculo.precio}</p>
    `;
} else {
    detalleVehiculo.innerHTML = "<p>No hay vehículo seleccionado.</p>";
    formCompra.querySelector("button[type='submit']").disabled = true;
}

function calcularPrecioFinal(precioBase, cuotas) {
    const intereses = {
        3: 0.10,
        6: 0.20,
        12: 0.30
    };
    return intereses[cuotas]
        ? precioBase + precioBase * intereses[cuotas]
        : precioBase;
}

function limpiarStorage() {
    localStorage.removeItem("vehiculoSeleccionado");
}

function mostrarResumen(vehiculo, cuotas, total) {
    resumenCompra.innerHTML = `
        <h2>Resumen de compra</h2>
        <p><strong>Vehículo:</strong> ${vehiculo.modelo}</p>
        <p><strong>Precio base:</strong> $${vehiculo.precio}</p>
        <p><strong>Cuotas:</strong> ${cuotas}</p>
        <p><strong>Total a pagar:</strong> $${total}</p>
        <p>¡Compra finalizada con éxito!</p>
    `;
}

function mostrarMensajeError() {
    resumenCompra.innerHTML = `<p>No se pudo procesar la compra. Seleccioná un vehículo.</p>`;
}

formCompra.addEventListener("submit", (e) => {
    e.preventDefault();

    const cuotasSelect = document.getElementById("cuotas");
    const cuotas = parseInt(cuotasSelect.value);

    if (!vehiculo || !cuotas) {
        mostrarMensajeError();
        return;
    }

    const precioFinal = calcularPrecioFinal(vehiculo.precio, cuotas);

    mostrarResumen(vehiculo, cuotas, precioFinal);

    limpiarStorage();

    formCompra.querySelector("button[type='submit']").disabled = true;
});
