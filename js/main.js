
const container = document.getElementById("container-vehiculos");
const mensaje = document.getElementById("mensaje");

function renderVehiculos() {
    container.innerHTML="";
    vehiculos.forEach((vehiculo)=>{
        const card = document.createElement("div");

        card.innerHTML=`
        <h3>${vehiculo.modelo}</h3>
        <p>Precio: $${vehiculo.precio}</p>
        <button data-id="${vehiculo.id}">Seleccionar</button>`;

        container.appendChild(card);
    })
}

container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const idVehiculo = parseInt(e.target.dataset.id);
        const vehiculoElegido = vehiculos.find(v => v.id === idVehiculo);
        localStorage.setItem("vehiculoSeleccionado", JSON.stringify(vehiculoElegido));
        mensaje.textContent = `Vehículo seleccionado: ${vehiculoElegido.modelo}`;
    }
});

renderVehiculos();

//function selectVehiculo(){
 //   const button = document.querySelectorAll("button[data-id]");

   // button.forEach((button)=>{
     //   button.addEventListener("click",()=>{
       //     const idVehiculo= parseInt(button.dataset.id)

         //   const vehiculoElegido = buscarVehiculo(idVehiculo);

           // localStorage.setItem("vehiculoSeleccionado",
             //   JSON.stringify(vehiculoElegido)
            //)
        //})
   // })
//}

//renderVehiculos();
//selectVehiculo();

//function buscarVehiculo(id){
  //  return vehiculos.find((vehiculo)=> vehiculo.id === id) || null;
//}

//function calcularPrecioFinal(precioBase, cuotas) {
  //  const intereses = {
    //    3: 0.10,
      //  6: 0.20,
        //12: 0.30
    //};

   // return intereses[cuotas]
     //   ? precioBase + (precioBase * intereses[cuotas])
       // : null;
//}

