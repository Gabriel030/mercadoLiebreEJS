//traer las funcinoalidades de express

const express = require("express")
const path = require("path")
const app = express()
const method = require("method-override")

const logMiddleware = require("./middlewares/logMiddleware")


//definir el puerto

/*app.set("port",3000);*/
app.set('port', process.env.PORT || 3001);
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(logMiddleware);

app.use(express.urlencoded({extended: false}))


// definir el observador

app.listen(app.get("port"), () => console.log("Servidor Funcionando"))

//definir las rutas de las paginas
//primero llamamos el objeto con los metodos de express y luego el metodo HTTP q queremos atender
//app.get("/", (req,res) => {res.sendFile(path.resolve(__dirname,"./views/home.html"))});
//app.get("/home", (req,res) => {res.sendFile(path.resolve(__dirname,"./views/home.html"))});
//app.get("/register", (req,res) => {res.sendFile(path.resolve(__dirname, "./views/register.html"))});
//app.get("/login", (req,res) => {res.sendFile(path.resolve(__dirname,"./views/login.html"))});
app.use(method("m"))
app.use(express.static(path.resolve(__dirname,"../public")));







app.use(require("./routes/mainRoutes"))
app.use("/users", require("./routes/usersRoutes"))
app.use("/products", require("./routes/productsRoutes"))





