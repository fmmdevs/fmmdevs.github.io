// Contenedor principal
const mainContainer = document.createElement("div");
mainContainer.id = "main";
// Contenedor bicicletas
const bicicletasContainer = document.createElement("div");
bicicletasContainer.id = "bicicletas";

// Campo select y sus option
const selectContainer = document.createElement("div");
const select = document.createElement("select");
const option1 = document.createElement("option");
const option2 = document.createElement("option");
const option3 = document.createElement("option");
const option4 = document.createElement("option");

option1.value = "Todas";
option1.textContent = "Todas";
option2.value = "Carretera";
option2.textContent = "Carretera";

option3.value = "Gravel";
option3.textContent = "Gravel";

option4.value = "MTB";
option4.textContent = "MTB";


select.appendChild(option1);
select.appendChild(option2);
select.appendChild(option3);
select.appendChild(option4);
// console.log(select);

// Añadimos el elemento select con sus option a un container
selectContainer.appendChild(select);

// Añadimos el container que contiene al elemento select al container principal
mainContainer.appendChild(selectContainer);

// Funcion obtiene las bicis de la página http://www.raulserranoweb.es/tienda/rest.php,
// le pasamos por parametro la categoría : "Todas", "MTB", "Gravel" o "Carretera".
// Según el parametro hacemos una peticion u otra, siempre de tipo GET.
function obtenerBicis(cat) {

    // Creamos una variable con la URL a la que vamos a hacer la peticion
    let valorCategoria;
    let requestURL;
    if (cat == "Todas") {
        requestURL = `http://www.raulserranoweb.es/tienda/rest.php`;

    } else {
        // Si la categoría no es todas añadimos el paremetro cat con el valor obtenido del select a la peticion GET.
        valorCategoria = cat
        requestURL = `http://www.raulserranoweb.es/tienda/rest.php?cat=${valorCategoria}`;

    }

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


        // Si el status de la peticion es 200 es correcto
        if (request.status == 200) {

            // console.log(request.response);


            for (let elemento of request.response) {
                // Creamos un contenedor para cada bici
                const contenedorBici = document.createElement("div");
                // console.log(elemento.cod);
                // Creamos un elemento img
                const img = document.createElement("img");
                // Creamos elementos p
                const pNombre = document.createElement("p");
                const pDescripcion = document.createElement("p");
                const pCategoria = document.createElement("p");

                // Seteamos el atributo src de img con su correspondiente url
                img.src = `https://www.raulserranoweb.es/tienda/imagenes_art/${elemento.cod}`;

                // Seteamos los elementos p con su correspondiente propiedad del objeto que hemos recibido 
                pNombre.innerHTML = `<strong>Nombre: </strong> ${elemento.nom}`;
                pDescripcion.innerHTML = `<strong>Descripcion: </strong> ${elemento.des}`;
                pCategoria.innerHTML = `<strong>Categoria: </strong> ${elemento.cat}`;

                // Añadimos los elementos al contenedor de la bici
                contenedorBici.appendChild(img);
                contenedorBici.appendChild(pNombre);
                contenedorBici.appendChild(pDescripcion);
                contenedorBici.appendChild(pCategoria);

                // Añadimos el contenedor de la bici al contenedor de las bicis.
                bicicletasContainer.appendChild(contenedorBici);
            }

            // Añadimos el contenedor con todas las bicicletas al contenedor principal
            mainContainer.appendChild(bicicletasContainer);

            // Añadimos el contenedor principal al body
            document.body.appendChild(mainContainer);

            // Creo boton para volver al menu principal y lo añado a container
            const menuBtn = document.createElement("button");
            menuBtn.textContent = "Menu principal";
            const form = document.createElement("form");
            form.action = "../index.html";
            form.style = "display: flex; justify-content: center; align-items: center;"

            form.appendChild(menuBtn);
            const hr = document.createElement("hr");
            document.body.appendChild(hr);
            document.body.appendChild(form);
        }
    }
}


// Obtenemos todas las bicis por defecto al cargar la página
obtenerBicis("Todas");


// Cada vez que el elemento select cambie, obtenemos su valor para usarlo como filtro.

select.addEventListener("change", () => {

    // Reiniciamos el contenedor de las bicicletas
    bicicletasContainer.innerHTML = "";

    // Llamamos a la funcion que hace una peticion GET según la categoría que hayamos seleccionado
    obtenerBicis(select.value);

})

