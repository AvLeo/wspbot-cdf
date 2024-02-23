const res1 = "🔹 1 - Talleres(horarios de cursado, metodología, duración, costo)" 
const res2 = "🔹 2 - Preinscripciones "
const res3 = "🔹 3 - Atención personal "
const res4 = "🔹 4 - Volver al menú principal" 


const getResCDF = (msj,chat,id) => {
    switch(msj){
        case '1':
            return [res1,chat] 
        case '2':
            return [res2,chat] 
        case '3':
            chat[id].state.cdf.main.asistencia = true
            return [res3,chat] 
        case '4':
            return [res4,chat]
        default:
            return "🤔... Por favor indíca el numero correspondiente a la sección 😊"  
    }
}

module.exports = {
    getResCDF
}