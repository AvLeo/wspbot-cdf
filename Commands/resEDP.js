const res1 = "🔹 1 - Cursos(horarios de cursado, metodología, duración, costo)" 
const res2 = "🔹 2 - Preinscripciones "
const res3 = "🔹 3 - Atención personal "
const res4 = "🔹 4 - Volver al menú principal" 


const getResEDP = (msj) => {
    switch(msj){
        case '1':
            return res1 
        case '2':
            return res2 
        case '3':
            return res3 
        case '4':
            return res4 
    }
}

module.exports = {
    getResEDP
}