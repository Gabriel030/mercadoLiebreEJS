const path = require("path")
const model = require("../models/product")
const mainController = {
    index: (req,res) => { 
        return res.render("home", {
            styles: ["head", "footer", "main", "header", "createProduct", "libs"],
            listAll: model.listAll(),
            listOnSale: model.listOnSale()


        })
    }
}

module.exports = mainController