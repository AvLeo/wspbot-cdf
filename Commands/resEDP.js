const res1 = "🔹 1 - Cursos(horarios de cursado, metodología, duración, costo)" 
const res2 = "🔹 2 - Preinscripciones "
const res3 = "🔹 3 - Pedirá asistencia al personal de Casa del Futuro. \n 1.Confirmar \n 2.Cancelar "
const res4 = "🔙 Volviendo 🏃‍♂️" 


const getResEDP = (msj,chat,id) => {
    switch(msj){
        case '1':
            return [res1,chat] 
        case '2':
            return [res2,chat] 
        case '3':
            chat[id].state.edp.asistencia = true
            return [res3,chat] 
        case '4':
            return [res4,chat]
        default:
            return "🤔... Por favor indíca el numero correspondiente a la sección 😊" 
    }
}

module.exports = {
    getResEDP
}