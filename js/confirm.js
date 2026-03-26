const { DateTime } = luxon;
const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");
const botonVolver = document.getElementById("volver-inicio");

const confirmData = JSON.parse(localStorage.getItem("carritoFinal"));

if(confirmData && confirmData.items.length>0){

    let html = `<h2>¡Gracias por tu compra!</h2>
                <p>Cuotas: ${confirmData.cuotas} x $${confirmData.precioPorCuota.toLocaleString()}</p>`;

    confirmData.items.forEach(v=>{
        html += `
        <div class="detalle-vehiculo-item">
            <img src="${v.img.replace('./imagenes/','../imagenes/')}" 
                 class="vehiculo-img-checkout" 
                 alt="${v.modelo}">
            
            <div class="vehiculo-info">
                <p><strong>${v.modelo}</strong></p>
                <p>$${v.precio.toLocaleString()} x ${v.cantidad}</p>
                <p>Subtotal: $${(v.precio*v.cantidad).toLocaleString()}</p>
            </div>
        </div>
        `;
    });

    html += `<h3>Total pagado: $${confirmData.totalFinal.toLocaleString()}</h3>`;

    mensajeConfirmacion.innerHTML = html;

    localStorage.removeItem("carritoFinal");

    Toastify({
        text:"Compra completada exitosamente",
        duration:3000,
        gravity:"top",
        position:"right",
        style:{background:"#4CAF50",color:"#fff",fontWeight:"bold",borderRadius:"8px"},
        close:true
    }).showToast();

} else {
    mensajeConfirmacion.innerHTML = "<p>No se encontraron datos de compra.</p>";
}

botonVolver.addEventListener("click",()=>{
    window.location.href="../index.html";
});