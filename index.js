const qrcode = require('qrcode-terminal');
const fs = require('fs')
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const { initialFLow } = require('./Commands/flujoInicial.js')
const { getResFreq } = require('./Commands/resFreq.js')
const { getResCert } = require('./Commands/resCert.js')
const { getResEDP } = require('./Commands/resEDP.js')
const { getResCDF } = require('./Commands/resCDF.js')

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-sexurity', '--disable-setuid-sandbox'],
        headless: true
    },
    webVersion: '2.2409.2',
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    }
})

const { cel, redes } = require('./data.json')
const { chat } = require('./chats.json')

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    await client.sendMessage("5492644709107@c.us", "Inicie bot casita");
    console.log('Client is ready!');
});

/* 
    Esquema de mensajes:
                        Inicio:
                            - "Hola soy el Asistente Virtual de Casa del Futuro 😊. \n\n Estoy para ayudar con los siguiente comandos:"
                            - " 1 - Preguntas frecuentes \n 2 - estado de certificado \n 3 - Asistencia del personal \n 4 - Registrar Asistencia"
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
                        
                        INPUT 4:
                                -  "1 - ASDASDASD \n 1 - ASDASDASD \n 1 - ASDASDASD \n 1 - ASDASDASD \n 1 - ASDASDASD \n 1 - ASDASDASD \n 1 - ASDASDASD" (fetch sheet)
                                - "Indicame tu curso"
                            
                                INPUT CURSO : 
                                            -"Indica tu pin de curso" (fetch sheet pin == ingresado)

///

🔹1 - Preguntas frecuentes 
🔹2 - Estado de certificado 
🔹3 - Casa del Futuro 
🔹4 - Escuela de Programación 
🔹5 - Redes de contacto


CASA del FUTURO:
🔹1 - Talleres(horarios de cursado, metodología, duración, costo) 
🔹2 - Preinscripciones
🔹3 - Atención personal
🔹4 - Volver al menú inicial


Escuela de Programación:
🔹1 - Cursos(horarios de cursado, metodología, duración, costo) 
🔹2 - Preinscripciones
🔹3 - Atención personal
🔹4 - Volver al menú inicial



La Tester Guillermina dice que se rompe en:

- MSJ De Certificado ❓
- MSJ En Solicitud de Asistencia - Volver a inicio si no lo quiere
- Asistencia del Personal - CDF: Confirma con cualquier cosa != 2, EDP: Confirma con cualquier cosa != 2 y Manda msj demás
- 
-
-
-
-
///

*/

const msjInicial = "🔹1 - Preguntas frecuentes \n🔹2 - Estado de certificado \n🔹3 - Casa del Futuro \n🔹4 - Escuela de Programación \n🔹5 - Redes de contacto"

