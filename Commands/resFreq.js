const res1 = "🔹Casa del Futuro 🔹\n Mundos 3D: Día.... Horario... \n Animación 3D: Día.... Horario... \n Linux: Día.... Horario... \n  " 
const res2 = "🔹 2 - Inscripciones "
const res3 = "🔹 3 - Certificados "
const res4 = "🔹 4 - Metodoligia de cursado" 
const res5 = "🔹 5 - Duración de cursos "
const res6 = "🔹 6 - Costo de cursado" 
const res7 = "🔹 7 - Escuela de Programación "
const res8 = "🔹 8 - Redes" 
const res9 = "🔹 9 - Volver "

const getResFreq = (msj) => {
    switch(msj){
        case '1':
            return res1 
        case '2':
            return res2 
        case '3':
            return res3 
        case '4':
            return res4 
        case '5':
            return res5 
        case '6':
            return res6 
        case '7':
            return res7 
        case '8':
            return res8 
        case '9':
            return res9 
        default:
            return "🤔... Por favor indíca el numero correspondiente a la sección 😊" 
    }
}

module.exports = {
    getResFreq
}