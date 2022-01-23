const fs = require('fs')

function logDBMiddleware(req,res,next) {
    fs.appendFileSync("logDB.txt", "Se creo un registro al ingreso" + "\n");
    next()
}

module.exports = logDBMiddleware