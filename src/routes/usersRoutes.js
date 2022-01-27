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
    
    body("password").notEmpty().withMessage("Debes completar la contraseña"),
    body("foto").custom((value, {req}) => {
        let file = req.file;
        let acepetedExtensions = [".jpg", ".png", ".gif"];
        //let fileExtension = path.extname(req.file.originalname);

        


/*         asi valido subir una Imagen , para mas info buscar en la docu de express-validator 
 */        if (!file) {
     //si no subo la imagen entonces creo el error
            throw new Error("Tienes que subir una imagen")
        }else {
//si subo un archivo valido q sea con la extension correcta o adminitda
            let fileExtension = path.extname(file.originalname);
        }

        if(!acepetedExtensions.includes(fileExtension)) {
            throw new Error('Las extensiones permitidas son'+ acepetedExtensions)

        }
        return true ; 
    })
    
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
    body().notEmpty().withMessage("Debes ingresar tu usuario"),
    body().notEmpty().withMessage("Debes ingresar una contraseña")
]

router.get("/register", usersController.createUser)
router.get("/success", usersController.success)
router.get("/login", usersController.login)

//procesamiento de formulario - aqui van los middlewares y las validaciones
//para las imagenes recordar q dentro de upload.single va el name del input donde subo el archivo
router.post("/register",upload.single("foto"), validateCreateForm, logDBMiddleware ,usersController.saveUser)
router.post("/login", usersController.login)
module.exports = router