client.on('message', async (message) => {


    const from = message.from

    if (from.includes('@g.us')) return

    const chats = JSON.parse(JSON.stringify(chat))
    const text = message.body.toLowerCase()

    const isInit = chats.find(chat => chat.numero === from)

    let ctx;

    // existe contexto de usuario
    if (typeof (isInit) !== "undefined") {
        ctx = isInit;
    } else {
        ctx = {
            "numero": from,
            "state": {
                "freq": false,
                "certificado": false,
                "edp": {
                    "main": false,
                    "asistencia": false
                },
                "cdf": {
                    "main": false,
                    "asistencia": false
                },
                "chat" : false
            }
        }
        chat.push(ctx)

    }

    //--- busca id del numero de wsp
    const id = chats.findIndex(chat => chat.numero === from)

    const listaDespedidas = ['gracias', 'graciass', 'graciaas','genial', '👍', '👌', '😊', 'ok', 'chau', 'bai', 'bye' ]

    const listaSticker = ["./stickers/changa_enojadaf.webp","./stickers/changa_enojada.webp","./stickers/changa_durmiendo.webp","./stickers/changuis.webp"]

    if (!ctx.state.chat) {
         
        console.log(chat[id])
        
        for (let palabra of listaDespedidas) {
            if (text.includes(palabra)) {
                const sticker = MessageMedia.fromFilePath(listaSticker[Math.floor(Math.random() * listaSticker.length)])
                await client.sendMessage(from, "Un gusto haber sido de ayuda, o eso espero 😭😭😭😭😭😭")
                await client.sendMessage(from, "bai 😒")
                await client.sendMessage(from, sticker, { sendMediaAsSticker: true })
                chat[id].state.chat = true
                return
            }
        }

        // if(text.includes(listaDespedidas)){
        //     await client.sendMessage(from, "Un gusto haber sido de ayuda, o eso espero 😭😭😭😭😭😭")
        //     await client.sendMessage(from, "bai 😒")
        //     chat[id].state.chat = true
        //     return
        // }

        //--- estado de frencuencia
        if (ctx.state.freq) {
            const res = getResFreq(text)
            await client.sendMessage(from, res)
            if (text === '9') {
                await client.sendMessage(from, msjInicial)
                chat[id].state.freq = false
                return
            }
            const initalMsg = initialFLow("1", chat, id)
            await client.sendMessage(from, initalMsg[0])
            //fs.writeFile('chats.json',JSON.stringify(chat))
            return
        }

        // --- estado de certificado
        if (ctx.state.certificado) {

            const resPath = getResCert(text)

            if (resPath === "exit") {
                await client.sendMessage(from, "🔙 Volviendo 🏃‍♂️")
                chat[id].state.certificado = false
                await client.sendMessage(from, msjInicial)
                return
            }

            if (resPath !== -1) {
                const media = MessageMedia.fromFilePath(resPath)
                await client.sendMessage(from, media)
                chat[id].state.certificado = false
                await client.sendMessage(from, msjInicial)
                return
            }

            await client.sendMessage(from, "😭 No hay certificado para este DNI \n\n 💠 Intenta con otro documento o asegura que esté bien escrito. \n\n 💠 Envia 1 para volver")
            return
        }

        // ingresó a escuela de programación
        if (ctx.state.edp.main) {
            if (ctx.state.edp.asistencia) {
                if (text === "2") {
                    await client.sendMessage(from, "Solicitud cancelada")
                    await client.sendMessage(from, msjInicial)
                    chat[id].state.edp.asistencia = false
                    chat[id].state.edp.main = false
                    return
                }
                console.log("out: ", chat[id])
                await client.sendMessage(from, "Solicitud para asistencia de Escuela de programación")
                await client.sendMessage(from, "Espere unos minutos, ya será atendido por un asistente 😊")
                await client.sendMessage(cel.LeoAvila, `${from.split('@')[0]} - Está esperando a ser atendido por un asistente `)
                return
            }
            const res = getResEDP(text, chat, id)
            await client.sendMessage(from, res[0])
            if (text === '4') {
                chat[id].state.edp.main = false
                await client.sendMessage(from, msjInicial)
                console.log(chat[id])
                return
            }
            if (text === "3") {
                const initalMsg = initialFLow("4", chat, id)
                await client.sendMessage(from, initalMsg[0])
            }
            return
        }

        // --- estado de casa del futuro
        if (ctx.state.cdf.main) {
            if (ctx.state.cdf.asistencia) {
                if (text === "2") {
                    await client.sendMessage(from, "Solicitud cancelada")
                    await client.sendMessage(from, msjInicial)
                    chat[id].state.cdf.asistencia = false
                    chat[id].state.cdf.main = false
                    return
                }
                console.log("out: ", chat[id])
                await client.sendMessage(from, "Solicitud para asistencia de Casa del Futuro")
                await client.sendMessage(from, "Espere unos minutos, ya será atendido por un asistente 😊")
                await client.sendMessage(cel.LeoAvila, `${from.split('@')[0]} - Está esperando a ser atendido por un asistente `)
                return
            }
            const res = getResCDF(text, chat, id)
            await client.sendMessage(from, res[0])
            if (text === '4') {
                chat[id].state.cdf.main = false
                await client.sendMessage(from, msjInicial)
                console.log(chat[id])
                return
            }
            await message.clearNotification
            if (text === 3) {
                const initalMsg = initialFLow("3", chat, id)
                await client.sendMessage(from, initalMsg[0])
            }
            return
        }

        if (text === '1' || text === '2' || text === '3' || text === '4' || text === '5') {

            const res = initialFLow(text, chat, id)
            await client.sendMessage(from, res[0])
            console.log(chat[id])
            return
        }

        client.sendMessage(from, "Hola soy el Asistente Virtual de Casa del Futuro 😊. \n\n Estoy para ayudar con los siguiente comandos:")
        client.sendMessage(from, msjInicial)
        //fs.writeFile('chats.json',JSON.stringify(chat))
    }else{
        client.sendMessage(from, "Hola soy el Asistente Virtual de Casa del Futuro 😊. \n\n Estoy para ayudar con los siguiente comandos:")
        client.sendMessage(from, msjInicial)
        chat[id].state.chat = false
    }
})

client.initialize();

