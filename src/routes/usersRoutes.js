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
    body("email").notEmpty().withMessage("Completa Email").isEmail().withMessage("Debes completar el campo de Email válido"),
    body("nombreUsuario").notEmpty().withMessage("Debes completar el campo de Usuario"),
    body("fechaNacimiento").notEmpty().withMessage("Debes completar el campo de Nacimiento"),
    body("domicilio").notEmpty().withMessage("Debes completar el campo de Domicilio"),
    body("perfilUser").notEmpty().withMessage("Debes completar el campo de perfil"),
    
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


router.get("/register", usersController.createUser)
router.get("/success", usersController.success)
router.get("/login", usersController.login)

//procesamiento de formulario - aqui van los middlewares y las validaciones
//para las imagenes recordar q dentro de upload.single va el name del input donde subo el archivo
router.post("/register",upload.single("foto"), validateCreateForm, logDBMiddleware ,usersController.saveUser)

module.exports = router