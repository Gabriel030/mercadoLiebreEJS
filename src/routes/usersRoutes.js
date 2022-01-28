const express = require("express")
const router  = express.Router()
const usersController = require("../controllers/usersController")
const logDBMiddleware = require("../middlewares/logDBMiddleware");
const multer = require("multer")
const path = require("path")
const {body} = require("express-validator")

//creo una variable con un array q contenga las validaciones
//q quiero hacer cuando voy a registar
const validateCreateForm = [
    body("nombreCompleto").notEmpty().withMessage("Debes completar el campo de nombre"),
    //cuando hago el bail() detiene las validaciones si salta el primer error 
    body("email").notEmpty().withMessage("Completa Email").bail().isEmail().withMessage("Debes completar el campo de Email válido"),
    body("nombreUsuario").notEmpty().withMessage("Debes completar el campo de Usuario"),
    body("fechaNacimiento").notEmpty().withMessage("Debes completar el campo de Nacimiento"),
    body("domicilio").notEmpty().withMessage("Debes completar el campo de Domicilio"),
    body("perfilUser").notEmpty().withMessage("Debes completar el campo de perfil"),
    body("intereses").notEmpty().withMessage("Debes elegir por lo menos un interes"),
    
    body("password").notEmpty().withMessage("Debes completar la contraseña") 
    
]

//configurar multer-----------------------------------------------------------

const storage = multer.diskStorage({ 
    destination: (req,file,cb) => { 
        cb(null, path.join(__dirname, "../../public/images"))
    },
    filename: (req,file,cb) => { 
        /* el file q recibo tiene los siguientes datos:

                fieldname: "foto"
                originalname: "ecommer.jpg" osea el nombre con el q subio el user la imagenes
                encoding: "7bit"
                mimetype: "image/jpeg"  
                                             */
        const newFileName = "foto"+ Date.now() + path.extname(file.originalname);
        cb(null, newFileName); 
    }
})                                  
const upload = multer({storage:storage})                            
//const uploead = multer({storage})

//------------------------------------------------------------------------------
//validaciones para login 

const validateLogin = [
    body("nombreUsuario").notEmpty().withMessage("Debes ingresar tu usuario"),
    body("password").notEmpty().withMessage("Debes ingresar una contraseña")
]

router.get("/register", usersController.createUser)
router.get("/success", usersController.success)
router.get("/login", usersController.login)
router.get("/profile", usersController.profile)


//procesamiento de formulario - aqui van los middlewares y las validaciones
//para las imagenes recordar q dentro de upload.single va el name del input donde subo el archivo
router.post("/register",upload.single("foto"), validateCreateForm, logDBMiddleware ,usersController.saveUser)
router.post("/login", validateLogin, usersController.validateLogin)
module.exports = router