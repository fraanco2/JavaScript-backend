const vehiculos = [
    {

      id:1,
      modelo:"Peugeot",
      precio:20000,
},
{
    id:2,
    modelo:"Chevrolet",
    precio:12000,
},
{
    id:3,
    modelo:"Fiat",
    precio:8000,
},
{
    id:4,
    modelo:"Volvo",
    precio:25000,
}

]

const container = document.getElementById("container-vehiculos");

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

function selectVehiculo(){
    const button = document.querySelectorAll("button[data-id]");

    button.forEach((button)=>{
        button.addEventListener("click",()=>{
            const idVehiculo= parseInt(button.dataset.id)

            console.log("ID seleccionado:", idVehiculo);

            const vehiculoElegido = buscarVehiculo(idVehiculo);

            console.log("Vehiculo elegido", vehiculoElegido);

            localStorage.setItem("vehiculoSeleccionado",
                JSON.stringify(vehiculoElegido)
            )
        })
    })
}

renderVehiculos();
selectVehiculo();

function buscarVehiculo(id){
    return vehiculos.find((vehiculo)=> vehiculo.id === id) || null;
}

function calcularPrecioFinal(precioBase, cuotas) {
    const intereses = {
        3: 0.10,
        6: 0.20,
        12: 0.30
    };

    return intereses[cuotas]
        ? precioBase + (precioBase * intereses[cuotas])
        : null;
}

