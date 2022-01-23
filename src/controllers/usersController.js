const path = require("path")
const model = require("../models/users")
const bcrypt = require("bcryptjs")

//me traigo esta propiedad q me trae express validator
const {validationResult} = require("express-validator")

const usersController = {

    createUser: (req,res) => { 
        return res.render("modules/users/register", {
            styles: ["header", "footer", "main", "register"],
            old: false
        })
    },

    saveUser: (req,res) => { 

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
            
            let newUser = req.body ; 
            let registered = model.saveNewUser(newUser) 
    
            return res.redirect("success")

        }else{ 
            //si existen errores entonces redirijo a la pagina de registro
            return res.render("modules/users/register", {
                styles: ["header", "footer", "main", "register"],
                errors: errors.array(),
                old: req.body
            })
        }




        

        
        


        

       
                       
    },
    success: (req,res) => { 
        res.render("modules/users/success", {
            styles: ["header", "footer", "main", "head", "success"]
        })
    },
    login: (req,res) => {
        res.render("modules/users/login", {
            styles: ["header", "footer", "main", "head", "login"]
        })
    }
}

module.exports = usersController

