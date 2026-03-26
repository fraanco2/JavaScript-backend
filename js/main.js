class Vehiculo {
    constructor(id, modelo, precio, img){
        this.id = id;
        this.modelo = modelo;
        this.precio = precio;
        this.img = img;
    }
}

const container = document.getElementById("container-vehiculos");
const mensaje = document.getElementById("mensaje");
const botonCarrito = document.getElementById("boton-carrito");

let vehiculos = [];

async function cargarVehiculos(){
    try{
        const response = await fetch("./data/vehiculos.json");
        const data = await response.json();
        vehiculos = data.map(v => new Vehiculo(v.id,v.modelo,v.precio,v.img));
        renderVehiculos();
        actualizarBotonCarrito();
    }catch(err){
        mensaje.textContent="Error cargando vehículos";
        console.warn(err);
    }
}

function renderVehiculos(){
    container.innerHTML="";
    vehiculos.forEach(v=>{
        const card=document.createElement("div");
        card.classList.add("card");
        card.innerHTML=`
            <div class="card-header">
                <h3>${v.modelo}</h3>
            </div>
            <div class="card-img">
                <img src="${v.img}" alt="${v.modelo}">
            </div>
            <div class="card-body">
                <p class="precio">${v.precio.toLocaleString('es-AR',{style:'currency',currency:'ARS'})}</p>
                <button class="btn-select" data-id="${v.id}">Agregar al carrito</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function toastNotificacion(text, tipo="info"){
    let color="#2196F3";
    if(tipo==="success") color="#4CAF50";
    if(tipo==="error") color="#f44336";
    Toastify({
        text,
        duration:3000,
        gravity:"top",
        position:"right",
        style:{background:color,color:"#fff",fontWeight:"bold",borderRadius:"8px"},
        close:true
    }).showToast();
}

container.addEventListener("click",e=>{
    if(e.target.matches("button[data-id]")){
        const id = parseInt(e.target.dataset.id);
        const vehiculoElegido = vehiculos.find(v=>v.id===id);
        if(!vehiculoElegido) return;

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const index = carrito.findIndex(v=>v.id===id);
        if(index!==-1){
            carrito[index].cantidad +=1;
        }else{
            carrito.push({...vehiculoElegido,cantidad:1});
        }
        localStorage.setItem("carrito",JSON.stringify(carrito));
        toastNotificacion(`Agregaste ${vehiculoElegido.modelo} al carrito`,"success");
        actualizarBotonCarrito();
    }
});

function actualizarBotonCarrito(){
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if(carrito.length>0){
        botonCarrito.innerHTML=`
            <button id="btn-comprar">Comprar (${carrito.length})</button>
            <button id="btn-vaciar">Vaciar carrito</button>
        `;
        document.getElementById("btn-comprar").addEventListener("click",()=>{
            window.location.href="./html/checkout.html";
        });
        document.getElementById("btn-vaciar").addEventListener("click",()=>{
            localStorage.removeItem("carrito");
            toastNotificacion("Carrito vaciado","success");
            actualizarBotonCarrito();
        });
        mensaje.textContent="";
    }else{
        botonCarrito.innerHTML="";
        mensaje.textContent="Tu carrito está vacío";
        mensaje.style.color="#f44336";
        mensaje.style.fontWeight="bold";
    }
}

cargarVehiculos();
actualizarBotonCarrito();