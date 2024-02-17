const msjFreq = "🔹1 - Cursos \n🔹2 - Inscripciones \n🔹3 - Certificados \n🔹4 - Metodoligia de cursado \n🔹5 - Duración de cursos \n🔹6 - Costo de cursado \n🔹7 - Escuela de Programación \n🔹8 - Redes \n🔹9 - Volver"
const msjCert = "Genial! Para poder consultar el estado de tu certificado necesito lo siguiente:\n\nIngresa tu NOMBRE y APELLIDO, ejemplo: Pepito Perez"
const msjAsis = "Estás siendo redirigido con el personal de Casa del Futuro!\n\nEn breves serás atendido, espera unos minutos porfavor! Gracias por charlar conmigo un ratito 😒 "

const initialFLow = (msj, chat, id) => {
    switch(msj){
        case '1':
            chat[id].state.freq = true
            return [msjFreq,chat]
        case '2':
            chat[id].state.certificado = true
            return [msjCert,chat]
        case '3':
            chat[id].state.asistencia = true
            return [msjAsis,chat]
    }
}

module.exports = {
    initialFLow
}