// CLASE VEHICULO
class Vehiculo {
    constructor(id, modelo, precio, img) {
        this.id = id;
        this.modelo = modelo;
        this.precio = precio;
        this.img = img;
    }
}

// ELEMENTOS DEL DOM

const container = document.getElementById("container-vehiculos");
const mensaje = document.getElementById("mensaje");

// Contenedor para botón dinámico de carrito
const botonCarrito = document.getElementById("boton-carrito");

// VARIABLES
let vehiculos = [];

// FETCH ASINCRÓNICO
async function cargarVehiculos() {
    try {
        const response = await fetch("./data/vehiculos.json");
        const data = await response.json();
        
        vehiculos = data.map(v => new Vehiculo(v.id, v.modelo, v.precio, v.img));
        renderVehiculos();
        actualizarBotonCarrito(); // mostrar botón si hay items en carrito
    } catch (error) {
        console.warn("Error al cargar vehículos:", error);
        mensaje.textContent = "Error cargando vehículos.";
    }
}

// RENDER DE TARJETAS
function renderVehiculos() {
    container.innerHTML = "";

    vehiculos.forEach((vehiculo) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-header">
                <h3>${vehiculo.modelo}</h3>
            </div>
            <div class="card-img">
                <img src="${vehiculo.img}" alt="${vehiculo.modelo}">
            </div>
            <div class="card-body">
                <p class="precio">${vehiculo.precio.toLocaleString('es-AR', {style:'currency',currency:'ARS'})}</p>
                <button class="btn-select" data-id="${vehiculo.id}">Agregar al carrito</button>
            </div>
        `;

        container.appendChild(card);
    });
}

// FUNCION PARA TOASTIFY
// Centraliza notificaciones con tipo y estilo
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

// EVENTO DELEGADO
container.addEventListener("click", (e) => {
    if (e.target.matches("button[data-id]")) {
        const idVehiculo = parseInt(e.target.dataset.id);
        const vehiculoElegido = vehiculos.find(v => v.id === idVehiculo);

        if (!vehiculoElegido) return;

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(vehiculoElegido);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        toastNotificacion(`Agregaste ${vehiculoElegido.modelo} al carrito`, "success");

        actualizarBotonCarrito(); 
    }
});

// BOTON DINÁMICO DE CARRITO
function actualizarBotonCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length > 0) {
        botonCarrito.innerHTML = `
            <button id="btn-comprar">Comprar (${carrito.length})</button>
        `;

        document.getElementById("btn-comprar").addEventListener("click", () => {
            window.location.href = "./html/checkout.html";
        });

        mensaje.textContent = ""; 
    } else {
        botonCarrito.innerHTML = "";
        mensaje.textContent = "Tu carrito está vacío";
        mensaje.style.color = "#f44336";
        mensaje.style.fontWeight = "bold";
    }
}

cargarVehiculos();
actualizarBotonCarrito();