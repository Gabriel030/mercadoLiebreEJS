const express = require("express")
const router  = express.Router()
const productsController = require("../controllers/productsController")

const multer = require("multer")
const path = require("path")
const {body} = require("express-validator")





//creo una variable con un array q contenga las validaciones
//q quiero hacer cuando voy a registar
const validateCreateForm = [
    body("descripcion").notEmpty().withMessage("Debes completar la descripcion"),
    body("precio").notEmpty().withMessage("Debes completar el Precio"),
    body("descuento").notEmpty().withMessage("Debes completar el Descuento"),
    body("categoria").notEmpty().withMessage("Debes completar la categoria"),
    

    
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
        const newFileName = "product"+ Date.now() + path.extname(file.originalname);
        cb(null, newFileName); 
    }
})                                  
const upload = multer({storage:storage})  


router.get("/create", productsController.create)
router.post("/create", upload.single("foto"),validateCreateForm,  productsController.saveProduct)

module.exports = router