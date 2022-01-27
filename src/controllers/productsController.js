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
        
            
            // INICIO VALIDACIONES --------------------------------
        let errors = validationResult(req)
        // FIN VALIDACIONES --------------------------------
       
       
        if (errors.isEmpty() ) { 
            
            //si errores esta vacio, no hay errores entonces creo el usuario
            
            let newProduct = req.body ; 
            let registered = model.saveNewProduct(newProduct) 
    
            return res.redirect("create") 

        }else{ 
            //si existen errores entonces redirijo a la pagina de registro
            return res.render("modules/products/create", {
                styles: ["header", "footer", "main", "register"],
                errors: errors.array(),
                
            })
        }
  
                       
    }
}
    


module.exports = productsController

