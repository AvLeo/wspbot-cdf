const res1 = "🔹Casa del Futuro 🔹\n Mundos 3D: Día.... Horario... \n Animación 3D: Día.... Horario... \n Linux: Día.... Horario... \n  " 
const res2 = "🔹 Nuestras pre-inscripciones salen cada 3 meses a travez de nuestra redes.. \n IG: .... "
const res3 = "🔹Pedirá asistencia al personal de Casa del Futuro. \n 1.Confirmar \n 2.Cancelar "
const res4 = "🔙 Volviendo 🏃‍♂️" 


const getResCDF = (msj,chat,id) => {
    switch(msj){
        case '1':
            return [res1,chat] 
        case '2':
            return [res2,chat] 
        case '3':
            chat[id].state.cdf.asistencia = true
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