const qrcode = require('qrcode-terminal');
const fetch = require('node-fetch');

const { Client , LocalAuth} = require('whatsapp-web.js');


const client = new Client({
    authStrategy: new LocalAuth()
})

const { cel , redes} = require('./data.json')
const { chat } = require('./chats.json')

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready',async () => {
    await client.sendMessage("5492644709107@c.us","Inicie bot casita");
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


client.on('message', async (message) => {

    const from = message.from
    
    if(from.includes('@g.us')) return 

    const chats = JSON.parse(JSON.stringify(chat))
    const text = message.body.toLowerCase()
    
    const isInit = chats.find( chat => chat.numero === from)
    const id = chats.findIndex( chat => chat.numero === from )

    let ctx;

    if(isInit !== "undefined"){
        ctx = isInit;
    }else{
        ctx = {
            "numero": from,
            "state": {
                "freq": false,
                "certificado": false,
                "asistencia": false
            }
        }
        // chat.push(ctx)

    }

    if(ctx.state.freq){
        // freq() 
        return
    }

    if(ctx.state.certificado){
        // certificado
        return
    }

    if(ctx.state.asistencia){
        // asistencia()
        return
    }

    if(text === '1' || text === '2' || text === '3'){
        // flujoInicial()
        return
    }
    client.sendMessage(from,"Hola soy el Asistente Virtual de Casa del Futuro 😊. \n\n Estoy para ayudar con los siguiente comandos:")
    client.sendMessage(from,"🔹1 - Preguntas frecuentes \n 🔹2 - estado de certificado \n 🔹3 - Asistencia del personal")
    console.log(JSON.parse(chat))
})

client.initialize();

