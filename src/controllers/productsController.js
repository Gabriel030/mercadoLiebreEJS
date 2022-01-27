const path = require("path")
const model = require("../models/product")
const {validationResult} = require("express-validator")

const productsController = {
    create: (req,res) => { 
        return res.render("modules/products/create", {
            styles: ["head", "footer", "main", "header", "createProducts", "register"],
            


        })
    },
    saveProduct: (req,res) => { 

        //con multer aparece el req.file q es donde se guarda el nombre de mi archivo con sus datos
        //con esta linea agrego el .file como una propiedad del body
        //entonce me queda dentro de req.body.file a la altura de cualquier otra propiedad de un formulario
        //req.body.name   req.body.email req.body.file
        if(req.file) {
            req.body.file = req.file.filename
        }else {
            req.body.file = null 
        }
        /* 
            creo una variable q va a almacenar todas las validaciones
            el metodo validationResult q pertenece a express validaor contiene 
            los resultados de ejecutar las validaciones que estan en el router de la vista 
            en este caso el de register en el req!!!, en el momento q se quiere enviar el formuilario
            pero hay errores en la Carga esos errores van a estar en el req, de validationResult */

            // INICIO VALIDACIONES --------------------------------
        let errors = validationResult(req)
        // FIN VALIDACIONES --------------------------------
       /* 
       isEmpty es una propiedad q me dice si la variable errores esta o no vacia */
        if (errors.isEmpty() ) { 
            
            //si errores esta vacio, no hay errores entonces creo el usuario/* 
           /*  req.body almacena todos los datos del formulario q se envio por post */ 
            let newProduct = req.body ; 
            let registered = model.saveNewProduct(newProduct) 
    
            return res.redirect("create")

        }else{ 
            //si existen errores entonces redirijo a la pagina de registro
            return res.render("modules/products/create", {
                styles: ["header", "footer", "main", "register", "libs"],
                errors: errors.array(),
                
            })
        }
  
                       
    }
}
    


module.exports = productsController

