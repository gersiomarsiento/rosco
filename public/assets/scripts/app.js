const burbujas = document.querySelectorAll(".burbuja");
const textoEmpiezaContiene = document.querySelector("#empieza-contiene");
const textoPregunta = document.querySelector("#pregunta");
const mensajeResultado = document.querySelector("#mensaje-resultado");
const modal = document.getElementById("modal");
const cerrarModalBtn = document.getElementById("cerrar-modal");
const nuevoJuegoBtn = document.getElementById("jugar-de-nuevo");
const pasapalabraBtn = document.querySelector("#pasapalabra");
const responderBtn = document.querySelector("#responder");
let contadorDeTiempo = document.querySelector("#reloj");
let segundos = 0;
let minutos = 0;
let burbujaActiva = 0;


window.addEventListener( // Listener ENTER y SPACE
    "keydown",
    (event) => {
        if(event.code==="Enter"){
            procesarRespuesta()
        } else if (event.code==="Space"){
            pasapalabra()
        }
    },
    true,
  );

function iniciarJuego () {
    seleccionarPreguntasParaJuego();
    cambiarTextoPregunta();
    cambiarTextoLetra();
}

function mostrarModal() {
    modal.style.display = "block";
}

function cerrarModal() {
    modal.style.display = "none";
}

function cerrarModalPorClicExterior(event) {
    if (event.target === modal) {
        cerrarModal();
    }
}

function actualizarCronometro() {
    segundos++;
    if (segundos >= 60) {
        segundos = 0;
        minutos++;
    }
    contadorDeTiempo.textContent = `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`
};

const intervaloCronometro = setInterval(actualizarCronometro, 1000);

function procesarRespuesta() {
    verificarRespuesta();
    responderBtn.classList.add("boton-accion-hover")
    siguientePregunta();
    setTimeout( ()=> responderBtn.classList.remove("boton-accion-hover") , 150)
}

function pasapalabra() {
    pasapalabraBtn.classList.add("boton-accion-hover")
    siguientePregunta();
    setTimeout( ()=> pasapalabraBtn.classList.remove("boton-accion-hover") , 150)
}

function cambiarTextoLetra () {
    let empiezaContiene = Object.values(preguntasTrivia)[burbujaActiva].empieza?"Empieza por":"Contiene";
    textoEmpiezaContiene.innerHTML = 
    `<span>${empiezaContiene}</span>
    <b>${Object.keys(preguntasTrivia)[burbujaActiva]}</b>`
}

function cambiarTextoPregunta () {
    textoPregunta.textContent = Object.values(preguntasTrivia)[burbujaActiva].pregunta
}

function verificarRespuesta() {
    let textoRespuesta = document.querySelector("#respuesta-ingresada").value.toLowerCase().trim();
    let respuestaCorrectaParaComparar = Object.values(preguntasTrivia)[burbujaActiva].respuesta.toLowerCase();
    if (quitarAcentos(respuestaCorrectaParaComparar) === quitarAcentos(textoRespuesta)){
        respuestaCorrecta()
    } else {
        respuestaIncorrecta()
    }
}

function quitarAcentos(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function limpiarInput() {
    document.querySelector("#respuesta-ingresada").value = ""
}

function respuestaCorrecta() {
    [...burbujas][burbujaActiva].classList.add("correcta");
}

function respuestaIncorrecta() {
    [...burbujas][burbujaActiva].classList.add("incorrecta");
}

function siguientePregunta() {
    //Chequear si el juego terminó
    const finDelJuego = [...burbujas].every(burbuja => 
        burbuja.classList.contains("correcta") 
        || 
        burbuja.classList.contains("incorrecta")
        );
    if (finDelJuego) {
        [...burbujas][burbujaActiva].classList.remove("actual");
        let resultadoFinal = [...burbujas].filter(respuesta => respuesta.classList.contains("correcta")).length;
        mensajeResultado.textContent =`Has conseguido adivinar ${resultadoFinal} palabras correctamente en un tiempo total de ${contadorDeTiempo.textContent}`;
        clearInterval(intervaloCronometro);
        mostrarModal();
        return
    }

    // El juego continua con la siguiente letra
    let siguienteBurbuja = burbujaActiva + 1;
    if (siguienteBurbuja >= burbujas.length) {
        siguienteBurbuja = 0;
    }

    // Saltearse letras ya completadas
    while ([...burbujas][siguienteBurbuja].classList.contains("incorrecta") || [...burbujas][siguienteBurbuja].classList.contains("correcta")) {
        siguienteBurbuja++;
        if (siguienteBurbuja >= burbujas.length) {
            siguienteBurbuja = 0;
        }
    }

    [...burbujas][burbujaActiva].classList.remove("actual");
    [...burbujas][siguienteBurbuja].classList.add("actual");
    burbujaActiva = siguienteBurbuja;
    cambiarTextoLetra();
    cambiarTextoPregunta();
    limpiarInput();
}

cerrarModalBtn.addEventListener("click", cerrarModal);
nuevoJuegoBtn.addEventListener("click", ()=>{location.reload();});
modal.addEventListener("click", cerrarModalPorClicExterior);
    
const preguntasTrivia = {};

function seleccionarPreguntasParaJuego() {
    Object.keys(preguntasTriviaBase).forEach(letra => {

        const preguntasLetra = preguntasTriviaBase[letra];
        const preguntaSeleccionada = preguntasLetra[Math.floor(Math.random() * preguntasLetra.length)];

        preguntasTrivia[letra] = {
            empieza: preguntaSeleccionada.empieza,
            pregunta: preguntaSeleccionada.pregunta,
            respuesta: preguntaSeleccionada.respuesta
        };
    });
}

iniciarJuego()

// Reconocimiento de voz
const reconocimiento = new webkitSpeechRecognition();
reconocimiento.lang = "es-ES"; 

reconocimiento.onstart = ()=>{
    document.querySelector("#mic img").classList.add("mic-active");
}

reconocimiento.onresult = function(event) {
    const resultado = event.results[0][0].transcript.toLowerCase();
    document.querySelector("#respuesta-ingresada").value = resultado;
    document.querySelector("#mic img").classList.remove("mic-active");
    setTimeout( ()=> procesarRespuesta(), 600) ;
};

// reconocimiento.onend = function() {
//     // Reiniciar el reconocimiento después de que termine
//     reconocimiento.start();
// };

// reconocimiento.start(); // Iniciar el reconocimiento
