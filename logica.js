// Selección de elementos del DOM
const inputTexto = document.getElementById("cuadro-codificador");
const btnCodificar = document.getElementById("btn-codificar");
const btnDescodificar = document.getElementById("btn-descodificar");
const btnCopiar = document.getElementById("btn-copiar");
const outputTexto = document.getElementById("mensaje");
const seccionSinResultado = document.getElementById("sin-resultado");
const seccionConResultado = document.getElementById("con-resultado");
const toast = document.getElementById("toast");

// Llaves de encriptación
const llaves = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
};

/**
 * Función principal para encriptar el texto
 * @param {string} texto 
 * @returns {string} texto encriptado
 */
function encriptar(texto) {
    let textoEncriptado = texto.toLowerCase();
    
    // Iteramos sobre las llaves para reemplazar
    for (let llave in llaves) {
        textoEncriptado = textoEncriptado.replaceAll(llave, llaves[llave]);
    }
    
    return textoEncriptado;
}

/**
 * Función principal para desencriptar el texto
 * @param {string} texto 
 * @returns {string} texto desencriptado
 */
function desencriptar(texto) {
    let textoDesencriptado = texto.toLowerCase();
    
    // Iteramos sobre las llaves para revertir el proceso
    for (let llave in llaves) {
        textoDesencriptado = textoDesencriptado.replaceAll(llaves[llave], llave);
    }
    
    return textoDesencriptado;
}

/**
 * Actualiza la interfaz gráfica según si hay texto o no
 * @param {string} texto 
 */
function actualizarInterfaz(texto) {
    if (texto.trim() === "") {
        seccionSinResultado.classList.remove("hidden");
        seccionConResultado.classList.add("hidden");
    } else {
        seccionSinResultado.classList.add("hidden");
        seccionConResultado.classList.remove("hidden");
        outputTexto.value = texto;
    }
}

/**
 * Muestra una notificación temporal al usuario
 */
function mostrarToast() {
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}

// Event Listeners
btnCodificar.addEventListener("click", () => {
    const texto = inputTexto.value;
    if (texto.trim() !== "") {
        const resultado = encriptar(texto);
        actualizarInterfaz(resultado);
        inputTexto.value = "";
    }
});

btnDescodificar.addEventListener("click", () => {
    const texto = inputTexto.value;
    if (texto.trim() !== "") {
        const resultado = desencriptar(texto);
        actualizarInterfaz(resultado);
        inputTexto.value = "";
    }
});

btnCopiar.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(outputTexto.value);
        mostrarToast();
    } catch (err) {
        console.error("Error al copiar al portapapeles: ", err);
    }
});
