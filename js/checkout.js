const formCompra = document.getElementById("form-compra");
const resumenCompra = document.getElementById("resumen-compra");

formCompra.addEventListener("submit", (e) => {
    e.preventDefault();

    const vehiculo = obtenerVehiculoStorage();
    const cuotas = obtenerCuotas();

    if (!vehiculo || !cuotas) {
        mostrarMensajeError();
        return;
    }

    const precioFinal = calcularPrecioFinal(vehiculo.precio, cuotas);

    mostrarResumen(vehiculo, cuotas, precioFinal);
    limpiarStorage();
});

function obtenerVehiculoStorage() {
    return JSON.parse(localStorage.getItem("vehiculoSeleccionado"));
}

function obtenerCuotas() {
    const selectCuotas = document.getElementById("cuotas");
    return parseInt(selectCuotas.value);
}

function mostrarResumen(vehiculo, cuotas, total) {
    resumenCompra.innerHTML = `
        <h2>Resumen de compra</h2>
        <p><strong>Vehículo:</strong> ${vehiculo.modelo}</p>
        <p><strong>Precio base:</strong> $${vehiculo.precio}</p>
        <p><strong>Cuotas:</strong> ${cuotas}</p>
        <p><strong>Total a pagar:</strong> $${total}</p>
    `;
}

function mostrarMensajeError() {
    resumenCompra.innerHTML = `
        <p>No se pudo procesar la compra. Seleccioná un vehículo.</p>
    `;
}

function limpiarStorage() {
    localStorage.removeItem("vehiculoSeleccionado");
}
