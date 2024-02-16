const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

/* 
    Esquema de mensajes:
                        Inicio:
                            - "Hola soy el Asistente Virtual de Casa del Futuro 😊. \n\n Estoy para ayudar con los siguiente comandos:"
                            - " 1 - Preguntas frecuentes \n 2 - estado de certificado \n 3 - Asistencia del personal"
                        INPUT 1: 
                                - "🔹 1 - Cursos \n 🔹 2 - Inscripciones \n 🔹 3 - Certificados \n 🔹 4 - Metodoligia de cursado \n 🔹 5 - Duración de cursos \n 🔹 6 - Costo de cursado \n 🔹 7 - Escuela de Programación \n 🔹 8 - Redes \n"
                        INPUT 2:
                                - "Genial! Para poder consultar el estado de tu certificado necesito lo siguiente:"
                                - "Ingresa tu NOMBRE y APELLIDO, ejemplo: Pepito Perez"
                            
                                INPUT N.A:
                                            - "Gracias ${nombre}, ahora necesito que me indiques el numero o nombre del curso que realizaste. \n te dejo un listado de los cursos:"
                                            - " 1 - ASDASDASD \n 1 - ASDASDASD \n 1 - ASDASDASD \n 1 - ASDASDASD \n 1 - ASDASDASD \n 1 - ASDASDASD \n 1 - ASDASDASD"

                                        INPUT CURSO:
                                                    - "Gracias por indicar el curso! Dame un momento que busco en mi base de datos, si tu certificado ya está listo."
                                                    
                                                    ✅ - "Listo ${nombre}! Tu certificado está listo para retirarlo cuando quieras, también será enviado por correo electrónico."
                                                    ❎ - "Lamentablemente, no te estaría encontrando dentro de mi base de datos! si crees que es un error o tienes dudas. puedes pedir asistencia del personal!"
                                                    ❔ - " Bien, te tengo en mi base de datos! pero tu certificado todavia está en proceso "
                        
                        INPUT 3:
                                - " Estás siendo redirigido con el personal de Casa del Futuro!"
                                - " En breves serás atendido, espera unos minutos porfavor! Gracias por charlar conmigo un ratito 😒 "



*/


client.on('message', (msg) => {
    

})

client.initialize();
