console.log(preguntasTriviaBase)

const burbujas = document.querySelectorAll(".burbuja");
const textoEmpiezaContiene = document.querySelector("#empieza-contiene");
const textoPregunta = document.querySelector("#pregunta");
const mensajeResultado = document.querySelector("#mensaje-resultado");
const modal = document.getElementById("modal");
const cerrarModalBtn = document.getElementById("cerrar-modal");
const nuevoJuegoBtn = document.getElementById("jugar-de-nuevo");
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
    siguientePregunta();
}

function pasapalabra() {
    siguientePregunta();
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



// // Q&A --- MOVE TO DIFF FILE
// const preguntasTriviaBase = {
//         'A': [
//             {
//                 empieza: true,
//                 pregunta: "Organismo microscópico unicelular que se mueve mediante seudópodos, se alimenta por fagocitosis y se reproduce por escisión; vive en aguas estancadas y tierras húmedas, o parásito de otros animales.",
//                 respuesta: "Ameba"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Parte final de la extremidad superior del ser humano, formada por la mano, la muñeca y los dedos.",
//                 respuesta: "Antebrazo"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Juego de estrategia en el que dos jugadores mueven sus piezas en un tablero cuadriculado.",
//                 respuesta: "Ajedrez"
//             }
//         ],
//         'B': [
//             {
//                 empieza: true,
//                 pregunta: "Fruta tropical de forma ovalada o redonda, de cáscara dura y rugosa, pulpa jugosa y sabor dulce.",
//                 respuesta: "Banana"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Persona necia, inconsistente.",
//                 respuesta: "Badulaque"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Secreción amarillenta que produce el hígado de los vertebrados, importante en el proceso de la digestión.",
//                 respuesta: "Bilis"
//             },
//         ],
//         'C': [
//             {
//                 empieza: true,
//                 pregunta: "Pieza de artillería de gran calibre, fijada en un afuste o cureña, que lanza proyectiles a larga distancia.",
//                 respuesta: "Cañón"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Elevación natural de terreno menor que una montaña.",
//                 respuesta: "Colina"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Gran isla italiana en el mar Mediterráneo, cuya capital es Cagliari.",
//                 respuesta: "Cerdeña"
//             },
//         ],
//         'D': [
//             {
//                 empieza: true,
//                 pregunta: "Mamífero rumiante de la familia del camello, del cual se diferencia por tener una sola joroba y ser algo más alto.",
//                 respuesta: "Dromedario"
//             }, 
//             {
//                 empieza: true,
//                 pregunta: "Proceso de difusión selectiva a través de una membrana, que se utiliza para la separación de moléculas de diferente tamaño.",
//                 respuesta: "Diálisis"
//             }, 
//             {
//                 empieza: true,
//                 pregunta: "Conjunto de dientes, muelas y colmillos que tiene en la boca una persona o un animal.",
//                 respuesta: "Dentadura"
//             }, 
//         ],
//         'E': [
//             {
//                 empieza: true,
//                 pregunta: "Acción y efecto de elevar o elevarse. En física, fuerza que actúa en sentido contrario al de la gravedad.",
//                 respuesta: "Elevación"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Conjunto de conocimientos relacionados con la producción, distribución y consumo de bienes y servicios.",
//                 respuesta: "Economía"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Conjunto de seres vivos que habitan un lugar o que están relacionados por características comunes.",
//                 respuesta: "Ecosistema"
//             }
//         ],
//         'F': [
//             {
//                 empieza: true,
//                 pregunta: "Ciencia que se dedica al estudio de la materia, la energía y las interacciones entre ellas.",
//                 respuesta: "Física"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Ademán o amago que se hace con intención de engañar a alguien.",
//                 respuesta: "Finta"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Apasionamiento y tenacidad desmedida en la defensa de creencias u opiniones, especialmente religiosas o políticas.",
//                 respuesta: "Fanatismo"
//             },
//         ],
//         'G': [
//             {
//                 empieza: true,
//                 pregunta: "Instrumento musical de cuerda, formado por una caja de resonancia y cuerdas de tripa, metal o nailon, que se tocan con los dedos o con plectro.",
//                 respuesta: "Guitarra"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Enfermedad contagiosa de origen bacteriano, que se transmite por vía sexual y se caracteriza por un flujo purulento de la vagina o de la uretra.",
//                 respuesta: "Gonorrea"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Estofado picante de carne originario de Hungría.",
//                 respuesta: "Goulash"
//             },
//         ],
//         'H': [
//             {
//                 empieza: true,
//                 pregunta: "Sustancia de color negro, untuosa, de mucho brillo, que se obtiene del carbón por destilación.",
//                 respuesta: "Hollín"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Enfermedad hereditaria, caracterizada por la deficiencia en los mecanismos de coagulación de la sangre, lo que motiva que las hemorragias sean copiosas y difíciles de detener.",
//                 respuesta: "Hemofilia"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Enaltecer o premiar el mérito de alguien.",
//                 respuesta: "Honrar"
//             },
//         ],
//         'I': [
//             {
//                 empieza: true,
//                 pregunta: "Hacer las diligencias necesarias para descubrir algo.",
//                 respuesta: "Investigar"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Tonto o falto de inteligencia.",
//                 respuesta: "Imbécil"
//             },
//             {
//                 empieza: true,
//                 pregunta: "En la mitología griega, hijo del arquitecto Dédalo y constructor del laberinto de Creta",
//                 respuesta: "Ícaro"
//             },
//         ],
//         'J': [
//             {
//                 empieza: true,
//                 pregunta: "Mamífero carnívoro de gran tamaño, de pelaje amarillo rojizo con manchas oscuras en el cuerpo, que vive en la selva.",
//                 respuesta: "Jaguar"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Hueso del nacimiento del dedo grueso del pie, cuando sobresale demasiado.",
//                 respuesta: "Juanete"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Diversión bulliciosa y alborotada.",
//                 respuesta: "Jarana"
//             },
//         ],
//         'K': [
//             {
//                 empieza: true,
//                 pregunta: "Perteneciente o relativo a Kazajistán.",
//                 respuesta: "Kazajo"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Unidad de temperatura termodinámica del sistema internacional, igual al grado Celsius, pero en la escala de temperatura absoluta en que el 0 está fijado en −273,16 °C.",
//                 respuesta: "Kelvin"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Volcán de triple cumbre ubicado en Tanzania cuya cima es la más alta de todo el continente africano.",
//                 respuesta: "Kilimanjaro"
//             },
//         ],
//         'L': [
//             {
//                 empieza: true,
//                 pregunta: "Hojas secas, trozos de madera u otras sustancias que se usan para encender fuego.",
//                 respuesta: "Leña"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Satélite natural de la Tierra que refleja la luz del Sol y que influye en los fenómenos de marea.",
//                 respuesta: "Luna"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Persona que, según la tradición popular, se convierte en lobo las noches de plenilunio.",
//                 respuesta: "Licántropo"
//             },
//         ],
//         'M': [
//             {
//                 empieza: true,
//                 pregunta: "Línea imaginaria que divide la Tierra en dos hemisferios: oriental y occidental.",
//                 respuesta: "Meridiano"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Falta o necesidad de algo.",
//                 respuesta: "Menester"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Habitar o residir habitualmente en un lugar.",
//                 respuesta: "Morar"
//             },
//         ],
//         'N': [
//             {
//                 empieza: true,
//                 pregunta: "Esteroide anabolizante derivado de la testosterona, que estimula la actividad muscular y desarrolla los caracteres sexuales masculinos.",
//                 respuesta: "Nandrolona"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Regularizar o poner en orden lo que no lo estaba.",
//                 respuesta: "Normalizar"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Cualidad de nuevo.",
//                 respuesta: "Novedad"
//             },
//         ],
//         'Ñ': [
//             {
//                 empieza: true,
//                 pregunta: "Chato, de nariz poco prominente.",
//                 respuesta: "Ñato"
//             },
//             {
//                 empieza: false,
//                 pregunta: "Que huye y se esconde de la gente.Chato, de nariz poco prominente.",
//                 respuesta: "Huraño"
//             },
//             {
//                 empieza: false,
//                 pregunta: "Instrumento para segar a ras de tierra, constituido por una cuchilla alargada, curva y puntiaguda, sujeta a un mango largo que se maneja con las dos manos.",
//                 respuesta: "Guadaña"
//             },
//         ],
//         'O': [
//             {
//                 empieza: true,
//                 pregunta: "Parte de la medicina que se ocupa del embarazo, el parto y el período de tiempo posterior a este.",
//                 respuesta: "Obstetricia"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Común, regular y que sucede habitualmente.",
//                 respuesta: "Ordinario"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Abominable o despreciable.",
//                 respuesta: "Ominoso"
//             },
//         ],
//         'P': [
//             {
//                 empieza: true,
//                 pregunta: "Pequeño mamífero roedor, de cuerpo cubierto de púas, que se enrolla formando una bola cuando se siente amenazado.",
//                 respuesta: "Puercoespín"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Formar o combinar ideas o juicios en la mente.",
//                 respuesta: "Pensar"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Plato de arroz seco, con carne, pescado, mariscos, legumbres y demás, característico de la región valenciana, en España.",
//                 respuesta: "Paella"
//             },
//         ],
//         'Q': [
//             {
//                 empieza: true,
//                 pregunta: "Pequeño árbol de copa globosa, hojas lanceoladas, flores blancas y pequeños frutos de color naranja que se usan para preparar dulces y licores.",
//                 respuesta: "Quinoto"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Pastel hecho con una base de pasta sobre la que se pone una mezcla de huevos, leche y otros ingredientes y se cuece al horno.",
//                 respuesta: "Quiche"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Construcción pequeña que se instala en la calle u otro lugar público para vender en ella periódicos, flores, etc.",
//                 respuesta: "Quiosco"
//             },
//         ],
//         'R': [
//             {
//                 empieza: true,
//                 pregunta: "País de África Oriental con capital en la ciudad de Kigali.",
//                 respuesta: "Ruanda"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Desgastar la superficie de un alimento u otra cosa con los dientes o con un instrumento duro de manera que se vaya rebajando lentamente y a trozos pequeños.",
//                 respuesta: "Roer"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Librar a una persona de una obligación, de un dolor o de una situación penosa.",
//                 respuesta: "Redimir"
//             },
//         ],
//         'S': [
//             {
//                 empieza: true,
//                 pregunta: "Sensación y percepción producidas por la acción de un estímulo sobre el sentido del gusto.",
//                 respuesta: "Sabor"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Lesión o profanación de cosa, persona o lugar sagrados.",
//                 respuesta: "Sacrilegio"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Bajo, grosero, indigno, vil.",
//                 respuesta: "Soez"
//             },
//         ],
//         'T': [
//             {
//                 empieza: true,
//                 pregunta: "Instrumento musical de percusión formado por una caja de resonancia de madera y parches estirados de piel.",
//                 respuesta: "Tambor"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Parte del cuerpo humano que está entre el cuello y el abdomen, y que contiene los órganos vitales.",
//                 respuesta: "Tórax"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Signo gráfico que se coloca sobre la letra n en algunas palabras de origen español.",
//                 respuesta: "Tilde"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Instrumento óptico que permite ver objetos distantes en detalle.",
//                 respuesta: "Telescopio"
//             }
//         ],
//         'U': [
//             {
//                 empieza: true,
//                 pregunta: "Acabar de hacer una cosa o llevar a cabo las últimas acciones necesarias para ello.",
//                 respuesta: "Ultimar"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Dicho de dos o más personas: Que tienen un mismo parecer, dictamen, voluntad o sentimiento.",
//                 respuesta: "Unánime"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Propiedad de todo ser, en virtud de la cual no puede dividirse sin que su esencia se destruya o altere.",
//                 respuesta: "Unidad"
//             },
//         ],
//         'V': [
//             {
//                 empieza: true,
//                 pregunta: "Lugar o espacio cubierto y cerrado en el que se pueden habitar personas, animales o cosas.",
//                 respuesta: "Vivienda"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Sensación producida en la vista por los rayos de luz.",
//                 respuesta: "Visión"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Respetar en sumo grado a alguien por su santidad, dignidad o grandes virtudes, o a algo por lo que representa o recuerda.",
//                 respuesta: "Venerar"
//             },
//         ],
//         'W': [
//             {
//                 empieza: true,
//                 pregunta: "Sartén ancha y profunda, generalmente con una o dos asas, originaria de la cocina oriental y que se usa para saltear.",
//                 respuesta: "Wok"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Fusil con acción de palanca utilizado ampliamente en Estados Unidos durante el s. XX y popularizado por las películas de cowboys'.",
//                 respuesta: "Winchester"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Elemento químico de número atómico 74, conocido también como tungsteno",
//                 respuesta: "Wolframio"
//             },
//         ],
//         'X': [
//             {
//                 empieza: true,
//                 pregunta: "Simpatía hacia lo extranjero o los extranjeros.",
//                 respuesta: "Xenofilia"
//             }, 
//             {
//                 empieza: false,
//                 pregunta: "Formado por varios elementos que se mezclan para componer otro.",
//                 respuesta: "Mixto"
//             }, 
//             {
//                 empieza: false,
//                 pregunta: "Hueso propio de los vertebrados que carecen de cola, formado por la unión de las últimas vértebras y articulado por su base con el hueso sacro.",
//                 respuesta: "Cóxis"
//             }, 
//         ],
//         'Y': [
//             {
//                 empieza: true,
//                 pregunta: "Represa hidroeléctrica cuyo nombre en guaraní significa 'tierra de la luna'.",
//                 respuesta: "Yacyretá"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Estar una persona echada o tendida.",
//                 respuesta: "Yacer"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Esfuerzo que un musulmán debe realizar para que la ley divina reine en la Tierra, y que en muchos casos implica la lucha violenta.",
//                 respuesta: "Yihad"
//             },
//         ],
//         'Z': [
//             {
//                 empieza: true,
//                 pregunta: "Última letra del alfabeto español.",
//                 respuesta: "Zeta"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Tonto y abrutado.",
//                 respuesta: "Zopenco"
//             },
//             {
//                 empieza: true,
//                 pregunta: "Persona que por mala configuración tiene juntas las rodillas y separadas las piernas hacia afuera.",
//                 respuesta: "Zambo"
//             },
//         ]
//     };
    
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

reconocimiento.onresult = function(event) {
    const resultado = event.results[0][0].transcript.toLowerCase();
    document.querySelector("#respuesta-ingresada").value = resultado;
    procesarRespuesta();
};

// reconocimiento.onend = function() {
//     // Reiniciar el reconocimiento después de que termine
//     reconocimiento.start();
// };

// reconocimiento.start(); // Iniciar el reconocimiento
