const msjFreq = "👉Preguntas Frecuentes👈\n\n🔹1 - Cursos \n🔹2 - Inscripciones \n🔹3 - Certificados \n🔹4 - Metodoligia de cursado \n🔹5 - Duración de cursos \n🔹6 - Costo de cursado \n🔹7 - Escuela de Programación \n🔹8 - Redes \n🔹9 - Volver"
const msjCert = "👉Certificado👈\n\nGenial! Para poder consultar el estado de tu certificado necesito lo siguiente:\n\nIngresa tu NOMBRE y APELLIDO, ejemplo: Pepito Perez"

const msjCDF = "👉Casa del Futuro👈\n\n🔹1 - Talleres(horarios de cursado, metodología, duración, costo) \n🔹2 - Preinscripciones\n🔹3 - Atención personal\n🔹4 - Volver al menú inicial"
const msjEDP = "👉Escuela de Programación👈\n\n🔹1 - Cursos(horarios de cursado, metodología, duración, costo) \n🔹2 - Preinscripciones\n🔹3 - Atención personal\n🔹4 - Volver al menú inicial"

const redes = "😍Nuestas Redes😍\n\n🔹IG: https://www.instagram.com/casadelfuturo.godoycruz/?hl=es \n🔹FB: link \n🔹WEB: https://casa-del-futuro.vercel.app/"

//const msjAsis = "Estás siendo redirigido con el personal de Casa del Futuro!\n\nEn breves serás atendido, espera unos minutos porfavor! Gracias por charlar conmigo un ratito 😒 "

const initialFLow = (msj, chat, id) => {
    switch(msj){
        case '1': // Preguntas frecuentas
            chat[id].state.freq = true
            return [msjFreq,chat]
        case '2': // Estado Certificado
            chat[id].state.certificado = true
            return [msjCert,chat]
        case '3': // Casa del futuro
            chat[id].state.cdf.main = true
            return [msjCDF,chat]
        case '4': // Escuela de Programación
            chat[id].state.edp.main = true
            return [msjEDP,chat]
        case '5': // Redes de contacto
            return [redes,chat]
        default:
            return ["Elegí bien qla", chat]
        }
}

module.exports = {
    initialFLow
}