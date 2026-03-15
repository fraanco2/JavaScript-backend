// IMPORTAR LUXON

const { DateTime } = luxon;


// ELEMENTOS DEL DOM

const formCompra = document.getElementById("form-compra");
const detalleVehiculo = document.getElementById("detalle-vehiculo");
const resumenCompra = document.getElementById("resumen-compra");

// FUNCION PARA OBTENER CARRITO

function obtenerCarritoStorage() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// FUNCION TOASTIFY

function toastNotificacion(text, tipo="info"){
    let color = "#2196F3"; // azul
    if(tipo === "success") color = "#4CAF50";
    if(tipo === "error") color = "#f44336";

    Toastify({
        text: text,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: color,
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
        },
        close:true
    }).showToast();
}

// MOSTRAR DETALLES DEL CARRITO

const carrito = obtenerCarritoStorage();

if(carrito.length > 0) {
    let totalBase = 0;
    detalleVehiculo.innerHTML = "";

    carrito.forEach(v => {
        totalBase += v.precio;

        let rutaImagen = v.img.replace("./imagenes/", "../imagenes/");

        detalleVehiculo.innerHTML += `
            <div class="detalle-vehiculo-item">
                <img src="${rutaImagen}" alt="${v.modelo}" class="vehiculo-img-checkout">
                <p>${v.modelo} - $${v.precio.toLocaleString()}</p>
            </div>
        `;
    });

    detalleVehiculo.innerHTML += `<h3>Total base: $${totalBase.toLocaleString()}</h3>`;
} else {
    detalleVehiculo.innerHTML = "<p>No hay vehículos en el carrito.</p>";
    formCompra.querySelector("button[type='submit']").disabled = true;
}

// FUNCION PARA CALCULO DE CUOTAS
// precioBase: suma de precios de todos los vehículos en el carrito
// cuotas: número de cuotas seleccionado por el usuario
// Devuelve un objeto con total a pagar y precio por cuota

function calcularPrecioFinal(precioBase, cuotas) {
    const intereses = { 3: 0.10, 6: 0.20, 12: 0.30 };
    const tasa = intereses[cuotas] || 0;

    const total = precioBase + (precioBase * tasa);
    const precioPorCuota = total / cuotas;

    return { total, precioPorCuota };
}

// FUNCION PARA MOSTRAR RESUMEN FINAL
// Muestra los vehículos seleccionados, total, cuotas y fecha de compra
// También limpia el carrito y muestra notificación

function mostrarResumenFinal(carrito, cuotas) {
    let totalBase = carrito.reduce((acc, v) => acc + v.precio, 0);
    const { total, precioPorCuota } = calcularPrecioFinal(totalBase, cuotas);
    const fechaCompra = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

    // RENDER VEHICULOS CON IMAGENES
    let html = `<h2>Resumen de compra</h2>`;
    carrito.forEach(v => {
        let rutaImagen = v.img.replace("./imagenes/", "../imagenes/");

        html += `
            <div class="detalle-vehiculo-item">
                <img src="${rutaImagen}" alt="${v.modelo}" class="vehiculo-img-checkout">
                <p>${v.modelo} - $${v.precio.toLocaleString()}</p>
            </div>
        `;
    });

    html += `
        <h3>Total: $${total.toLocaleString()}</h3>
        <p>Cuotas: ${cuotas} x $${precioPorCuota.toLocaleString()}</p>
        <p>Fecha de compra: ${fechaCompra}</p>
        <p>¡Compra finalizada con éxito!</p>
    `;

    resumenCompra.innerHTML = html;

    toastNotificacion("Compra finalizada con éxito", "success");

    // RESET carrito
    localStorage.removeItem("carrito");
    formCompra.querySelector("button[type='submit']").disabled = true;

    // VUELTA AUTOMÁTICA AL INICIO DESPUÉS DE 5 SEGUNDOS
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 5000);
}

// EVENTO SUBMIT

formCompra.addEventListener("submit", (e) => {
    e.preventDefault();

    const cuotas = parseInt(document.getElementById("cuotas").value);

    if (carrito.length === 0 || !cuotas) {
        resumenCompra.innerHTML = "<p>No se pudo procesar la compra. El carrito está vacío o cuotas no válidas.</p>";
        toastNotificacion("No se pudo procesar la compra", "error");
        return;
    }

    mostrarResumenFinal(carrito, cuotas);
});
