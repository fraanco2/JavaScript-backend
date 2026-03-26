const { DateTime } = luxon;

const formCompra = document.getElementById("form-compra");
const detalleVehiculo = document.getElementById("detalle-vehiculo");
const resumenCompra = document.getElementById("resumen-compra");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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

// ================= RENDER DEL CARRITO
function renderCarrito(){
    detalleVehiculo.innerHTML="";
    let totalBase=0;
    carrito.forEach(v=>{
        const subtotal = v.precio*v.cantidad;
        totalBase+=subtotal;
        let rutaImagen = v.img.replace("./imagenes/","../imagenes/");

        const div=document.createElement("div");
        div.classList.add("detalle-vehiculo-item");
        div.innerHTML=`
            <img src="${rutaImagen}" alt="${v.modelo}" class="vehiculo-img-checkout">
            <div class="vehiculo-info">
                <p>${v.modelo}</p>
                <p>Precio unitario: $${v.precio.toLocaleString()}</p>
                <p>Cantidad: ${v.cantidad}</p>
                <p>Subtotal: $${subtotal.toLocaleString()}</p>
            </div>
            <button class="eliminar-btn" data-id="${v.id}">Eliminar</button>
        `;
        detalleVehiculo.appendChild(div);
    });
    detalleVehiculo.innerHTML+=`<h3>Total base: $${totalBase.toLocaleString()}</h3>`;
}
renderCarrito();

// ================= ELIMINAR VEHÍCULO
detalleVehiculo.addEventListener("click",e=>{
    if(e.target.matches(".eliminar-btn")){
        const id = parseInt(e.target.dataset.id);
        carrito = carrito.map(v=>{
            if(v.id===id) v.cantidad-=1;
            return v;
        }).filter(v=>v.cantidad>0);
        localStorage.setItem("carrito",JSON.stringify(carrito));
        renderCarrito();
        toastNotificacion("Vehículo eliminado del carrito","success");
    }
});

// ================= CALCULO CUOTAS
function calcularTotalConCuotas(totalBase, cuotas){
    const intereses = {3:0.10,6:0.20,12:0.30};
    const tasa = intereses[cuotas] || 0;
    const total = totalBase + totalBase*tasa;
    const precioPorCuota = total / cuotas;
    return {total, precioPorCuota};
}

// ================= SUBMIT FORM
formCompra.addEventListener("submit",e=>{
    e.preventDefault();
    if(carrito.length===0) return;

    const cuotas = parseInt(document.getElementById("cuotas").value);
    const totalBase = carrito.reduce((acc,v)=> acc+v.precio*v.cantidad,0);
    const {total, precioPorCuota} = calcularTotalConCuotas(totalBase, cuotas);

    const carritoFinal = {items:carrito, totalBase, totalFinal:total, cuotas, precioPorCuota};
    localStorage.setItem("carritoFinal",JSON.stringify(carritoFinal));
    localStorage.removeItem("carrito"); // limpiar carrito temporal
    window.location.href="../html/confirm.html";
});