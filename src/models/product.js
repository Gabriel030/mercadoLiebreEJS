
const fs = require("fs")
const path = require("path")
const model = { 
    //esta es la ruta de el json de productos
    allProducts: path.resolve(__dirname, "../data/products.json"),
    //esta es la ruta del json de ofertas
    onSale: path.resolve(__dirname, "../data/productsOnSale.json"),
    
    //esta funcion lee todos los productos con fs
    readAllProducts: () => fs.readFileSync(model.allProducts, "utf8"),
    //convierte lo q lei con fs en un array manipulable
    listAll: () => JSON.parse(model.readAllProducts()),
    
    //leo los productos en oferta con fs
    readOnSale: () => fs.readFileSync(model.onSale, "utf8"),
    //convieto lo q lei con fs en un array manipulable
    listOnSale: () => JSON.parse(model.readOnSale()),


    //esta funcion escribe informacion en el json de productos
    writeAllProducts: (data) => fs.writeFileSync(model.allProducts, JSON.stringify( data,null,2)),

    
}

module.exports = model
