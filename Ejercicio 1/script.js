// container principal
const mainContainer = document.createElement("div");
mainContainer.style.margin = "10px auto";
mainContainer.style.width = "800px";

// formulario busqueda
const form = document.createElement("form");
const searchInput = document.createElement("input");
searchInput.setAttribute("type", "search");
const btnBuscar = document.createElement("button");
btnBuscar.textContent = "Buscar por nombre";

// caja Datos
const containerDatos = document.createElement("div");


form.appendChild(searchInput);
form.appendChild(btnBuscar);

mainContainer.appendChild(form);

// Creamos una variable con la URL a la que vamos a hacer la peticion
const requestURL = "https://jsonplaceholder.typicode.com/users";

// Creamos una instancia de la clase XMLHttpRequest
const request = new XMLHttpRequest();

// Abrimos una nueva solicitud con el metodo get a la URL anterior
request.open("GET", requestURL);

// Como sabemos que la respuesta nos la va a dar en formato json, se lo indicamos
// Así la respuesta se convierte en segundo plano a un objeto
request.responseType = "json";

// Enviamos la solicitud
request.send();

// Añadimos la logica para cuando recibamos la respuesta
request.onload = () => {
    // console.log(request.status);

    // Comprobamos 

    // Si el status de la peticion es 200 es correcto
    if (request.status == 200) {

        console.log(request.response);


        const table = document.createElement("table");
        table.id = "tabla";
        const filaHeader = document.createElement("tr");

        const header1 = document.createElement("th");
        const header2 = document.createElement("th");
        const header3 = document.createElement("th");


        header1.textContent = "Nombre";
        header2.textContent = "Calle";
        header3.textContent = "Ciudad";

        filaHeader.appendChild(header1);
        filaHeader.appendChild(header2);
        filaHeader.appendChild(header3);

        table.appendChild(filaHeader);

        for (let elemento of request.response) {
            const fila = document.createElement("tr");

            const celdaNombre = document.createElement("td");
            const celdaCalle = document.createElement("td");
            const celdaCiudad = document.createElement("td");

            celdaNombre.textContent = elemento["name"];
            celdaCalle.textContent = elemento["address"]["street"];
            celdaCiudad.textContent = elemento["address"]["city"];

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaCalle);
            fila.appendChild(celdaCiudad);

            table.appendChild(fila);
        }

        mainContainer.appendChild(table);
    }
}


// Añadimos un evento para cuando hagamos click en el boton de buscar por nombre
btnBuscar.addEventListener("click", (e) => {
    // Evitamos que la página se actualice.
    e.preventDefault();

    // Borramos la tabla inicial y el mensaje 
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";


    console.log(request.response);
    console.log(searchInput.value);

    // Creamos expresion formal con el valor del input de busqueda.
    const regex = new RegExp(`${searchInput.value}`);


    console.log(regex);



    // Creamos nueva tabla
    const filaHeader = document.createElement("tr");

    const header1 = document.createElement("th");
    const header2 = document.createElement("th");
    const header3 = document.createElement("th");


    header1.textContent = "Nombre";
    header2.textContent = "Calle";
    header3.textContent = "Ciudad";

    filaHeader.appendChild(header1);
    filaHeader.appendChild(header2);
    filaHeader.appendChild(header3);

    tabla.appendChild(filaHeader);

    let coincidencia = false;
    for (let elemento of request.response) {
        if (regex.test(elemento.name)) {

            console.log(elemento.name);
            console.log(regex.test(elemento.name));

            const fila = document.createElement("tr");

            const celdaNombre = document.createElement("td");
            const celdaCalle = document.createElement("td");
            const celdaCiudad = document.createElement("td");

            celdaNombre.textContent = elemento["name"];
            celdaCalle.textContent = elemento["address"]["street"];
            celdaCiudad.textContent = elemento["address"]["city"];

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaCalle);
            fila.appendChild(celdaCiudad);

            tabla.appendChild(fila);
            coincidencia = true;
        }
    }

    if (coincidencia) {
        // Si hay algun resultado mostramos la tabla con los resultados
        mainContainer.appendChild(tabla);
    } else {
        // Si no los hay, mostramos mensaje
        tabla.innerHTML = "Sin coincidencias";
    }
    console.log(tabla);




});











document.body.appendChild(mainContainer);

