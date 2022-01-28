const path = require("path")
const model = require("../models/users")
const bcrypt = require("bcryptjs")

//me traigo esta propiedad q me trae express validator
// me trae lo q tipie en los input en el formulario

//vildationResult se usa en el controlador
//body se usa en el router 
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

           //VALIDACION DEL EMAIL
            let userInDB = model.findByProperty("email", req.body.email)
            //busco al usuario en la db por email, si este if da true entonces
            if(userInDB){
                
                return res.render("modules/users/register", {
                    styles: ["header", "footer", "main", "register", "libs"],
                    
                    //en esta varible almaceno errros, y con mapped lo paso de un array a un objeto con mas objetos
                    errors: {
                        email: {
                            msg: "Este email ya esta registrado"
                        }
                    },
                    //esta variable old, va a almacenar todo lo q escribio en el formulario el user
                    //de esta manera puedo persistir lo q el user escribio, osea lo trae de nuevo
                    old: req.body
                })
                
            }


            let newUser = req.body ; 
            let registered = model.saveNewUser(newUser) 
    
            return res.redirect("login")

        }else{ 
            //si existen errores entonces redirijo a la pagina de registro
            return res.render("modules/users/register", {
                styles: ["header", "footer", "main", "register", "libs"],
                //en esta varible almaceno errros, y con mapped lo paso de un array a un objeto con mas objetos
                errors: errors.mapped(),
                //esta variable old, va a almacenar todo lo q escribio en el formulario el user
                //de esta manera puedo persistir lo q el user escribio, osea lo trae de nuevo
                old: req.body
            })
        }
                
    },
    success: (req,res) => { 
        res.render("modules/users/success", {
            styles: ["header", "footer", "main", "head", "success", "libs"]
        })
    },
    login: (req,res) => {
        res.render("modules/users/login", {
            styles: ["main", "head", "login", "libs"]
        })
    },
    validateLogin: (req,res) => {
        
            let userToLogin = model.findByProperty("email", req.body.email)
            
            //verificar si esta el mail
            if(userToLogin){
                //verificar si el password esta ok
                let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
                        if(isOkThePassword ){
                            //antes de dirigir al usuario a su perfil tengo q guardarlo en una session

                            req.session.userLogged = userToLogin;
                            //borro el password de la sesion para no tenerlo mientras el user este en sesion
                            delete userToLogin.password
                            return res.redirect("/users/profile")
 
                        }else{

                            res.render("modules/users/login", {
                                styles: ["main", "head", "login", "libs"],
                                errors:{
                                    password:{
                                        msg:"password incorrecto"
                                    }
                                },
                                old:req.body
                         })
                        }
    

             }else{
                 //si el password no esta ok mostrar un error 
                 res.render("modules/users/login", {
                    styles: ["main", "head", "login", "libs"],
                    errors:{
                        email:{
                            msg:"Email no esta registrado"
                        }
                    },
                    old:req.body
                })
                 



             }

             


    /* res.render("modules/users/login", {
        styles: ["header", "footer", "main", "head", "login", "libs","register"],
        errors:errors.mapped(),
        old:req.body
    }) */
},
profile: (req,res) => {
    return res.render("modules/users/profile", {
        user: req.session.userLogged,
        styles: ["main", "head", "login", "libs"]
    });
}
}

module.exports = usersController

