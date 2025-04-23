let tareas = []; //Array de objetos donde se guardan las tareas
let tarjetas = tareas;
let contenedor = document.getElementById("contenedor");
let id = 1; //Variable que se utiliza para asignar un id unico a cada tarea
const ordenPrioridad ={
    alta: 1,
    media: 2,
    baja: 3
} //Ordena las prioridades de menor a mayor
function crear(){ //Crea la tarea y la agrega al contenedor
    event.preventDefault();
    
    let titulo = document.getElementById("titulo").value;
    let prioridad = document.getElementById("prioridad").value;
    let categoria = document.getElementById("categoria").value;
    let tarea = {
        id: id++,
        titulo,
        prioridad,
        categoria,
        estado: "Pendiente"
    };
    tareas.push(tarea);

    alert("Tarea creada con exito");
    
    document.getElementById("form").reset()


    agregarLista();
}
function agregarLista(){ //Imprime los elementos en el contenedor
    let categoria = document.getElementById("filtro").value;
    console.log(categoria)
    if(categoria != "todos"){//Asegura que al crear una nueva tarjeta teniendo seleccionada una categoria diferente a "todos" se imprima la tarjeta en la categoria seleccionada
        tareas.filter(tarea => tarea.categoria === categoria);
    } //Si la categoria es "todos" se imprimen todas las tareas con normalidad sin aplicar ningun filtro
    console.log(tarjetas)
    contenedor.innerHTML = '';
    const contenido = document.createElement("div");
    tarjetas.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]);
    tarjetas.forEach (tarea =>{
        contenido.innerHTML += `
        <div class="tarjeta">
                    <div class="nombre">
                        <p class="tarea">${tarea.titulo}</p>
                    </div>
                    <div class="estados">
                        <p class="prioridad">Prioridad: ${tarea.prioridad}</p>
                        <p class="categoria1">Categoria: ${tarea.categoria}</p>
                        <select id="estado-${tarea.id}" onchange="cambiarEstado(${tarea.id})"> 
                            <option value="${tarea.estado}" disabled selected>${tarea.estado}</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="En proceso">En proceso</option>
                            <option value="Finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="eliminar">
                        <ion-icon onclick="eliminar(${tarea.id})" name="trash"></ion-icon>
                    </div>
                </div>
        `; // el id estado utilizo el id de la tarea para poder cambiar el estado de la tarea seleccionada
        contenedor.appendChild(contenido);
    
    });
};
document.getElementById("filtro").addEventListener("change", function(){ agregarLista();} );//al realizar el cambio de categoria se realiza un evento que llama a la funcion categoria que filtra las tareas
function categoria(){ //Filtra las tareas por categoria
    let categoria = document.getElementById("filtro").value; //guarda el valor de la categoria seleccionada
    if(categoria === "todos"){ //Si la categoria es "todos" se imprimen// todas las tareas con normalidad sin aplicar ningun filtro
        agregarLista();
        return;
    }

    let filtro = tareas.filter(tarea => tarea.categoria === categoria); //selecciona las tarjetas que coinciden con la categoria seleccionada
    filtro.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]);//Ordena las tareas por prioridad

    contenedor.innerHTML = '';
    const contenido = document.createElement("div");
    filtro.forEach (tarea =>{
        contenido.innerHTML += `
         <div class="tarjeta">
                    <div class="nombre">
                        <p class="tarea">${tarea.titulo}</p>
                    </div>
                    <div class="estados">
                        <p class="prioridad">Prioridad: ${tarea.prioridad}</p>
                        <p class="categoria1">Categoria: ${tarea.categoria}</p>
                        <select id="estado-${tarea.id}" onchange="cambiarEstado(${tarea.id})">
                            <option value="${tarea.estado}" disabled selected>${tarea.estado}</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="En proceso">En proceso</option>
                            <option value="Finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="eliminar">
                        <ion-icon onclick="eliminar(${tarea.id})" name="trash"></ion-icon>
                    </div>
                </div>
        `;
        contenedor.appendChild(contenido);
    });
}
function eliminar(id){ //Elimina la tarea seleccionada
    tareas = tareas.filter(tarea => tarea.id !== id); //Busca el objeto segun id y lo discrimina borrandolo del array
    alert("Tarea eliminada con exito");
    categoria();
}
function cambiarEstado(id){ //Cambia el estado de la tarea seleccionada y lo guarda en el array de objetos
    let tarea = tareas.find(tarea => tarea.id === id); //Busca el objeto segun id
    if(tarea){
        let estado = document.getElementById(`estado-${id}`).value; //guarda el valor del estado seleccionado de la tarjeta especifica 
        tarea.estado = estado; //reemplaza el valor antiguo por el guardado
        categoria(); //reimprime las tarjetas
    }
}