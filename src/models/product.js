
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

    generateId: () => {
        let allProducts = model.listAll();
        let lastProduct = allProducts.pop();

        //si existen productos retorna el ultimo id +1, si no existe osea es undefined retorna 1
        return lastProduct ?  lastProduct.id + 1 : 1 ; 

    },
    
    newProduct: (data) =>  Object({
        id: model.generateId(),
        description: data.descripcion,
        price: data.precio,
        discount: data.descuento,
        category: data.categoria,        
        image: data.file ? "/images/"+ data.file : null,
        

    }),

            saveNewProduct: (data) => { 
            let product = model.newProduct(data)
            let allProducts = model.listAll();

            allProducts.push(product);
            model.writeAllProducts(allProducts)
            return product;
        }
}

module.exports = model
