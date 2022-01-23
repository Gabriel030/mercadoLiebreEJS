//voy a crear un middleware a nivel de aplicacion q me deje un registro de todas las paginas q entre el usuario para

const fs = require('fs');

function logMiddleware(req,res,next) {
    fs.appendFileSync("log.txt", "se ingreso en la pagina: " + req.url +"\n" )

    next()
}

module.exports = logMiddleware